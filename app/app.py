# from google.appengine.ext import ndb
from handlers import MainPage, TaskHandler, TaskListHandler

import webapp2


app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/tasks/', TaskListHandler),
    ('/tasks/(\d+)/', TaskHandler),
], debug=True)
