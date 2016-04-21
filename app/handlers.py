from models import Task
from google.appengine.api import users

from google.appengine.ext.webapp import template

import webapp2
import json
import os


def jsonify_post_request(fn):
    def wrap(*args, **kwargs):
        self = args[0]
        if self.request.content_type != 'application/json':
            return self.abort(405)
        try:
            self.request.json = json.loads(self.request.body)
        except ValueError:
            return self.abort(405)

        return fn(*args, **kwargs)
    return wrap


def jsonify(data):
    """Setup response to pass json to client

    Encode data to json and write in to response body
    """
    response = webapp2.Response(content_type="application/json")
    json.dump(data, response.out)
    return response


class RequestHandlerWithUser(webapp2.RequestHandler):
    def __init__(self, *args, **kwargs):
        super(RequestHandlerWithUser, self).__init__(*args, **kwargs)
        self.user = users.get_current_user()


class MainPage(RequestHandlerWithUser):
    def get(self):
        index_html = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.write(template.render(index_html, {
            'logout_url': users.create_logout_url('/'),
            'user': self.user
        }))


class TaskListHandler(RequestHandlerWithUser):
    """Handle tasks list

    Get all tasks and create new ones
    """
    def get(self):
        """Get all tasks in json form"""
        tasks = [
            {'id': task.key.id(), 'content': task.content, 'finished': task.finished}
            for task in Task.get_list(self.user.user_id())
        ]
        return jsonify(tasks)

    @jsonify_post_request
    def post(self):
        """Create new task"""
        ret = {'status': 'error'}
        task = self.request.json
        if task.get('content'):
            key = Task.create_entity(self.user.user_id(), content=task.get('content')).put()
            ret['status'] = 'ok'
            ret['id'] = key.id()
        else:
            ret['msg'] = 'Task content shouldn\'t be empty'

        return jsonify(ret)


class TaskHandler(RequestHandlerWithUser):
    """Handle one particular task

    It can edit and delete task
    """
    @jsonify_post_request
    def post(self, _id):
        task = Task.get_entity(self.user.user_id(), int(_id))
        if not task:
            return jsonify({'status': 'error', 'msg': 'Task doesn\'t exists'})
        for field, value in self.request.json.items():
            task_value = getattr(task, field)
            if value is not None and len(str(value)) and value != task_value:
                setattr(task, field, value)
                task.put()

        return jsonify({'status': 'ok'})

    def delete(self, _id):
        task = Task.get_entity(self.user.user_id(), int(_id))
        if not task:
            return jsonify({'status': 'error', 'msg': 'Task doesn\'t exists'})

        task.key.delete()

        return jsonify({'status': 'ok'})
