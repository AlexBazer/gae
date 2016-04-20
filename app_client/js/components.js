var m = require('mithril');
var utils = require('./utils.js');
var models = require('./models.js');


var ViewTask = {
    view: function(ctrl, args){
        var args = args || {};
        return (
            <div class="view-task">
                <span class="task-content">{args.task?args.task.content():''}</span>
                <Button text="Delete"/>
            </div>
        )
    }
}

/**
 * EditTask component
 * @type 	{Object}
 *
 * @params 	{object} 	task 		Task object
 * @event 				onsave     	On task save event. Pass new task further
 * @event 				oncancel    On task cancel editing event.
 */

var EditTask = {
    controller: function(args){
        var args = args || {};
        return {
            task: args.task?utils.cloneModelObject(models.Task):new models.Task()
        }
    },
    view: function(ctrl, args){
        var args = args || {};
        return (
            <div class="edit-task">
                <Input value={ctrl.task.content()} onchange={ctrl.task.content}/>
                <Button text="Cancel" onclick={args.oncancel?args.oncancel:undefined}/>
                <Button text="Save" onclick={args.onsave?args.onsave.bind(this, ctrl.task):undefined}/>
            </div>
        )
    }
};

/**
 * Button component
 * @type 	{Object}
 *
 * @params 	{string} 	href 		link to page
 * @params 	{bool} 		disabled 	mark button disabled
 * @event 				onclick 	onckick event handler
 */
var Button = {
    view: function(ctrl, args) {
    	return (
    		<a class={['button', args.class?args.class:'button-primary'].join(' ')}
    		   disabled={args.disabled?true:false}
               href={args.href?args.href:'#'}
	           onclick={args.onclick?args.onclick:function(){}}
    		>
    			{args.text?args.text:'Empty'}
    		</a>
    	);
    }
};

/**
 * Wrapper for standart input, but limited for one onchange event
 * and type with value attributes
 * @type {Object}
 *
 * @param   {string}    type        type of input, default is text
 * @param   {string}    value       value to be shown
 * @event               onchange    onchange invent, but gets only value of input
 */
var Input = {
    controller: function(args){
        return {
            onchange:function(event){
                if (args.onchange){
                    args.onchange(event.target.value);
                }
            }
        };
    },
    view:  function(ctrl, args){
        var args = args || {}
        return (
            <span class="input">
                <input
                    type={args.type?args.type:'text'}
                    value={args.value||args.default||''}
                    onchange={ctrl.onchange}
                />
            </span>
        );
    }
};

module.exports = {
    Button: Button,
    EditTask: EditTask,
    ViewTask: ViewTask
}
