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
                    return (
                        <components.ViewCheckTask
                            task={elem}
                            ondelete={self.deleteTask.bind(null, elem)}
                            onchecked={self.checkTask}
                        />
                    );
                })}
                <components.EditTask onsave={self.createTask}/>
                <components.Button text="Add task"/>
            </div>
        );
    };
    self.createTask = function(task){
        models.Task.create(task, self.controller);
    };
    self.deleteTask = function(task){
        models.Task.delete(task, self.controller);
    };
    self.checkTask = function(task){
        models.Task.edit(task, self.controller);
    };
};

m.mount(container, new Page());
