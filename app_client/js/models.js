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
    console.log(task.content());
    m.request({method:'POST', url: '/tasks/', data: {content:'LOOK!'}}).then(function(data){
        console.log(data);
    })
}

module.exports = {
    Task: Task
}
