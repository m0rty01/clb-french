#!/usr/bin/env python3
"""
Backend API Testing Script for CLB French Trainer
Tests Stripe webhook hardening and reconciliation endpoint
"""

import requests
import json
import time
import os
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://french-prep-expanded.preview.emergentagent.com/api"

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

def log_test(test_name, passed, details=""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {test_name}")
    if details:
        print(f"   Details: {details}")
    
    test_results["tests"].append({
        "name": test_name,
        "passed": passed,
        "details": details
    })
    
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1

def generate_stripe_signature(payload, secret):
    """Generate a valid Stripe webhook signature using Node.js"""
    import subprocess
    
    try:
        payload_json = json.dumps(payload)
        
        # Use the helper script in /app
        result = subprocess.run(
            ['node', '/app/gen_stripe_sig.js', payload_json, secret],
            cwd='/app',
            capture_output=True,
            text=True,
            timeout=5
        )
        
        if result.returncode == 0:
            return result.stdout.strip()
        else:
            print(f"Error generating signature: {result.stderr}")
            return None
    except Exception as e:
        print(f"Exception generating signature: {e}")
        return None

def test_stripe_webhook():
    """Test Stripe webhook endpoint with various scenarios"""
    print("\n" + "="*80)
    print("TESTING: Stripe Webhook Endpoint (POST /api/stripe/webhook)")
    print("="*80)
    
    webhook_url = f"{BASE_URL}/stripe/webhook"
    webhook_secret = "whsec_LO9R32lstUOcddOtO41Ak2jjP6MGtJqU"
    
    # Test 1a: Valid signed event (checkout.session.completed)
    print("\n--- Test 1a: Valid signed checkout.session.completed event ---")
    valid_payload = {
        "id": "evt_test_webhook",
        "object": "event",
        "type": "checkout.session.completed",
        "data": {
            "object": {
                "id": "cs_test_valid",
                "object": "checkout.session",
                "payment_status": "paid",
                "customer": "cus_test_123",
                "subscription": "sub_test_123",
                "metadata": {
                    "userId": "test-user-id",
                    "tier": "premium",
                    "priceKey": "premium_monthly"
                }
            }
        }
    }
    
    signature = generate_stripe_signature(valid_payload, webhook_secret)
    if signature:
        try:
            response = requests.post(
                webhook_url,
                data=json.dumps(valid_payload),
                headers={
                    'Content-Type': 'application/json',
                    'stripe-signature': signature
                },
                timeout=10
            )
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if data.get('received') == True:
                        log_test("Webhook: Valid signed event", True, f"Status: {response.status_code}, Body: {data}")
                    else:
                        log_test("Webhook: Valid signed event", False, f"Unexpected body: {data}")
                except:
                    log_test("Webhook: Valid signed event", False, f"Status 200 but invalid JSON: {response.text}")
            else:
                log_test("Webhook: Valid signed event", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Webhook: Valid signed event", False, f"Exception: {str(e)}")
    else:
        log_test("Webhook: Valid signed event", False, "Could not generate signature")
    
    # Test 1b: Invalid signature
    print("\n--- Test 1b: Request with bogus signature ---")
    try:
        response = requests.post(
            webhook_url,
            data=json.dumps(valid_payload),
            headers={
                'Content-Type': 'application/json',
                'stripe-signature': 't=123,v1=bogus_signature_here'
            },
            timeout=10
        )
        
        if response.status_code == 400:
            log_test("Webhook: Invalid signature returns 400", True, f"Status: {response.status_code}")
        else:
            log_test("Webhook: Invalid signature returns 400", False, f"Expected 400, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Webhook: Invalid signature returns 400", False, f"Exception: {str(e)}")
    
    # Test 1c: No signature header (secret is configured)
    print("\n--- Test 1c: Request with NO signature header ---")
    try:
        response = requests.post(
            webhook_url,
            data=json.dumps(valid_payload),
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get('received') == True:
                    log_test("Webhook: No signature returns 200 (not processed)", True, f"Status: {response.status_code}, Body: {data}")
                else:
                    log_test("Webhook: No signature returns 200 (not processed)", False, f"Unexpected body: {data}")
            except:
                log_test("Webhook: No signature returns 200 (not processed)", False, f"Status 200 but invalid JSON: {response.text}")
        else:
            log_test("Webhook: No signature returns 200 (not processed)", False, f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Webhook: No signature returns 200 (not processed)", False, f"Exception: {str(e)}")
    
    # Test 1d: Malformed (non-JSON) body with bogus signature
    print("\n--- Test 1d: Malformed body with bogus signature ---")
    try:
        response = requests.post(
            webhook_url,
            data="this is not json",
            headers={
                'Content-Type': 'application/json',
                'stripe-signature': 't=123,v1=bogus'
            },
            timeout=10
        )
        
        # Should return 400 for signature failure (signature check happens before parsing)
        if response.status_code == 400:
            log_test("Webhook: Malformed body with bogus sig returns 400", True, f"Status: {response.status_code}")
        else:
            log_test("Webhook: Malformed body with bogus sig returns 400", False, f"Expected 400, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Webhook: Malformed body with bogus sig returns 400", False, f"Exception: {str(e)}")
    
    # Test 1d2: Malformed body with NO signature
    print("\n--- Test 1d2: Malformed body with NO signature ---")
    try:
        response = requests.post(
            webhook_url,
            data="this is not json",
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        # Should return 200 (acknowledged but not processed)
        if response.status_code == 200:
            log_test("Webhook: Malformed body with no sig returns 200", True, f"Status: {response.status_code}")
        else:
            log_test("Webhook: Malformed body with no sig returns 200", False, f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Webhook: Malformed body with no sig returns 200", False, f"Exception: {str(e)}")
    
    # Test 1e: Valid signed event of UNHANDLED type
    print("\n--- Test 1e: Valid signed unhandled event type (customer.updated) ---")
    unhandled_payload = {
        "id": "evt_test_unhandled",
        "object": "event",
        "type": "customer.updated",
        "data": {
            "object": {
                "id": "cus_test_123",
                "object": "customer"
            }
        }
    }
    
    signature = generate_stripe_signature(unhandled_payload, webhook_secret)
    if signature:
        try:
            response = requests.post(
                webhook_url,
                data=json.dumps(unhandled_payload),
                headers={
                    'Content-Type': 'application/json',
                    'stripe-signature': signature
                },
                timeout=10
            )
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if data.get('received') == True:
                        log_test("Webhook: Unhandled event type returns 200", True, f"Status: {response.status_code}, Body: {data}")
                    else:
                        log_test("Webhook: Unhandled event type returns 200", False, f"Unexpected body: {data}")
                except:
                    log_test("Webhook: Unhandled event type returns 200", False, f"Status 200 but invalid JSON: {response.text}")
            else:
                log_test("Webhook: Unhandled event type returns 200", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Webhook: Unhandled event type returns 200", False, f"Exception: {str(e)}")
    else:
        log_test("Webhook: Unhandled event type returns 200", False, "Could not generate signature")
    
    # Test 1f: Valid signed customer.subscription.deleted event
    print("\n--- Test 1f: Valid signed customer.subscription.deleted event ---")
    sub_deleted_payload = {
        "id": "evt_test_sub_deleted",
        "object": "event",
        "type": "customer.subscription.deleted",
        "data": {
            "object": {
                "id": "sub_test_123",
                "object": "subscription",
                "customer": "cus_test_123"
            }
        }
    }
    
    signature = generate_stripe_signature(sub_deleted_payload, webhook_secret)
    if signature:
        try:
            response = requests.post(
                webhook_url,
                data=json.dumps(sub_deleted_payload),
                headers={
                    'Content-Type': 'application/json',
                    'stripe-signature': signature
                },
                timeout=10
            )
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if data.get('received') == True:
                        log_test("Webhook: subscription.deleted returns 200", True, f"Status: {response.status_code}, Body: {data}")
                    else:
                        log_test("Webhook: subscription.deleted returns 200", False, f"Unexpected body: {data}")
                except:
                    log_test("Webhook: subscription.deleted returns 200", False, f"Status 200 but invalid JSON: {response.text}")
            else:
                log_test("Webhook: subscription.deleted returns 200", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Webhook: subscription.deleted returns 200", False, f"Exception: {str(e)}")
    else:
        log_test("Webhook: subscription.deleted returns 200", False, "Could not generate signature")
    
    # CRITICAL CHECK: Verify no 500 errors were returned
    print("\n--- CRITICAL: Verify no 500 errors in any webhook test ---")
    has_500 = any(
        "500" in test.get("details", "") 
        for test in test_results["tests"] 
        if "Webhook:" in test["name"]
    )
    if not has_500:
        log_test("Webhook: NEVER returns 500", True, "All webhook tests returned 2xx or 400 as expected")
    else:
        log_test("Webhook: NEVER returns 500", False, "At least one webhook test returned 500")

def test_stripe_reconcile():
    """Test Stripe reconciliation endpoint"""
    print("\n" + "="*80)
    print("TESTING: Stripe Reconcile Endpoint (POST /api/stripe/reconcile)")
    print("="*80)
    
    reconcile_url = f"{BASE_URL}/stripe/reconcile"
    
    # First, register a test user to get a valid token
    print("\n--- Setting up test user for reconcile tests ---")
    register_url = f"{BASE_URL}/auth/register"
    test_email = f"webhook_test_{int(time.time())}@test.com"
    test_password = "SecurePass123!"
    
    try:
        reg_response = requests.post(
            register_url,
            json={
                "email": test_email,
                "password": test_password,
                "name": "Webhook Test User"
            },
            timeout=10
        )
        
        if reg_response.status_code == 200:
            reg_data = reg_response.json()
            valid_token = reg_data.get('token')
            print(f"✓ Test user registered: {test_email}")
        else:
            print(f"✗ Failed to register test user: {reg_response.status_code}")
            valid_token = None
    except Exception as e:
        print(f"✗ Exception registering test user: {e}")
        valid_token = None
    
    # Test 2a: No Authorization header
    print("\n--- Test 2a: No Authorization header ---")
    try:
        response = requests.post(
            reconcile_url,
            json={"sessionId": "cs_test_fake"},
            timeout=10
        )
        
        if response.status_code == 401:
            try:
                data = response.json()
                if data.get('error') == 'Unauthorized':
                    log_test("Reconcile: No auth returns 401", True, f"Status: {response.status_code}, Body: {data}")
                else:
                    log_test("Reconcile: No auth returns 401", False, f"Status 401 but wrong error: {data}")
            except:
                log_test("Reconcile: No auth returns 401", True, f"Status: {response.status_code}")
        else:
            log_test("Reconcile: No auth returns 401", False, f"Expected 401, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Reconcile: No auth returns 401", False, f"Exception: {str(e)}")
    
    # Test 2b: Invalid/garbage Bearer token
    print("\n--- Test 2b: Invalid Bearer token ---")
    try:
        response = requests.post(
            reconcile_url,
            json={"sessionId": "cs_test_fake"},
            headers={"Authorization": "Bearer invalid_garbage_token_12345"},
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("Reconcile: Invalid token returns 401", True, f"Status: {response.status_code}")
        else:
            log_test("Reconcile: Invalid token returns 401", False, f"Expected 401, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Reconcile: Invalid token returns 401", False, f"Exception: {str(e)}")
    
    if valid_token:
        # Test 2c: Valid token but missing sessionId
        print("\n--- Test 2c: Valid token but missing sessionId ---")
        try:
            response = requests.post(
                reconcile_url,
                json={},
                headers={"Authorization": f"Bearer {valid_token}"},
                timeout=10
            )
            
            if response.status_code == 400:
                try:
                    data = response.json()
                    if data.get('error') == 'Missing sessionId':
                        log_test("Reconcile: Missing sessionId returns 400", True, f"Status: {response.status_code}, Body: {data}")
                    else:
                        log_test("Reconcile: Missing sessionId returns 400", False, f"Status 400 but wrong error: {data}")
                except:
                    log_test("Reconcile: Missing sessionId returns 400", True, f"Status: {response.status_code}")
            else:
                log_test("Reconcile: Missing sessionId returns 400", False, f"Expected 400, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Reconcile: Missing sessionId returns 400", False, f"Exception: {str(e)}")
        
        # Test 2d: Valid token + fake/non-existent sessionId
        print("\n--- Test 2d: Valid token + non-existent sessionId ---")
        try:
            response = requests.post(
                reconcile_url,
                json={"sessionId": "cs_test_doesnotexist"},
                headers={"Authorization": f"Bearer {valid_token}"},
                timeout=10
            )
            
            # Should return 500 with Stripe error details (not a crash)
            if response.status_code == 500:
                try:
                    data = response.json()
                    # Check if it's a clean error response with details from Stripe
                    if 'error' in data and 'details' in data:
                        if 'No such checkout.session' in data.get('details', ''):
                            log_test("Reconcile: Non-existent session returns clean 500 error", True, f"Status: {response.status_code}, Error: {data}")
                        else:
                            log_test("Reconcile: Non-existent session returns clean 500 error", True, f"Status: {response.status_code}, Error details: {data}")
                    else:
                        log_test("Reconcile: Non-existent session returns clean 500 error", False, f"Status 500 but missing error structure: {data}")
                except:
                    log_test("Reconcile: Non-existent session returns clean 500 error", False, f"Status 500 but invalid JSON: {response.text}")
            else:
                log_test("Reconcile: Non-existent session returns clean 500 error", False, f"Expected 500, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Reconcile: Non-existent session returns clean 500 error", False, f"Exception: {str(e)}")
    else:
        print("⚠ Skipping tests 2c and 2d - no valid token available")
        log_test("Reconcile: Missing sessionId returns 400", False, "Skipped - no valid token")
        log_test("Reconcile: Non-existent session returns clean 500 error", False, "Skipped - no valid token")

def test_auth_regression():
    """Test that existing auth endpoints still work (regression test)"""
    print("\n" + "="*80)
    print("TESTING: Auth Endpoints Regression")
    print("="*80)
    
    # Test 3a: Register a new user
    print("\n--- Test 3a: POST /api/auth/register ---")
    register_url = f"{BASE_URL}/auth/register"
    test_email = f"regression_test_{int(time.time())}@test.com"
    test_password = "TestPass123!"
    
    try:
        response = requests.post(
            register_url,
            json={
                "email": test_email,
                "password": test_password,
                "name": "Regression Test User"
            },
            timeout=10
        )
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    token = data['token']
                    log_test("Auth Regression: Register returns JWT token", True, f"Status: {response.status_code}, Token present: {bool(token)}")
                else:
                    log_test("Auth Regression: Register returns JWT token", False, f"Missing token or user in response: {data}")
            except:
                log_test("Auth Regression: Register returns JWT token", False, f"Status 200 but invalid JSON: {response.text}")
        else:
            log_test("Auth Regression: Register returns JWT token", False, f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Auth Regression: Register returns JWT token", False, f"Exception: {str(e)}")
        token = None
    
    # Test 3b: Login with the registered user
    print("\n--- Test 3b: POST /api/auth/login ---")
    login_url = f"{BASE_URL}/auth/login"
    
    try:
        response = requests.post(
            login_url,
            json={
                "email": test_email,
                "password": test_password
            },
            timeout=10
        )
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    log_test("Auth Regression: Login returns JWT token", True, f"Status: {response.status_code}, Token present: {bool(data['token'])}")
                else:
                    log_test("Auth Regression: Login returns JWT token", False, f"Missing token or user in response: {data}")
            except:
                log_test("Auth Regression: Login returns JWT token", False, f"Status 200 but invalid JSON: {response.text}")
        else:
            log_test("Auth Regression: Login returns JWT token", False, f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Auth Regression: Login returns JWT token", False, f"Exception: {str(e)}")

def print_summary():
    """Print test summary"""
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    print(f"Success Rate: {(test_results['passed'] / (test_results['passed'] + test_results['failed']) * 100):.1f}%")
    
    if test_results['failed'] > 0:
        print("\n❌ FAILED TESTS:")
        for test in test_results['tests']:
            if not test['passed']:
                print(f"  - {test['name']}")
                if test['details']:
                    print(f"    {test['details']}")
    
    print("\n" + "="*80)

if __name__ == "__main__":
    print("="*80)
    print("CLB French Trainer - Backend API Testing")
    print("Testing Stripe Webhook Hardening & Reconciliation")
    print(f"Base URL: {BASE_URL}")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print("="*80)
    
    # Run all tests
    test_stripe_webhook()
    test_stripe_reconcile()
    test_auth_regression()
    
    # Print summary
    print_summary()
    
    # Exit with appropriate code
    sys.exit(0 if test_results['failed'] == 0 else 1)
