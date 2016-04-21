from google.appengine.ext import ndb

TASK_KIND = 'TaskManager'


def get_task_list_key(user_id):
    return ndb.Key('TaskManager', user_id)


class Task(ndb.Model):
    """Task model"""
    content = ndb.StringProperty()
    finished = ndb.BooleanProperty()
    dtime = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def get_tasks(cls, user_id):
        return cls.query(ancestor=get_task_list_key(user_id)).order(cls.dtime).fetch()

    @classmethod
    def create_entity(cls, user_id, **kwargs):
        return Task(parent=get_task_list_key(user_id), **kwargs)

    @classmethod
    def get_entity(cls, user_id, _id):
        return ndb.Key(cls._class_name(), _id, parent=get_task_list_key(user_id)).get()
