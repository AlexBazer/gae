from google.appengine.ext import testbed
from app import TaskListHandler, TaskHandler, Task, get_task_list_key

import webtest
import webapp2
import unittest
import json


class AppTest(unittest.TestCase):
    def setUp(self):
        app = webapp2.WSGIApplication([
            ('/tasks/', TaskListHandler),
            ('/tasks/(\d+)/', TaskHandler)
        ])
        self.testapp = webtest.TestApp(app)
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_memcache_stub()
        self.testbed.init_datastore_v3_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def testTaskList(self):
        # Get all tasks
        # # Prepare data to test against
        task2 = Task(parent=get_task_list_key(), content='New 2')
        task1 = Task(parent=get_task_list_key(), content='New 1')
        task1.put()
        task2.put()
        body_content = json.dumps([
            {'id': task.key.id(), 'content': task.content}
            for task in Task.get_tasks(get_task_list_key())
        ])

        response = self.testapp.get('/tasks/')
        # # Test handler availability
        self.assertEqual(response.status_code, 200)
        # # Test response content type
        self.assertEqual(response.content_type, 'application/json')
        # # Test response body
        self.assertEqual(response.normal_body, body_content)

    def testCreateTask(self):
        # Creating task with content
        response = self.testapp.post('/tasks/', {'content': 'Task 3'})
        # # Test page availability
        self.assertEqual(response.status_code, 200)
        # # Test response content type
        self.assertEqual(response.content_type, 'application/json')

        task_created = json.loads(response.normal_body)
        # # Test response body is ok
        self.assertEqual(task_created.get('status'), 'ok')
        # # and check if id from response match task
        self.assertIsNotNone(Task.get_entity(get_task_list_key(), task_created.get('id')))

        # Creating task without content
        response = self.testapp.post('/tasks/', {'content': ''})
        # # Test page availability
        self.assertEqual(response.status_code, 200)
        # # Test response content type
        self.assertEqual(response.content_type, 'application/json')
        # # Test response content type
        self.assertEqual(response.normal_body, json.dumps(
            {'status': 'error', 'msg': 'Task content shouldn\'t be empty'}
        ))

    def testDeleteTask(self):
        # Delete task
        key = Task(parent=get_task_list_key(), content='New 4').put()
        _id = key.id()
        response = self.testapp.delete('/tasks/{id}/'.format(id=_id))
        self.assertEqual(response.status_code, 200)
        # # Test response content type;
        self.assertEqual(response.content_type, 'application/json')
        # # Task with setted id shouldn't exist
        self.assertIsNone(Task.get_entity(get_task_list_key(), _id))
