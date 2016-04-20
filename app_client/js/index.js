var m = require('mithril');
var components = require('./components.js');

var container = document.createElement('div');
document.body.appendChild(container);

var Page = function(){
    var self = this;
    self.controller = function(args){};
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
