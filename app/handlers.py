from models import Task, get_task_list_key

import webapp2
import json
import os


def jsonify(data):
    """Setup response to pass json to client

    Encode data to json and write in to response body
    """
    response = webapp2.Response(content_type="application/json")
    json.dump(data, response.out)
    return response


class MainPage(webapp2.RequestHandler):
    def get(self):
        index_html = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.headers['Content-Type'] = 'text/html'
        self.response.write(open(index_html).read())


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
        return jsonify(tasks)

    def post(self):
        """Create new task"""
        ret = {'status': 'error'}

        if self.request.content_type != 'application/json':
            return self.abort(405)
        try:
            task = json.loads(self.request.body)
        except ValueError:
            return self.abort(405)

        if task.get('content'):
            key = Task(content=task.get('content'), parent=get_task_list_key()).put()
            ret['status'] = 'ok'
            ret['id'] = key.id()
        else:
            ret['msg'] = 'Task content shouldn\'t be empty'

        return jsonify(ret)


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
        else:
            ret['msg'] = 'Task doesn\'t exists'

        return jsonify(ret)
