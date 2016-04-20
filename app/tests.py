from google.appengine.ext import testbed
from app import TasksHandler, Task, get_task_list_key

import webtest
import webapp2
import unittest
import json

class AppTest(unittest.TestCase):
    def setUp(self):
        app = webapp2.WSGIApplication([('/', TasksHandler)])
        self.testapp = webtest.TestApp(app)
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def testTaskList(self):
        # Get all tasks
        # Prepare data to test against
        task2 = Task(parent=get_task_list_key(), content='New 2')
        task1 = Task(parent=get_task_list_key(), content='New 1')
        task1.put()
        task2.put()
        body_content = json.dumps([{'id': task.key.id(), 'content': task.content}
            for task in Task.get_tasks(get_task_list_key())
        ])

        response = self.testapp.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')
        self.assertEqual(response.normal_body, body_content)
