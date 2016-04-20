var m = require('mithril');
var components = require('./components.js');

var container = document.createElement('div');
document.body.appendChild(container);

var Task = function(data){
    var self = this;
    data = data || {};
    self.id = m.prop(data.id, '');
    self.content = m.prop(data.content, '');
}

var Page = function(){
    var self = this;
    self.controller = function(args){
        self.tasksList = m.request({method:'GET', url:'/tasks/', type:Task});
    };
    self.view = function(controller, args){
        return (
            <div class="container">
                <components.Button text="Add task"/>
            </div>
        )
    };
}

console.log(new Page());

m.mount(container, new Page());
