#!/usr/bin/env python3
"""
Simple test to debug the issue
"""

import requests
import json
import uuid

BASE_URL = "https://clbfrench.preview.emergentagent.com/api"

def test_duplicate_registration():
    test_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    print(f"Testing with email: {test_email}")
    
    # First registration
    data = {"email": test_email, "password": "test123", "name": "Test"}
    response1 = requests.post(f"{BASE_URL}/auth/register", json=data, timeout=30)
    print(f"First registration - Status: {response1.status_code}")
    
    if response1.status_code != 200:
        print(f"First registration failed: {response1.text}")
        return False
    
    # Duplicate registration
    response2 = requests.post(f"{BASE_URL}/auth/register", json=data, timeout=30)
    print(f"Duplicate registration - Status: {response2.status_code}")
    print(f"Response text: {response2.text}")
    
    if response2 is None:
        print("Response is None!")
        return False
        
    if response2.status_code == 400:
        try:
            result = response2.json()
            print(f"JSON result: {result}")
            error_msg = result.get("error", "")
            print(f"Error message: '{error_msg}'")
            if "already exists" in error_msg.lower():
                print("✅ Test passed!")
                return True
            else:
                print(f"❌ Wrong error message: {error_msg}")
                return False
        except Exception as e:
            print(f"❌ JSON parsing error: {e}")
            return False
    else:
        print(f"❌ Expected 400, got {response2.status_code}")
        return False

if __name__ == "__main__":
    test_duplicate_registration()