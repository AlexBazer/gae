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

class TasksHandler(webapp2.RequestHandler):
    def get(self):
        tasks = [{'id': task.key.id(), 'content': task.content}
            for task in Task.get_tasks(get_task_list_key())
        ]
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(tasks))

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/tasks/', TasksHandler)
], debug=True)
