var m = require('mithril');
var components = require('./components.js');
var models = require('./models.js');
var utils  = require('./utils.js');

var container = document.createElement('div');
document.body.appendChild(container);


var Page = function(){
    var self = this;
    self.taskToEdit = m.prop(false);
    self.taskList = m.prop([]);

    self.controller = function(args){
        models.Task.getList().then(self.taskList);
    };

    self.view = function(ctrl, args){
        return (
            <div class="container">
                {self.taskList().map(function(elem, index){
                    return (
                        <components.ViewCheckTask
                            task={elem}
                            ondelete={self.deleteTask}
                            onchecked={self.checkTask}
                        />
                    );
                })}
                {self.taskToEdit()?(
                    <components.EditTask
                        task={self.taskToEdit()}
                        onsave={self.createTask}
                        oncancel={self.taskToEdit.bind(null, false)}
                    />):(
                        <components.Button
                            text="Add task"
                            onclick={self.taskToEdit.bind(null, new models.Task())}
                        />
                    )
                }
            </div>
        );
    };

    self.createTask = function(task){
        models.Task.create(task, function(ret){
            console.log(ret);
            if (typeof(ret) == 'string'){
                alert(ret);
            } else {
                self.taskToEdit(false);
                self.taskList().push(ret);
            }
        });
    };

    self.deleteTask = function(task){
        models.Task.delete(task, function(ret){
            if (typeof(ret) == 'string'){
                alert(ret);
            } else {
                var indexToDelete = utils.indexOfID(self.taskList(), ret)
                console.log(indexToDelete);
                self.taskList().splice(indexToDelete, 1);
            }
        });
    };

    self.checkTask = function(task){
        models.Task.edit(task, self.controller);
    };
};

m.mount(container, new Page());
