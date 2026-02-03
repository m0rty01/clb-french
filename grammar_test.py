#!/usr/bin/env python3
"""
Backend API Testing for CLB French Trainer - Grammar Learning System
Tests all grammar-related API endpoints with comprehensive scenarios
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://tef-tcf-prep.preview.emergentagent.com"

class GrammarAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token = None
        self.user_id = None
        self.test_results = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'details': details
        })
    
    def make_request(self, method, endpoint, data=None, headers=None):
        """Make HTTP request with error handling"""
        url = f"{self.base_url}{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        
        if headers:
            default_headers.update(headers)
            
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=default_headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            return response
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None
    
    def test_user_registration(self):
        """Test user registration"""
        print("\n=== Testing User Registration ===")
        
        user_data = {
            "email": "grammartest@test.com",
            "password": "testpass123",
            "name": "Grammar Test"
        }
        
        response = self.make_request('POST', '/api/auth/register', user_data)
        
        if not response:
            self.log_test("User Registration", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'token' in data and 'user' in data:
                self.token = data['token']
                self.user_id = data['user']['id']
                self.log_test("User Registration", True, f"User created successfully with ID: {self.user_id}")
                return True
            else:
                self.log_test("User Registration", False, "Missing token or user in response", data)
                return False
        elif response.status_code == 400 and "already exists" in response.text:
            # User already exists, try to login
            self.log_test("User Registration", True, "User already exists, will proceed with login")
            return True
        else:
            self.log_test("User Registration", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_user_login(self):
        """Test user login"""
        print("\n=== Testing User Login ===")
        
        login_data = {
            "email": "grammartest@test.com",
            "password": "testpass123"
        }
        
        response = self.make_request('POST', '/api/auth/login', login_data)
        
        if not response:
            self.log_test("User Login", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'token' in data and 'user' in data:
                self.token = data['token']
                self.user_id = data['user']['id']
                self.log_test("User Login", True, f"Login successful, token obtained")
                return True
            else:
                self.log_test("User Login", False, "Missing token or user in response", data)
                return False
        else:
            self.log_test("User Login", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_onboarding(self):
        """Test onboarding with CLB5 pathway"""
        print("\n=== Testing Onboarding ===")
        
        if not self.token:
            self.log_test("Onboarding", False, "No authentication token available")
            return False
        
        onboarding_data = {
            "pathway": "clb5",
            "dailyTimeBudget": 210
        }
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request('POST', '/api/onboarding', onboarding_data, headers)
        
        if not response:
            self.log_test("Onboarding", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'user' in data and data['user'].get('onboardingComplete'):
                self.log_test("Onboarding", True, f"Onboarding completed with CLB5 pathway, current day: {data['user'].get('currentDay')}")
                return True
            else:
                self.log_test("Onboarding", False, "Onboarding not marked as complete", data)
                return False
        else:
            self.log_test("Onboarding", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_daily_grammar_topic(self):
        """Test getting daily grammar topic"""
        print("\n=== Testing Daily Grammar Topic ===")
        
        if not self.token:
            self.log_test("Daily Grammar Topic", False, "No authentication token available")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request('GET', '/api/grammar/daily-topic', headers=headers)
        
        if not response:
            self.log_test("Daily Grammar Topic", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'topic' in data and data['topic']:
                topic = data['topic']
                expected_topic_id = "articles-definite"  # Day 1 topic
                if topic.get('id') == expected_topic_id:
                    self.log_test("Daily Grammar Topic", True, f"Correct topic returned: {topic.get('title')} (ID: {topic.get('id')})")
                    return True
                else:
                    self.log_test("Daily Grammar Topic", True, f"Topic returned: {topic.get('title')} (ID: {topic.get('id')})", "Different topic than expected but valid")
                    return True
            else:
                self.log_test("Daily Grammar Topic", False, "No topic in response", data)
                return False
        elif response.status_code == 401:
            self.log_test("Daily Grammar Topic", False, "Unauthorized - token invalid", response.text)
            return False
        else:
            self.log_test("Daily Grammar Topic", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_submit_quiz(self):
        """Test submitting quiz answers"""
        print("\n=== Testing Quiz Submission ===")
        
        if not self.token:
            self.log_test("Quiz Submission", False, "No authentication token available")
            return False
        
        quiz_data = {
            "topicId": "articles-definite",
            "answers": {0: 0, 1: 2, 2: 1, 3: 3, 4: 1, 5: 1, 6: 1, 7: 2},
            "score": 5,
            "totalQuestions": 8
        }
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request('POST', '/api/grammar/submit-quiz', quiz_data, headers)
        
        if not response:
            self.log_test("Quiz Submission", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'success' in data and data['success'] and 'result' in data:
                result = data['result']
                percentage = result.get('percentage')
                is_weak = result.get('isWeak')
                self.log_test("Quiz Submission", True, f"Quiz submitted successfully. Score: {result.get('score')}/{result.get('totalQuestions')} ({percentage}%), Weak: {is_weak}")
                return True
            else:
                self.log_test("Quiz Submission", False, "Invalid response structure", data)
                return False
        elif response.status_code == 401:
            self.log_test("Quiz Submission", False, "Unauthorized - token invalid", response.text)
            return False
        else:
            self.log_test("Quiz Submission", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_weak_topics(self):
        """Test getting weak topics"""
        print("\n=== Testing Weak Topics ===")
        
        if not self.token:
            self.log_test("Weak Topics", False, "No authentication token available")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request('GET', '/api/grammar/weak-topics', headers=headers)
        
        if not response:
            self.log_test("Weak Topics", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'weakTopics' in data and 'count' in data:
                weak_topics = data['weakTopics']
                count = data['count']
                self.log_test("Weak Topics", True, f"Retrieved {count} weak topics")
                if count > 0:
                    print(f"   Weak topics: {[t.get('title', t.get('id')) for t in weak_topics]}")
                return True
            else:
                self.log_test("Weak Topics", False, "Invalid response structure", data)
                return False
        elif response.status_code == 401:
            self.log_test("Weak Topics", False, "Unauthorized - token invalid", response.text)
            return False
        else:
            self.log_test("Weak Topics", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_topic_by_id(self):
        """Test getting specific topic by ID"""
        print("\n=== Testing Topic by ID ===")
        
        if not self.token:
            self.log_test("Topic by ID", False, "No authentication token available")
            return False
        
        topic_id = "articles-definite"
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request('GET', f'/api/grammar/topic/{topic_id}', headers=headers)
        
        if not response:
            self.log_test("Topic by ID", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'topic' in data and data['topic']:
                topic = data['topic']
                if topic.get('id') == topic_id:
                    self.log_test("Topic by ID", True, f"Topic retrieved: {topic.get('title')} with {len(topic.get('quiz', []))} quiz questions")
                    return True
                else:
                    self.log_test("Topic by ID", False, f"Wrong topic returned. Expected: {topic_id}, Got: {topic.get('id')}")
                    return False
            else:
                self.log_test("Topic by ID", False, "No topic in response", data)
                return False
        elif response.status_code == 401:
            self.log_test("Topic by ID", False, "Unauthorized - token invalid", response.text)
            return False
        elif response.status_code == 404:
            self.log_test("Topic by ID", False, "Topic not found", response.text)
            return False
        else:
            self.log_test("Topic by ID", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_all_topics(self):
        """Test getting all grammar topics"""
        print("\n=== Testing All Topics ===")
        
        if not self.token:
            self.log_test("All Topics", False, "No authentication token available")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request('GET', '/api/grammar/all-topics', headers=headers)
        
        if not response:
            self.log_test("All Topics", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'topics' in data and 'currentDay' in data and 'pathway' in data:
                topics = data['topics']
                current_day = data['currentDay']
                pathway = data['pathway']
                available_topics = [t for t in topics if t.get('isAvailable')]
                self.log_test("All Topics", True, f"Retrieved {len(topics)} topics for {pathway} pathway, {len(available_topics)} available on day {current_day}")
                return True
            else:
                self.log_test("All Topics", False, "Invalid response structure", data)
                return False
        elif response.status_code == 401:
            self.log_test("All Topics", False, "Unauthorized - token invalid", response.text)
            return False
        else:
            self.log_test("All Topics", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_remove_weak_topic(self):
        """Test removing topic from weak list"""
        print("\n=== Testing Remove Weak Topic ===")
        
        if not self.token:
            self.log_test("Remove Weak Topic", False, "No authentication token available")
            return False
        
        remove_data = {
            "topicId": "articles-definite"
        }
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.make_request('POST', '/api/grammar/remove-weak', remove_data, headers)
        
        if not response:
            self.log_test("Remove Weak Topic", False, "Request failed")
            return False
            
        if response.status_code == 200:
            data = response.json()
            if 'success' in data and data['success'] and 'weakTopics' in data:
                weak_topics = data['weakTopics']
                self.log_test("Remove Weak Topic", True, f"Topic removed from weak list. Remaining weak topics: {len(weak_topics)}")
                return True
            else:
                self.log_test("Remove Weak Topic", False, "Invalid response structure", data)
                return False
        elif response.status_code == 401:
            self.log_test("Remove Weak Topic", False, "Unauthorized - token invalid", response.text)
            return False
        else:
            self.log_test("Remove Weak Topic", False, f"Status: {response.status_code}", response.text)
            return False
    
    def test_unauthorized_access(self):
        """Test that endpoints properly reject unauthorized requests"""
        print("\n=== Testing Unauthorized Access ===")
        
        endpoints_to_test = [
            '/api/grammar/daily-topic',
            '/api/grammar/weak-topics',
            '/api/grammar/topic/articles-definite',
            '/api/grammar/all-topics'
        ]
        
        all_passed = True
        for endpoint in endpoints_to_test:
            response = self.make_request('GET', endpoint)
            if response and response.status_code == 401:
                self.log_test(f"Unauthorized Access - {endpoint}", True, "Correctly rejected unauthorized request")
            else:
                self.log_test(f"Unauthorized Access - {endpoint}", False, f"Should return 401, got {response.status_code if response else 'No response'}")
                all_passed = False
        
        # Test POST endpoints
        post_endpoints = [
            ('/api/grammar/submit-quiz', {"topicId": "test", "answers": {}, "score": 0}),
            ('/api/grammar/remove-weak', {"topicId": "test"})
        ]
        
        for endpoint, data in post_endpoints:
            response = self.make_request('POST', endpoint, data)
            if response and response.status_code == 401:
                self.log_test(f"Unauthorized Access - {endpoint}", True, "Correctly rejected unauthorized request")
            else:
                self.log_test(f"Unauthorized Access - {endpoint}", False, f"Should return 401, got {response.status_code if response else 'No response'}")
                all_passed = False
        
        return all_passed
    
    def run_all_tests(self):
        """Run all grammar API tests"""
        print(f"🧪 Starting Grammar Learning System API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Test sequence
        tests = [
            ("User Registration", self.test_user_registration),
            ("User Login", self.test_user_login),
            ("Onboarding", self.test_onboarding),
            ("Daily Grammar Topic", self.test_daily_grammar_topic),
            ("Quiz Submission", self.test_submit_quiz),
            ("Weak Topics", self.test_weak_topics),
            ("Topic by ID", self.test_topic_by_id),
            ("All Topics", self.test_all_topics),
            ("Remove Weak Topic", self.test_remove_weak_topic),
            ("Unauthorized Access", self.test_unauthorized_access)
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            try:
                if test_func():
                    passed += 1
            except Exception as e:
                self.log_test(test_name, False, f"Test threw exception: {str(e)}")
        
        # Summary
        print(f"\n{'='*60}")
        print(f"🏁 GRAMMAR API TESTING COMPLETE")
        print(f"{'='*60}")
        print(f"✅ Passed: {passed}/{total}")
        print(f"❌ Failed: {total - passed}/{total}")
        print(f"📊 Success Rate: {(passed/total)*100:.1f}%")
        
        if passed == total:
            print("🎉 ALL TESTS PASSED! Grammar Learning System API is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Please check the details above.")
            return False

def main():
    """Main function to run grammar API tests"""
    tester = GrammarAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()