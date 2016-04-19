import webapp2
from google.appengine.ext import ndb

TASK_LIST = 'task_list'

def get_task_list_key():
    return ndb.Key('TaskManager', TASK_LIST)

class Task(ndb.Model):
    content = ndb.StringProperty()
    finished = ndb.BooleanProperty()
    dtime = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def get_tasks(cls, task_list):
        return cls.query(ancestor=task_list).order(-cls.dtime)
    @classmethod
    def get_entity(cls, task_list, _id):
        return ndb.Key(cls._class_name(), _id, parent=task_list).get()

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)
