var m = require('mithril');
var components = require('./components.js');
var models = require('./models.js');
var utils  = require('./utils.js');

var appContainer = document.getElementById('app');


/**
 * ViewTasks component
 * Displays list of tasks for current user.
 * Handle adding new Task, removind Task, and checking Task as finished
 *
 * Materialize.css was user as layout for components
 *
 * @type 	{Class}
 */
var ViewTasks = function(){
    var self = this;
    self.taskToEdit = m.prop(false);
    self.taskList = m.prop([]);

    self.controller = function(args){
        models.Task.getList().then(self.taskList);
    };

    self.view = function(ctrl, args){
        return (
            <div class="section">
                <div>
                    {self.taskList().map(function(elem, index){
                        return (
                            <components.ViewCheckTask
                                task={elem}
                                ondelete={self.deleteTask}
                                onchecked={self.checkTask}
                            />
                        );
                    })}
                </div>
                <div>
                    {self.taskToEdit()?(
                        <components.EditTask
                            task={self.taskToEdit()}
                            onsave={self.createTask}
                            oncancel={self.taskToEdit.bind(null, false)}
                        />):(
                        <div class="row">
                            <components.Button
                                text="Add task"
                                onclick={self.taskToEdit.bind(null, new models.Task())}
                            />
                        </div>)
                    }
                </div>
            </div>
        );
    };

    self.createTask = function(task){
        models.Task.create(task, function(ret){
            self.taskToEdit(false);
            self.taskList().push(ret);
        });
    };

    self.deleteTask = function(task){
        models.Task.delete(task, function(ret){
            var indexToDelete = utils.indexOfID(self.taskList(), ret)
            self.taskList().splice(indexToDelete, 1);
        });
    };

    self.checkTask = function(task){
        models.Task.edit(task);
    };
};

m.mount(appContainer, new ViewTasks());
