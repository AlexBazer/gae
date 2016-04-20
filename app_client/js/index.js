var m = require('mithril');
var components = require('./components.js');
var models = require('./models.js');

var container = document.createElement('div');
document.body.appendChild(container);


var Page = function(){
    var self = this;
    self.controller = function(args){
        self.taskList = models.Task.getList();
    };
    self.view = function(ctrl, args){
        return (
            <div class="container">
                {self.taskList().map(function(elem, index){
                    return (<components.ViewTask task={elem} ondelete={self.deleteTask.bind(null, elem)}/>)
                })}
                <components.EditTask onsave={self.saveTask}/>
                <components.Button text="Add task"/>
            </div>
        )
    };
    self.saveTask = function(task){
        models.Task.save(task, self.controller);
    }
    self.deleteTask = function(task){
        models.Task.delete(task, self.controller);
    }
}

m.mount(container, new Page());
