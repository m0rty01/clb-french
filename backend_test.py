#!/usr/bin/env python3
"""
Backend API Testing Script for CLB French Trainer
Tests 3-Tier Subscription Model (Free/Standard/Premium)
"""

import requests
import json
import time
import sys
from datetime import datetime
import random
import string

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

def generate_random_email():
    """Generate a random email for testing"""
    random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    return f"tier_{random_str}@test.com"

def register_user(email, password="Test1234!"):
    """Register a new user and return token"""
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json={
                "email": email,
                "password": password,
                "name": f"Test User {email.split('@')[0]}"
            },
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            return data.get('token')
        else:
            print(f"✗ Failed to register user {email}: {response.status_code}")
            return None
    except Exception as e:
        print(f"✗ Exception registering user {email}: {e}")
        return None

def upgrade_user(token, tier):
    """Upgrade user to specified tier using manual upgrade endpoint"""
    try:
        response = requests.post(
            f"{BASE_URL}/subscription/upgrade",
            json={"tier": tier},
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            return True
        else:
            print(f"✗ Failed to upgrade to {tier}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"✗ Exception upgrading to {tier}: {e}")
        return False

def test_usage_endpoint():
    """Test GET /api/usage for different tiers"""
    print("\n" + "="*80)
    print("TEST CASE 1: GET /api/usage - Verify tier limits")
    print("="*80)
    
    # Test 1a: Free user
    print("\n--- Test 1a: Free user usage limits ---")
    free_email = generate_random_email()
    free_token = register_user(free_email)
    
    if free_token:
        try:
            response = requests.get(
                f"{BASE_URL}/usage",
                headers={"Authorization": f"Bearer {free_token}"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                # Check free tier limits
                checks = [
                    (data.get('tier') == 'free', f"tier is 'free' (got: {data.get('tier')})"),
                    (data.get('writing', {}).get('limit') == 2, f"writing.limit is 2 (got: {data.get('writing', {}).get('limit')})"),
                    (data.get('mockTests', {}).get('limit') == 1, f"mockTests.limit is 1 (got: {data.get('mockTests', {}).get('limit')})"),
                    (data.get('speaking', {}).get('enabled') == False, f"speaking.enabled is false (got: {data.get('speaking', {}).get('enabled')})"),
                    (data.get('isLegacy') == False, f"isLegacy is false (got: {data.get('isLegacy')})"),
                    ('cycleStart' in data, "cycleStart present"),
                    ('cycleEnd' in data, "cycleEnd present")
                ]
                
                all_passed = all(check[0] for check in checks)
                failed_checks = [check[1] for check in checks if not check[0]]
                
                if all_passed:
                    log_test("Usage: Free user limits correct", True, f"All checks passed: {data}")
                else:
                    log_test("Usage: Free user limits correct", False, f"Failed checks: {', '.join(failed_checks)}")
            else:
                log_test("Usage: Free user limits correct", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Usage: Free user limits correct", False, f"Exception: {str(e)}")
    else:
        log_test("Usage: Free user limits correct", False, "Failed to register free user")
    
    # Test 1b: Standard user (upgrade the same user)
    print("\n--- Test 1b: Standard user usage limits ---")
    if free_token:
        if upgrade_user(free_token, "standard"):
            try:
                response = requests.get(
                    f"{BASE_URL}/usage",
                    headers={"Authorization": f"Bearer {free_token}"},
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    # Check standard tier limits
                    checks = [
                        (data.get('tier') == 'standard', f"tier is 'standard' (got: {data.get('tier')})"),
                        (data.get('writing', {}).get('limit') == 15, f"writing.limit is 15 (got: {data.get('writing', {}).get('limit')})"),
                        (data.get('mockTests', {}).get('unlimited') == True or data.get('mockTests', {}).get('limit') == 999, f"mockTests.unlimited is true or limit is 999 (got: unlimited={data.get('mockTests', {}).get('unlimited')}, limit={data.get('mockTests', {}).get('limit')})"),
                        (data.get('speaking', {}).get('enabled') == False, f"speaking.enabled is false (got: {data.get('speaking', {}).get('enabled')})")
                    ]
                    
                    all_passed = all(check[0] for check in checks)
                    failed_checks = [check[1] for check in checks if not check[0]]
                    
                    if all_passed:
                        log_test("Usage: Standard user limits correct", True, f"All checks passed: {data}")
                    else:
                        log_test("Usage: Standard user limits correct", False, f"Failed checks: {', '.join(failed_checks)}")
                else:
                    log_test("Usage: Standard user limits correct", False, f"Expected 200, got {response.status_code}: {response.text}")
            except Exception as e:
                log_test("Usage: Standard user limits correct", False, f"Exception: {str(e)}")
        else:
            log_test("Usage: Standard user limits correct", False, "Failed to upgrade to standard")
    else:
        log_test("Usage: Standard user limits correct", False, "No token available")
    
    # Test 1c: Premium user (upgrade the same user again)
    print("\n--- Test 1c: Premium user usage limits ---")
    if free_token:
        if upgrade_user(free_token, "premium"):
            try:
                response = requests.get(
                    f"{BASE_URL}/usage",
                    headers={"Authorization": f"Bearer {free_token}"},
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    # Check premium tier limits
                    checks = [
                        (data.get('tier') == 'premium', f"tier is 'premium' (got: {data.get('tier')})"),
                        (data.get('writing', {}).get('unlimited') == True or data.get('writing', {}).get('limit') == 999, f"writing.unlimited is true or limit is 999 (got: unlimited={data.get('writing', {}).get('unlimited')}, limit={data.get('writing', {}).get('limit')})"),
                        (data.get('mockTests', {}).get('unlimited') == True or data.get('mockTests', {}).get('limit') == 999, f"mockTests.unlimited is true or limit is 999 (got: unlimited={data.get('mockTests', {}).get('unlimited')}, limit={data.get('mockTests', {}).get('limit')})"),
                        (data.get('speaking', {}).get('enabled') == True, f"speaking.enabled is true (got: {data.get('speaking', {}).get('enabled')})")
                    ]
                    
                    all_passed = all(check[0] for check in checks)
                    failed_checks = [check[1] for check in checks if not check[0]]
                    
                    if all_passed:
                        log_test("Usage: Premium user limits correct", True, f"All checks passed: {data}")
                    else:
                        log_test("Usage: Premium user limits correct", False, f"Failed checks: {', '.join(failed_checks)}")
                else:
                    log_test("Usage: Premium user limits correct", False, f"Expected 200, got {response.status_code}: {response.text}")
            except Exception as e:
                log_test("Usage: Premium user limits correct", False, f"Exception: {str(e)}")
        else:
            log_test("Usage: Premium user limits correct", False, "Failed to upgrade to premium")
    else:
        log_test("Usage: Premium user limits correct", False, "No token available")
    
    # Test 1d: No auth
    print("\n--- Test 1d: No auth returns 401 ---")
    try:
        response = requests.get(f"{BASE_URL}/usage", timeout=10)
        
        if response.status_code == 401:
            log_test("Usage: No auth returns 401", True, f"Status: {response.status_code}")
        else:
            log_test("Usage: No auth returns 401", False, f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_test("Usage: No auth returns 401", False, f"Exception: {str(e)}")

def test_tests_access_endpoint():
    """Test GET /api/tests/access for different tiers"""
    print("\n" + "="*80)
    print("TEST CASE 2: GET /api/tests/access - Verify subscription fields")
    print("="*80)
    
    # Create users for each tier
    free_email = generate_random_email()
    free_token = register_user(free_email)
    
    standard_email = generate_random_email()
    standard_token = register_user(standard_email)
    if standard_token:
        upgrade_user(standard_token, "standard")
    
    premium_email = generate_random_email()
    premium_token = register_user(premium_email)
    if premium_token:
        upgrade_user(premium_token, "premium")
    
    # Test each tier
    for tier_name, token in [("free", free_token), ("standard", standard_token), ("premium", premium_token)]:
        print(f"\n--- Test 2: {tier_name.capitalize()} user /tests/access ---")
        if token:
            try:
                response = requests.get(
                    f"{BASE_URL}/tests/access",
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    # Check required fields
                    required_fields = [
                        'subscriptionTier', 'maxTestsPerMonth', 'testsRemaining',
                        'aiWritingEvaluationsPerMonth', 'aiEvaluationsRemaining',
                        'aiSpeakingEnabled', 'isLegacy', 'cycleStart', 'cycleEnd'
                    ]
                    
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if not missing_fields:
                        # Verify tier-specific values
                        tier_checks = []
                        if tier_name == "free":
                            tier_checks = [
                                (data.get('subscriptionTier') == 'free', f"subscriptionTier is 'free'"),
                                (data.get('maxTestsPerMonth') == 1, f"maxTestsPerMonth is 1"),
                                (data.get('aiWritingEvaluationsPerMonth') == 2, f"aiWritingEvaluationsPerMonth is 2"),
                                (data.get('aiSpeakingEnabled') == False, f"aiSpeakingEnabled is false")
                            ]
                        elif tier_name == "standard":
                            tier_checks = [
                                (data.get('subscriptionTier') == 'standard', f"subscriptionTier is 'standard'"),
                                (data.get('maxTestsPerMonth') == 999, f"maxTestsPerMonth is 999 (unlimited)"),
                                (data.get('aiWritingEvaluationsPerMonth') == 15, f"aiWritingEvaluationsPerMonth is 15"),
                                (data.get('aiSpeakingEnabled') == False, f"aiSpeakingEnabled is false")
                            ]
                        elif tier_name == "premium":
                            tier_checks = [
                                (data.get('subscriptionTier') == 'premium', f"subscriptionTier is 'premium'"),
                                (data.get('maxTestsPerMonth') == 999, f"maxTestsPerMonth is 999 (unlimited)"),
                                (data.get('aiWritingEvaluationsPerMonth') == 999, f"aiWritingEvaluationsPerMonth is 999 (unlimited)"),
                                (data.get('aiSpeakingEnabled') == True, f"aiSpeakingEnabled is true")
                            ]
                        
                        all_passed = all(check[0] for check in tier_checks)
                        failed_checks = [check[1] for check in tier_checks if not check[0]]
                        
                        if all_passed:
                            log_test(f"Tests/Access: {tier_name.capitalize()} user fields correct", True, f"All fields present and correct")
                        else:
                            log_test(f"Tests/Access: {tier_name.capitalize()} user fields correct", False, f"Failed checks: {', '.join(failed_checks)}")
                    else:
                        log_test(f"Tests/Access: {tier_name.capitalize()} user fields correct", False, f"Missing fields: {', '.join(missing_fields)}")
                else:
                    log_test(f"Tests/Access: {tier_name.capitalize()} user fields correct", False, f"Expected 200, got {response.status_code}")
            except Exception as e:
                log_test(f"Tests/Access: {tier_name.capitalize()} user fields correct", False, f"Exception: {str(e)}")
        else:
            log_test(f"Tests/Access: {tier_name.capitalize()} user fields correct", False, f"Failed to create {tier_name} user")

def test_ai_speaking_endpoint():
    """Test POST /api/ai/speaking feature locking"""
    print("\n" + "="*80)
    print("TEST CASE 3: POST /api/ai/speaking - Feature locking")
    print("="*80)
    
    # Create users for each tier
    free_email = generate_random_email()
    free_token = register_user(free_email)
    
    standard_email = generate_random_email()
    standard_token = register_user(standard_email)
    if standard_token:
        upgrade_user(standard_token, "standard")
    
    premium_email = generate_random_email()
    premium_token = register_user(premium_email)
    if premium_token:
        upgrade_user(premium_token, "premium")
    
    # Test 3a: Free user - should get 403 FEATURE_LOCKED
    print("\n--- Test 3a: Free user gets 403 FEATURE_LOCKED ---")
    if free_token:
        try:
            response = requests.post(
                f"{BASE_URL}/ai/speaking",
                json={"text": "Bonjour, comment allez-vous?"},
                headers={"Authorization": f"Bearer {free_token}"},
                timeout=10
            )
            
            if response.status_code == 403:
                data = response.json()
                checks = [
                    (data.get('code') == 'FEATURE_LOCKED', f"code is 'FEATURE_LOCKED'"),
                    (data.get('upgradeRequired') == True, f"upgradeRequired is true"),
                    (data.get('requiredTier') == 'premium', f"requiredTier is 'premium'")
                ]
                
                all_passed = all(check[0] for check in checks)
                failed_checks = [check[1] for check in checks if not check[0]]
                
                if all_passed:
                    log_test("AI Speaking: Free user gets 403 FEATURE_LOCKED", True, f"All checks passed: {data}")
                else:
                    log_test("AI Speaking: Free user gets 403 FEATURE_LOCKED", False, f"Failed checks: {', '.join(failed_checks)}")
            else:
                log_test("AI Speaking: Free user gets 403 FEATURE_LOCKED", False, f"Expected 403, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("AI Speaking: Free user gets 403 FEATURE_LOCKED", False, f"Exception: {str(e)}")
    else:
        log_test("AI Speaking: Free user gets 403 FEATURE_LOCKED", False, "Failed to create free user")
    
    # Test 3b: Standard user - should get 403 FEATURE_LOCKED
    print("\n--- Test 3b: Standard user gets 403 FEATURE_LOCKED ---")
    if standard_token:
        try:
            response = requests.post(
                f"{BASE_URL}/ai/speaking",
                json={"text": "Bonjour, comment allez-vous?"},
                headers={"Authorization": f"Bearer {standard_token}"},
                timeout=10
            )
            
            if response.status_code == 403:
                data = response.json()
                if data.get('code') == 'FEATURE_LOCKED':
                    log_test("AI Speaking: Standard user gets 403 FEATURE_LOCKED", True, f"Status: {response.status_code}, Code: {data.get('code')}")
                else:
                    log_test("AI Speaking: Standard user gets 403 FEATURE_LOCKED", False, f"Status 403 but wrong code: {data}")
            else:
                log_test("AI Speaking: Standard user gets 403 FEATURE_LOCKED", False, f"Expected 403, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("AI Speaking: Standard user gets 403 FEATURE_LOCKED", False, f"Exception: {str(e)}")
    else:
        log_test("AI Speaking: Standard user gets 403 FEATURE_LOCKED", False, "Failed to create standard user")
    
    # Test 3c: Premium user - should get 200 with status "coming_soon"
    print("\n--- Test 3c: Premium user gets 200 with coming_soon ---")
    if premium_token:
        try:
            response = requests.post(
                f"{BASE_URL}/ai/speaking",
                json={"text": "Bonjour, comment allez-vous?"},
                headers={"Authorization": f"Bearer {premium_token}"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'coming_soon':
                    log_test("AI Speaking: Premium user gets 200 coming_soon", True, f"Status: {response.status_code}, Response: {data}")
                else:
                    log_test("AI Speaking: Premium user gets 200 coming_soon", False, f"Status 200 but wrong status: {data}")
            else:
                log_test("AI Speaking: Premium user gets 200 coming_soon", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("AI Speaking: Premium user gets 200 coming_soon", False, f"Exception: {str(e)}")
    else:
        log_test("AI Speaking: Premium user gets 200 coming_soon", False, "Failed to create premium user")
    
    # Test 3d: No auth - should get 401
    print("\n--- Test 3d: No auth returns 401 ---")
    try:
        response = requests.post(
            f"{BASE_URL}/ai/speaking",
            json={"text": "Bonjour"},
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("AI Speaking: No auth returns 401", True, f"Status: {response.status_code}")
        else:
            log_test("AI Speaking: No auth returns 401", False, f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_test("AI Speaking: No auth returns 401", False, f"Exception: {str(e)}")

def test_mock_test_limit_enforcement():
    """Test POST /api/tests/results mock test limit enforcement"""
    print("\n" + "="*80)
    print("TEST CASE 4: POST /api/tests/results - Mock test limit enforcement")
    print("="*80)
    
    # Test 4a: Free user - 1st submission should succeed, 2nd should fail
    print("\n--- Test 4a: Free user mock test limit (1 test per cycle) ---")
    free_email = generate_random_email()
    free_token = register_user(free_email)
    
    if free_token:
        # First submission - should succeed
        try:
            response = requests.post(
                f"{BASE_URL}/tests/results",
                json={
                    "testType": "comprehensionEcrite",
                    "examId": "exam_1",
                    "examTitle": "Test de Compréhension Écrite",
                    "score": 80,
                    "totalQuestions": 10,
                    "correctAnswers": 8,
                    "timeSpent": 300,
                    "answers": []
                },
                headers={"Authorization": f"Bearer {free_token}"},
                timeout=10
            )
            
            if response.status_code == 200:
                log_test("Mock Test: Free user 1st submission succeeds", True, f"Status: {response.status_code}")
            else:
                log_test("Mock Test: Free user 1st submission succeeds", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Mock Test: Free user 1st submission succeeds", False, f"Exception: {str(e)}")
        
        # Second submission - should fail with 403 LIMIT_REACHED
        time.sleep(1)  # Small delay
        try:
            response = requests.post(
                f"{BASE_URL}/tests/results",
                json={
                    "testType": "comprehensionOrale",
                    "examId": "exam_2",
                    "examTitle": "Test de Compréhension Orale",
                    "score": 75,
                    "totalQuestions": 10,
                    "correctAnswers": 7,
                    "timeSpent": 400,
                    "answers": []
                },
                headers={"Authorization": f"Bearer {free_token}"},
                timeout=10
            )
            
            if response.status_code == 403:
                data = response.json()
                checks = [
                    (data.get('code') == 'LIMIT_REACHED', f"code is 'LIMIT_REACHED'"),
                    (data.get('upgradeRequired') == True, f"upgradeRequired is true")
                ]
                
                all_passed = all(check[0] for check in checks)
                failed_checks = [check[1] for check in checks if not check[0]]
                
                if all_passed:
                    log_test("Mock Test: Free user 2nd submission gets 403 LIMIT_REACHED", True, f"Status: {response.status_code}, Response: {data}")
                else:
                    log_test("Mock Test: Free user 2nd submission gets 403 LIMIT_REACHED", False, f"Failed checks: {', '.join(failed_checks)}")
            else:
                log_test("Mock Test: Free user 2nd submission gets 403 LIMIT_REACHED", False, f"Expected 403, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Mock Test: Free user 2nd submission gets 403 LIMIT_REACHED", False, f"Exception: {str(e)}")
    else:
        log_test("Mock Test: Free user 1st submission succeeds", False, "Failed to create free user")
        log_test("Mock Test: Free user 2nd submission gets 403 LIMIT_REACHED", False, "Failed to create free user")
    
    # Test 4b: Standard user - should be able to submit multiple tests (unlimited)
    print("\n--- Test 4b: Standard user unlimited mock tests ---")
    standard_email = generate_random_email()
    standard_token = register_user(standard_email)
    
    if standard_token:
        upgrade_user(standard_token, "standard")
        
        # Submit 3 tests - all should succeed
        all_succeeded = True
        for i in range(3):
            try:
                response = requests.post(
                    f"{BASE_URL}/tests/results",
                    json={
                        "testType": "comprehensionEcrite",
                        "examId": f"exam_{i+1}",
                        "examTitle": f"Test {i+1}",
                        "score": 80 + i,
                        "totalQuestions": 10,
                        "correctAnswers": 8,
                        "timeSpent": 300,
                        "answers": []
                    },
                    headers={"Authorization": f"Bearer {standard_token}"},
                    timeout=10
                )
                
                if response.status_code != 200:
                    all_succeeded = False
                    print(f"   Test {i+1} failed: {response.status_code} - {response.text}")
                    break
                
                time.sleep(0.5)  # Small delay between requests
            except Exception as e:
                all_succeeded = False
                print(f"   Test {i+1} exception: {e}")
                break
        
        if all_succeeded:
            log_test("Mock Test: Standard user submits 3 tests successfully", True, "All 3 submissions returned 200")
        else:
            log_test("Mock Test: Standard user submits 3 tests successfully", False, "At least one submission failed")
    else:
        log_test("Mock Test: Standard user submits 3 tests successfully", False, "Failed to create standard user")

def test_rate_limiting():
    """Test POST /api/writing/evaluate rate limiting"""
    print("\n" + "="*80)
    print("TEST CASE 5: POST /api/writing/evaluate - Rate limiting")
    print("="*80)
    
    # Test 5a: Free user - rate limit 1/min
    print("\n--- Test 5a: Free user rate limit (1/min) ---")
    free_email = generate_random_email()
    free_token = register_user(free_email)
    
    if free_token:
        # First call - should pass rate limit but fail validation (empty body)
        try:
            response = requests.post(
                f"{BASE_URL}/writing/evaluate",
                json={},
                headers={"Authorization": f"Bearer {free_token}"},
                timeout=10
            )
            
            if response.status_code == 400:
                log_test("Rate Limit: Free user 1st call passes rate limit", True, f"Status: {response.status_code} (validation error, passed rate limit)")
            else:
                log_test("Rate Limit: Free user 1st call passes rate limit", False, f"Expected 400 (validation error), got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Rate Limit: Free user 1st call passes rate limit", False, f"Exception: {str(e)}")
        
        # Second call within 60 seconds - should get 429 rate limit
        time.sleep(1)  # Small delay
        try:
            response = requests.post(
                f"{BASE_URL}/writing/evaluate",
                json={},
                headers={"Authorization": f"Bearer {free_token}"},
                timeout=10
            )
            
            if response.status_code == 429:
                data = response.json()
                if 'retryAfter' in data:
                    log_test("Rate Limit: Free user 2nd call gets 429", True, f"Status: {response.status_code}, retryAfter: {data.get('retryAfter')}")
                else:
                    log_test("Rate Limit: Free user 2nd call gets 429", True, f"Status: {response.status_code} (missing retryAfter but correct status)")
            else:
                log_test("Rate Limit: Free user 2nd call gets 429", False, f"Expected 429, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Rate Limit: Free user 2nd call gets 429", False, f"Exception: {str(e)}")
    else:
        log_test("Rate Limit: Free user 1st call passes rate limit", False, "Failed to create free user")
        log_test("Rate Limit: Free user 2nd call gets 429", False, "Failed to create free user")
    
    # Test 5b: Premium user - rate limit 20/min (should handle multiple rapid calls)
    print("\n--- Test 5b: Premium user rate limit (20/min) ---")
    premium_email = generate_random_email()
    premium_token = register_user(premium_email)
    
    if premium_token:
        upgrade_user(premium_token, "premium")
        
        # Make 5 rapid calls - should all pass rate limit (get 400 for validation)
        all_passed_rate_limit = True
        for i in range(5):
            try:
                response = requests.post(
                    f"{BASE_URL}/writing/evaluate",
                    json={},
                    headers={"Authorization": f"Bearer {premium_token}"},
                    timeout=10
                )
                
                # Should get 400 (validation error) not 429 (rate limit)
                if response.status_code == 429:
                    all_passed_rate_limit = False
                    print(f"   Call {i+1} hit rate limit (429)")
                    break
                elif response.status_code != 400:
                    print(f"   Call {i+1} unexpected status: {response.status_code}")
                
                time.sleep(0.2)  # Small delay between requests
            except Exception as e:
                all_passed_rate_limit = False
                print(f"   Call {i+1} exception: {e}")
                break
        
        if all_passed_rate_limit:
            log_test("Rate Limit: Premium user makes 5 rapid calls without 429", True, "All 5 calls passed rate limit (got 400 validation errors)")
        else:
            log_test("Rate Limit: Premium user makes 5 rapid calls without 429", False, "At least one call hit rate limit (429)")
    else:
        log_test("Rate Limit: Premium user makes 5 rapid calls without 429", False, "Failed to create premium user")

def test_stripe_create_checkout():
    """Test POST /api/stripe/create-checkout with new price keys"""
    print("\n" + "="*80)
    print("TEST CASE 6: POST /api/stripe/create-checkout - Price keys")
    print("="*80)
    
    # Create a test user
    test_email = generate_random_email()
    test_token = register_user(test_email)
    
    if test_token:
        # Test all valid price keys
        price_keys = ['standard_monthly', 'standard_yearly', 'premium_monthly', 'premium_yearly']
        
        for price_key in price_keys:
            print(f"\n--- Test 6: Price key '{price_key}' ---")
            try:
                response = requests.post(
                    f"{BASE_URL}/stripe/create-checkout",
                    json={"priceKey": price_key},
                    headers={"Authorization": f"Bearer {test_token}"},
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if 'url' in data and 'checkout.stripe.com' in data['url']:
                        log_test(f"Stripe Checkout: {price_key} returns valid URL", True, f"URL: {data['url'][:50]}...")
                    else:
                        log_test(f"Stripe Checkout: {price_key} returns valid URL", False, f"Missing or invalid URL: {data}")
                else:
                    log_test(f"Stripe Checkout: {price_key} returns valid URL", False, f"Expected 200, got {response.status_code}: {response.text}")
            except Exception as e:
                log_test(f"Stripe Checkout: {price_key} returns valid URL", False, f"Exception: {str(e)}")
        
        # Test invalid price key
        print("\n--- Test 6: Invalid price key ---")
        try:
            response = requests.post(
                f"{BASE_URL}/stripe/create-checkout",
                json={"priceKey": "invalid_key"},
                headers={"Authorization": f"Bearer {test_token}"},
                timeout=10
            )
            
            if response.status_code == 400:
                log_test("Stripe Checkout: Invalid price key returns 400", True, f"Status: {response.status_code}")
            else:
                log_test("Stripe Checkout: Invalid price key returns 400", False, f"Expected 400, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Stripe Checkout: Invalid price key returns 400", False, f"Exception: {str(e)}")
    else:
        for price_key in ['standard_monthly', 'standard_yearly', 'premium_monthly', 'premium_yearly']:
            log_test(f"Stripe Checkout: {price_key} returns valid URL", False, "Failed to create test user")
        log_test("Stripe Checkout: Invalid price key returns 400", False, "Failed to create test user")

def test_subscription_upgrade():
    """Test POST /api/subscription/upgrade"""
    print("\n" + "="*80)
    print("TEST CASE 7: POST /api/subscription/upgrade - Manual tier upgrade")
    print("="*80)
    
    # Test 7a: Valid tier upgrade (standard)
    print("\n--- Test 7a: Upgrade to standard ---")
    test_email = generate_random_email()
    test_token = register_user(test_email)
    
    if test_token:
        try:
            response = requests.post(
                f"{BASE_URL}/subscription/upgrade",
                json={"tier": "standard"},
                headers={"Authorization": f"Bearer {test_token}"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') == True and data.get('user', {}).get('subscriptionTier') == 'standard':
                    log_test("Subscription Upgrade: Standard tier accepted", True, f"Status: {response.status_code}, Tier: {data.get('user', {}).get('subscriptionTier')}")
                else:
                    log_test("Subscription Upgrade: Standard tier accepted", False, f"Status 200 but unexpected response: {data}")
            else:
                log_test("Subscription Upgrade: Standard tier accepted", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Subscription Upgrade: Standard tier accepted", False, f"Exception: {str(e)}")
    else:
        log_test("Subscription Upgrade: Standard tier accepted", False, "Failed to create test user")
    
    # Test 7b: Valid tier upgrade (premium)
    print("\n--- Test 7b: Upgrade to premium ---")
    test_email2 = generate_random_email()
    test_token2 = register_user(test_email2)
    
    if test_token2:
        try:
            response = requests.post(
                f"{BASE_URL}/subscription/upgrade",
                json={"tier": "premium"},
                headers={"Authorization": f"Bearer {test_token2}"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') == True and data.get('user', {}).get('subscriptionTier') == 'premium':
                    log_test("Subscription Upgrade: Premium tier accepted", True, f"Status: {response.status_code}, Tier: {data.get('user', {}).get('subscriptionTier')}")
                else:
                    log_test("Subscription Upgrade: Premium tier accepted", False, f"Status 200 but unexpected response: {data}")
            else:
                log_test("Subscription Upgrade: Premium tier accepted", False, f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Subscription Upgrade: Premium tier accepted", False, f"Exception: {str(e)}")
    else:
        log_test("Subscription Upgrade: Premium tier accepted", False, "Failed to create test user")
    
    # Test 7c: Invalid tier
    print("\n--- Test 7c: Invalid tier (basic) ---")
    test_email3 = generate_random_email()
    test_token3 = register_user(test_email3)
    
    if test_token3:
        try:
            response = requests.post(
                f"{BASE_URL}/subscription/upgrade",
                json={"tier": "basic"},
                headers={"Authorization": f"Bearer {test_token3}"},
                timeout=10
            )
            
            if response.status_code == 400:
                log_test("Subscription Upgrade: Invalid tier returns 400", True, f"Status: {response.status_code}")
            else:
                log_test("Subscription Upgrade: Invalid tier returns 400", False, f"Expected 400, got {response.status_code}: {response.text}")
        except Exception as e:
            log_test("Subscription Upgrade: Invalid tier returns 400", False, f"Exception: {str(e)}")
    else:
        log_test("Subscription Upgrade: Invalid tier returns 400", False, "Failed to create test user")

def print_summary():
    """Print test summary"""
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    total = test_results['passed'] + test_results['failed']
    print(f"Total Tests: {total}")
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    if total > 0:
        print(f"Success Rate: {(test_results['passed'] / total * 100):.1f}%")
    
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
    print("CLB French Trainer - 3-Tier Subscription Model Testing")
    print(f"Base URL: {BASE_URL}")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print("="*80)
    
    # Run all tests
    test_usage_endpoint()
    test_tests_access_endpoint()
    test_ai_speaking_endpoint()
    test_mock_test_limit_enforcement()
    test_rate_limiting()
    test_stripe_create_checkout()
    test_subscription_upgrade()
    
    # Print summary
    print_summary()
    
    # Exit with appropriate code
    sys.exit(0 if test_results['failed'] == 0 else 1)
