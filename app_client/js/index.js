var m = require('mithril');
var components = require('./components.js');
var models = require('./models.js');

var container = document.createElement('div');
document.body.appendChild(container);


var Page = function(){
    var self = this;
    self.triggerCreateTask = m.prop(false);

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
                            onchecked={self.checkTask.bind(null, elem)}
                        />
                    );
                })}
                {self.triggerCreateTask()?(
                    <components.EditTask
                        onsave={self.createTask}
                        oncancel={self.triggerCreateTask.bind(null, false)}
                    />):(
                        <components.Button
                            text="Add task"
                            onclick={self.triggerCreateTask.bind(null, true)}
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
    self.checkTask = function(task,checked){
        task.finished(checked)
        console.log('here!', task.id());

        models.Task.edit(task, self.controller);
    };
};

m.mount(container, new Page());
