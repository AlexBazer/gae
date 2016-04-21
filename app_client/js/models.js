var m = require('mithril')
/**
 * Task model
 *
 *
 */

 /**
  * Task model
  * @type {Class}
  *
  * @param      {object}    data        Object with parameters
  *
  * @property   {int}       id          Task id
  * @property   {string}    content     Task content
  *
  * @function               create      Create task static method
  * @function               getList     Get list of tasks static method
  */
var Task = function(data){
    var self = this;
    data = data || {};
    self.id = m.prop(data.id||'');
    self.content = m.prop(data.content||'');
    self.finished = m.prop(data.finished||false);
};

/**
 * Create task static method
 * @type {function}
 *
 * @param      {object}    task        Task model object
 * @param      {function}  callback    Signals when procedure is finished
 */

Task.create = function(task, callback){
    m.request({method:'POST', url: '/tasks/', data: {
        content: task.content()
    }}).then(function(data){
        if (data.status == 'ok'){
            task.id(data.id);
            callback?callback(task):null;
        } else {
            callback?callback(data.msg):null;
        }
    });
};

/**
 * Edit task static method
 * @type {function}
 *
 * @param      {object}    task        Task model object
 * @param      {function}  callback    Signals when procedure is finished
 */
Task.edit = function(task, callback){
    var task_url = '/tasks/{{id}}/'.replace('{{id}}', task.id());
    m.request({method:'POST', url: task_url, data: {
        content: task.content(),
        finished: task.finished()
    }}).then(function(data){
        callback?callback():null;
    });
};

/**
 * Delete task static method
 * @type {function}
 *
 * @param      {object}    task        Task model object
 * @param      {function}  callback    Signals when procedure is finished
 */
Task.delete = function(task, callback){
    var task_url = '/tasks/{{id}}/'.replace('{{id}}', task.id());
    m.request({method:'DELETE', url: task_url}).then(function(data){
        if (data.status == 'ok'){
            callback?callback(task):null;
        } else {
            callback?callback(msg):null;                        
        }
    });
};

/**
 * Get list of tasks static method
 * @type {function}
 */
Task.getList = function(){
    return m.request({method:'GET', url:'/tasks/', type:Task});
};


module.exports = {
    Task: Task
};
