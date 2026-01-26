#!/usr/bin/env python3
"""
Debug single test
"""

import requests
import json
import uuid
from datetime import datetime

BASE_URL = "https://clbprep.preview.emergentagent.com/api"

class DebugTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
        self.test_password = "SecurePassword123!"
        self.test_name = "Marie Dubois"
        
    def log(self, message):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {message}")
        
    def make_request(self, method, endpoint, data=None, headers=None):
        url = f"{self.base_url}{endpoint}"
        default_headers = {"Content-Type": "application/json"}
        if headers:
            default_headers.update(headers)
            
        try:
            if method.upper() == "POST":
                response = requests.post(url, json=data, headers=default_headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            self.log(f"🔍 {method} {endpoint} -> Status: {response.status_code}")
            self.log(f"Response type: {type(response)}")
            return response
        except Exception as e:
            self.log(f"❌ Exception caught for {method} {endpoint}: {str(e)}")
            self.log(f"Exception type: {type(e)}")
            import traceback
            traceback.print_exc()
            return None
            
    def test_registration_and_duplicate(self):
        self.log("🧪 Testing Registration and Duplicate...")
        
        # First registration
        data = {
            "email": self.test_email,
            "password": self.test_password,
            "name": self.test_name
        }
        
        response1 = self.make_request("POST", "/auth/register", data)
        if not response1 or response1.status_code != 200:
            self.log("❌ First registration failed")
            return False
            
        self.log("✅ First registration successful")
        
        # Duplicate registration
        self.log("Making duplicate registration request...")
        response2 = self.make_request("POST", "/auth/register", data)
        
        self.log(f"Response2 after make_request: {response2}")
        self.log(f"Response2 type: {type(response2)}")
        
        if response2 is None:
            self.log("❌ Duplicate registration request failed - response is None")
            return False
            
        self.log(f"Response object type: {type(response2)}")
        self.log(f"Response status: {response2.status_code}")
        self.log(f"Response text: {response2.text}")
        
        if response2.status_code == 400:
            try:
                result = response2.json()
                self.log(f"JSON result: {result}")
                error_msg = result.get("error", "")
                if "already exists" in error_msg.lower():
                    self.log("✅ Duplicate registration properly rejected")
                    return True
                else:
                    self.log(f"❌ Wrong error message: {error_msg}")
                    return False
            except Exception as e:
                self.log(f"❌ JSON parsing error: {e}")
                return False
        else:
            self.log(f"❌ Expected 400, got {response2.status_code}")
            return False

if __name__ == "__main__":
    tester = DebugTester()
    result = tester.test_registration_and_duplicate()
    print(f"Final result: {result}")