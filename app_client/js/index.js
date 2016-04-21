var m = require('mithril');
var components = require('./components.js');
var models = require('./models.js');

var container = document.createElement('div');
document.body.appendChild(container);


var Page = function(){
    var self = this;
    self.editTask = m.prop(false);


    self.controller = function(args){
        self.taskList = models.Task.getList();
    };
    self.view = function(ctrl, args){
        var elems = self.taskList();
        return (
            <div class="container">
                {elems.map(function(elem, index){
                    return (
                        <components.ViewCheckTask
                            task={elem}
                            ondelete={self.deleteTask.bind(null, elem)}
                            onchecked={self.checkTask}
                        />
                    );
                })}
                {self.editTask()?(
                    <components.EditTask
                        task={self.editTask()}
                        onsave={self.createTask}
                        oncancel={self.editTask.bind(null, false)}
                    />):(
                        <components.Button
                            text="Add task"
                            onclick={self.editTask.bind(null, new models.Task())}
                        />
                    )
                }
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
