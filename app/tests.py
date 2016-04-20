from google.appengine.ext import testbed
from app import MainPage

import webtest
import webapp2
import unittest

class AppTest(unittest.TestCase):
    def setUp(self):
        app = webapp2.WSGIApplication([('/', MainPage)])
        self.testapp = webtest.TestApp(app)
        self.testbed = testbed.Testbed()
        self.testbed.activate()

    def testTaskList(self):
        response = self.testapp.get('/')
        self.assertEqual(response.status_code, 200)
