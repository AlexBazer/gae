var m = require('mithril');
var components = require('./components.js');
var models = require('./models.js');

var container = document.createElement('div');
document.body.appendChild(container);

var Page = function(){
    var self = this;
    self.controller = function(args){
        self.tasksList = m.request({method:'GET', url:'/tasks/', type:models.Task});
    };
    self.view = function(controller, args){
        return (
            <div class="container">
                <components.EditTask onsave={models.Task.save}/>
                <components.Button text="Add task"/>
            </div>
        )
    };
}

console.log(new Page());

m.mount(container, new Page());
