from google.appengine.ext import ndb

import webapp2
import json

TASK_LIST = 'task_list'


def get_task_list_key():
    return ndb.Key('TaskManager', TASK_LIST)


class Task(ndb.Model):
    content = ndb.StringProperty()
    finished = ndb.BooleanProperty()
    dtime = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def get_tasks(cls, task_list):
        return cls.query(ancestor=task_list).order(-cls.dtime).fetch()

    @classmethod
    def get_entity(cls, task_list, _id):
        return ndb.Key(cls._class_name(), _id, parent=task_list).get()


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')


class TaskListHandler(webapp2.RequestHandler):
    """Handle tasks list

    Get all tasks and create new ones
    """
    def get(self):
        """Get all tasks in json form"""
        tasks = [
            {'id': task.key.id(), 'content': task.content}
            for task in Task.get_tasks(get_task_list_key())
        ]
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(tasks))

    def post(self):
        """Create new task"""
        ret = {'status': 'error'}

        task_content = self.request.get('content')
        if task_content:
            key = Task(content=task_content, parent=get_task_list_key()).put()
            ret['status'] = 'ok'
            ret['id'] = key.id()
        else:
            ret['msg'] = 'Task content shouldn\'t be empty'

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(ret))


class TaskHandler(webapp2.RequestHandler):
    """Handle one particular task

    It can delete tasks
    """

    def delete(self, _id):
        ret = {'status': 'error'}

        task = Task.get_entity(get_task_list_key(), int(_id))
        if task:
            task.key.delete()
            ret['status'] = 'ok'

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(ret))

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/tasks/', TaskListHandler),
    ('/tasks/(\d+)/', TaskHandler),
], debug=True)
