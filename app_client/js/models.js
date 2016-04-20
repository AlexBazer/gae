var m = require('mithril')
/**
 * Task model
 */
var Task = function(data){
    var self = this;
    data = data || {};
    self.id = m.prop(data.id||'');
    self.content = m.prop(data.content||'');
}

Task.save = function(task){
    m.request({method:'POST', url: '/tasks/', data: {
        content: task.content()
    }}).then(function(data){
        console.log(data);
    })
}

module.exports = {
    Task: Task
}
