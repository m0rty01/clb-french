#!/usr/bin/env python3
"""
CLB French Trainer Backend API Tests
Tests all backend APIs including auth, onboarding, daily logs, and progress tracking.
"""

import requests
import json
import time
from datetime import datetime, timedelta
import uuid

# Base URL from environment
BASE_URL = "https://frenchpath.preview.emergentagent.com/api"

class CLBFrenchTrainerTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token = None
        self.user_data = None
        self.test_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
        self.test_password = "SecurePassword123!"
        self.test_name = "Marie Dubois"
        
    def log(self, message):
        """Log test messages with timestamp"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {message}")
        
    def make_request(self, method, endpoint, data=None, headers=None):
        """Make HTTP request with error handling"""
        url = f"{self.base_url}{endpoint}"
        
        default_headers = {"Content-Type": "application/json"}
        if headers:
            default_headers.update(headers)
            
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=default_headers, timeout=30)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, headers=default_headers, timeout=30)
            elif method.upper() == "PUT":
                response = requests.put(url, json=data, headers=default_headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            self.log(f"🔍 {method} {endpoint} -> Status: {response.status_code}")
            return response
        except requests.exceptions.Timeout as e:
            self.log(f"❌ Request timeout for {method} {endpoint}: {str(e)}")
            return None
        except requests.exceptions.ConnectionError as e:
            self.log(f"❌ Connection error for {method} {endpoint}: {str(e)}")
            return None
        except requests.exceptions.RequestException as e:
            self.log(f"❌ Request failed for {method} {endpoint}: {str(e)}")
            return None
        except Exception as e:
            self.log(f"❌ Unexpected error for {method} {endpoint}: {str(e)}")
            return None
            
    def test_user_registration(self):
        """Test POST /api/auth/register"""
        self.log("🧪 Testing User Registration API...")
        
        # Test successful registration
        data = {
            "email": self.test_email,
            "password": self.test_password,
            "name": self.test_name
        }
        
        response = self.make_request("POST", "/auth/register", data)
        
        if not response:
            self.log("❌ Registration request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "user" in result and "token" in result:
                self.token = result["token"]
                self.user_data = result["user"]
                self.log(f"✅ Registration successful - User ID: {self.user_data.get('id')}")
                self.log(f"✅ JWT token received: {self.token[:20]}...")
                return True
            else:
                self.log(f"❌ Registration response missing required fields: {result}")
                return False
        else:
            self.log(f"❌ Registration failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_duplicate_registration(self):
        """Test duplicate email registration"""
        self.log("🧪 Testing Duplicate Registration...")
        
        data = {
            "email": self.test_email,
            "password": self.test_password,
            "name": self.test_name
        }
        
        response = self.make_request("POST", "/auth/register", data)
        
        if response is None:
            self.log("❌ Duplicate registration request failed")
            return False
            
        if response.status_code == 400:
            result = response.json()
            if "already exists" in result.get("error", "").lower():
                self.log("✅ Duplicate registration properly rejected")
                return True
            else:
                self.log(f"❌ Wrong error message: {result.get('error')}")
                return False
        else:
            self.log(f"❌ Expected 400, got {response.status_code}: {response.text}")
            return False
        
    def test_user_login(self):
        """Test POST /api/auth/login"""
        self.log("🧪 Testing User Login API...")
        
        data = {
            "email": self.test_email,
            "password": self.test_password
        }
        
        response = self.make_request("POST", "/auth/login", data)
        
        if not response:
            self.log("❌ Login request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "user" in result and "token" in result:
                self.token = result["token"]
                self.user_data = result["user"]
                self.log(f"✅ Login successful - User: {self.user_data.get('email')}")
                return True
            else:
                self.log(f"❌ Login response missing required fields: {result}")
                return False
        else:
            self.log(f"❌ Login failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_invalid_login(self):
        """Test login with invalid credentials"""
        self.log("🧪 Testing Invalid Login...")
        
        data = {
            "email": self.test_email,
            "password": "wrongpassword"
        }
        
        response = self.make_request("POST", "/auth/login", data)
        
        if not response:
            self.log("❌ Invalid login request failed")
            return False
            
        if response.status_code == 401:
            result = response.json()
            if "invalid credentials" in result.get("error", "").lower():
                self.log("✅ Invalid login properly rejected")
                return True
            else:
                self.log(f"❌ Wrong error message: {result.get('error')}")
                return False
        else:
            self.log(f"❌ Expected 401, got {response.status_code}: {response.text}")
            return False
        
    def test_get_current_user(self):
        """Test GET /api/auth/me"""
        self.log("🧪 Testing Get Current User API...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("GET", "/auth/me", headers=headers)
        
        if not response:
            self.log("❌ Get current user request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "user" in result:
                user = result["user"]
                self.log(f"✅ Current user retrieved - Email: {user.get('email')}")
                self.log(f"✅ Onboarding complete: {user.get('onboardingComplete', False)}")
                return True
            else:
                self.log(f"❌ Get current user response missing user field: {result}")
                return False
        else:
            self.log(f"❌ Get current user failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_unauthorized_access(self):
        """Test accessing protected endpoint without token"""
        self.log("🧪 Testing Unauthorized Access...")
        
        response = self.make_request("GET", "/auth/me")
        
        if not response:
            self.log("❌ Unauthorized access request failed")
            return False
            
        if response.status_code == 401:
            result = response.json()
            if "unauthorized" in result.get("error", "").lower():
                self.log("✅ Unauthorized access properly rejected")
                return True
            else:
                self.log(f"❌ Wrong error message: {result.get('error')}")
                return False
        else:
            self.log(f"❌ Expected 401, got {response.status_code}: {response.text}")
            return False
        
    def test_onboarding(self):
        """Test POST /api/onboarding"""
        self.log("🧪 Testing Onboarding API...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        data = {
            "pathway": "clb5",
            "targetExamDate": (datetime.now() + timedelta(days=120)).isoformat(),
            "dailyTimeBudget": 180  # 3 hours
        }
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("POST", "/onboarding", data, headers)
        
        if not response:
            self.log("❌ Onboarding request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "user" in result:
                user = result["user"]
                if user.get("onboardingComplete") and user.get("pathway") == "clb5":
                    self.log(f"✅ Onboarding successful - Pathway: {user.get('pathway')}")
                    self.log(f"✅ Current day: {user.get('currentDay')}")
                    self.user_data = user
                    return True
                else:
                    self.log(f"❌ Onboarding incomplete - User data: {user}")
                    return False
            else:
                self.log(f"❌ Onboarding response missing user field: {result}")
                return False
        else:
            self.log(f"❌ Onboarding failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_invalid_pathway(self):
        """Test onboarding with invalid pathway"""
        self.log("🧪 Testing Invalid Pathway...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        data = {"pathway": "invalid_pathway"}
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("POST", "/onboarding", data, headers)
        
        if not response:
            self.log("❌ Invalid pathway request failed")
            return False
            
        if response.status_code == 400:
            result = response.json()
            if "invalid pathway" in result.get("error", "").lower():
                self.log("✅ Invalid pathway properly rejected")
                return True
            else:
                self.log(f"❌ Wrong error message: {result.get('error')}")
                return False
        else:
            self.log(f"❌ Expected 400, got {response.status_code}: {response.text}")
            return False
        
    def test_get_daily_log_today(self):
        """Test GET /api/daily-log/today"""
        self.log("🧪 Testing Get Daily Log Today API...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("GET", "/daily-log/today", headers=headers)
        
        if not response:
            self.log("❌ Get daily log request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "dailyLog" in result and "user" in result:
                daily_log = result["dailyLog"]
                activities = daily_log.get("activities", {})
                expected_activities = ["grammar", "listening", "speaking", "reading", "writing"]
                
                if all(activity in activities for activity in expected_activities):
                    self.log(f"✅ Daily log retrieved - Date: {daily_log.get('date')}")
                    self.log(f"✅ All 5 activities present: {list(activities.keys())}")
                    return True
                else:
                    self.log(f"❌ Daily log missing activities - Found: {list(activities.keys())}")
                    return False
            else:
                self.log(f"❌ Daily log response missing required fields: {result}")
                return False
        else:
            self.log(f"❌ Get daily log failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_update_daily_log(self):
        """Test PUT /api/daily-log"""
        self.log("🧪 Testing Update Daily Log API...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        # Update some activities
        data = {
            "activities": {
                "grammar": {"completed": True, "timeSpent": 45, "notes": "Completed verb conjugations"},
                "listening": {"completed": True, "timeSpent": 30, "notes": "Listened to French podcast"},
                "speaking": {"completed": False, "timeSpent": 0, "notes": ""},
                "reading": {"completed": True, "timeSpent": 25, "notes": "Read news article"},
                "writing": {"completed": False, "timeSpent": 0, "notes": ""}
            }
        }
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("PUT", "/daily-log", data, headers)
        
        if not response:
            self.log("❌ Update daily log request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "dailyLog" in result:
                daily_log = result["dailyLog"]
                activities = daily_log.get("activities", {})
                total_time = daily_log.get("totalTimeSpent", 0)
                
                # Check if updates were applied
                if (activities.get("grammar", {}).get("completed") and 
                    activities.get("listening", {}).get("completed") and
                    total_time == 100):  # 45 + 30 + 25
                    self.log(f"✅ Daily log updated - Total time: {total_time} minutes")
                    self.log(f"✅ Activities updated correctly")
                    return True
                else:
                    self.log(f"❌ Daily log update not applied correctly - Activities: {activities}")
                    return False
            else:
                self.log(f"❌ Update daily log response missing dailyLog field: {result}")
                return False
        else:
            self.log(f"❌ Update daily log failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_complete_daily_log(self):
        """Test POST /api/daily-log/complete"""
        self.log("🧪 Testing Complete Daily Log API...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("POST", "/daily-log/complete", headers=headers)
        
        if not response:
            self.log("❌ Complete daily log request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "message" in result and "user" in result:
                user = result["user"]
                current_day = user.get("currentDay", 0)
                
                if current_day > 1:  # Should have advanced from day 1
                    self.log(f"✅ Daily log completed - Advanced to day: {current_day}")
                    self.log(f"✅ Message: {result.get('message')}")
                    return True
                else:
                    self.log(f"❌ Day not advanced - Current day: {current_day}")
                    return False
            else:
                self.log(f"❌ Complete daily log response missing required fields: {result}")
                return False
        else:
            self.log(f"❌ Complete daily log failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_get_progress(self):
        """Test GET /api/progress"""
        self.log("🧪 Testing Get Progress API...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("GET", "/progress", headers=headers)
        
        if not response:
            self.log("❌ Get progress request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            required_fields = ["streak", "totalDaysCompleted", "totalTimeSpent", "progressPercent", "currentDay", "totalDays"]
            
            if all(field in result for field in required_fields):
                self.log(f"✅ Progress retrieved - Streak: {result.get('streak')}")
                self.log(f"✅ Total days completed: {result.get('totalDaysCompleted')}")
                self.log(f"✅ Total time spent: {result.get('totalTimeSpent')} minutes")
                self.log(f"✅ Progress: {result.get('progressPercent')}%")
                self.log(f"✅ Current day: {result.get('currentDay')}/{result.get('totalDays')}")
                return True
            else:
                missing_fields = [field for field in required_fields if field not in result]
                self.log(f"❌ Progress response missing fields: {missing_fields}")
                return False
        else:
            self.log(f"❌ Get progress failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_pathway_reset(self):
        """Test POST /api/pathway/reset"""
        self.log("🧪 Testing Pathway Reset API...")
        
        if not self.token:
            self.log("❌ No token available for authentication")
            return False
            
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request("POST", "/pathway/reset", headers=headers)
        
        if not response:
            self.log("❌ Pathway reset request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "message" in result and "user" in result:
                user = result["user"]
                
                # Check if pathway was reset
                if (user.get("pathway") is None and 
                    user.get("onboardingComplete") is False and
                    user.get("currentDay") == 0):
                    self.log(f"✅ Pathway reset successful")
                    self.log(f"✅ Message: {result.get('message')}")
                    return True
                else:
                    self.log(f"❌ Pathway not properly reset - User data: {user}")
                    return False
            else:
                self.log(f"❌ Pathway reset response missing required fields: {result}")
                return False
        else:
            self.log(f"❌ Pathway reset failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def test_api_root(self):
        """Test GET /api/ root endpoint"""
        self.log("🧪 Testing API Root Endpoint...")
        
        response = self.make_request("GET", "/")
        
        if not response:
            self.log("❌ API root request failed")
            return False
            
        if response.status_code == 200:
            result = response.json()
            if "message" in result and "version" in result:
                self.log(f"✅ API root accessible - Message: {result.get('message')}")
                self.log(f"✅ Version: {result.get('version')}")
                return True
            else:
                self.log(f"❌ API root response missing required fields: {result}")
                return False
        else:
            self.log(f"❌ API root failed - Status: {response.status_code}, Response: {response.text}")
            return False
            
    def run_all_tests(self):
        """Run all backend API tests"""
        self.log("🚀 Starting CLB French Trainer Backend API Tests")
        self.log(f"🌐 Base URL: {self.base_url}")
        self.log(f"👤 Test user: {self.test_email}")
        
        test_results = {}
        
        # Test sequence following the user flow
        tests = [
            ("API Root", self.test_api_root),
            ("User Registration", self.test_user_registration),
            ("Duplicate Registration", self.test_duplicate_registration),
            ("User Login", self.test_user_login),
            ("Invalid Login", self.test_invalid_login),
            ("Get Current User", self.test_get_current_user),
            ("Unauthorized Access", self.test_unauthorized_access),
            ("Invalid Pathway", self.test_invalid_pathway),
            ("Onboarding", self.test_onboarding),
            ("Get Daily Log Today", self.test_get_daily_log_today),
            ("Update Daily Log", self.test_update_daily_log),
            ("Complete Daily Log", self.test_complete_daily_log),
            ("Get Progress", self.test_get_progress),
            ("Pathway Reset", self.test_pathway_reset),
        ]
        
        for test_name, test_func in tests:
            self.log(f"\n{'='*50}")
            try:
                result = test_func()
                test_results[test_name] = result
                if result:
                    self.log(f"✅ {test_name}: PASSED")
                else:
                    self.log(f"❌ {test_name}: FAILED")
            except Exception as e:
                self.log(f"❌ {test_name}: ERROR - {str(e)}")
                test_results[test_name] = False
            
            # Small delay between tests
            time.sleep(0.5)
        
        # Summary
        self.log(f"\n{'='*50}")
        self.log("📊 TEST SUMMARY")
        self.log(f"{'='*50}")
        
        passed = sum(1 for result in test_results.values() if result)
        total = len(test_results)
        
        for test_name, result in test_results.items():
            status = "✅ PASSED" if result else "❌ FAILED"
            self.log(f"{test_name}: {status}")
        
        self.log(f"\n🎯 Overall Result: {passed}/{total} tests passed")
        
        if passed == total:
            self.log("🎉 ALL TESTS PASSED! Backend APIs are working correctly.")
            return True
        else:
            self.log(f"⚠️  {total - passed} tests failed. Please check the issues above.")
            return False

if __name__ == "__main__":
    tester = CLBFrenchTrainerTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)