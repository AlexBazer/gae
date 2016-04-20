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
  * @function               save        Save task static method
  * @function               getList     Get list of tasks static method
  */
var Task = function(data){
    var self = this;
    data = data || {};
    self.id = m.prop(data.id||'');
    self.content = m.prop(data.content||'');
}

/**
 * Save task static method
 * @type {function}
 *
 * @param      {object}    task        Task model object
 */

Task.save = function(task, callback){
    m.request({method:'POST', url: '/tasks/', data: {
        content: task.content()
    }}).then(function(data){
        callback?callback():undefined;
    })
}

Task.delete = function(task, callback){
    var task_url = '/tasks/{{id}}/'.replace('{{id}}', task.id());
    m.request({method:'DELETE', url: task_url}).then(function(){
        callback?callback():undefined;
    });
}

/**
 * Get list of tasks static method
 * @type {function}
 */
Task.getList = function(){
    return m.request({method:'GET', url:'/tasks/', type:Task})
}


module.exports = {
    Task: Task
}
