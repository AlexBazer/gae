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

module.exports = {
    Task: Task
}