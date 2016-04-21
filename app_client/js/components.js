var m = require('mithril');
var utils = require('./utils.js');
var models = require('./models.js');

/**
 * ViewCheckTask component
 * @type 	{Object}
 *
 * @params 	{object} 	task 		Task object
 * @event 				onchecked   On checkbox checked event. Pass task
 * @event 				ondelete    On delete button click. Pass task
 */
var ViewCheckTask = {
    controller: function(){
        return {
            onchecked: function(task, call_next, checked){
                task.finished(checked);
                call_next?call_next(task):null;
            }
        };
    },
    view: function(ctrl, args){
        var args = args || {};
        return (
            <div class="view-task" key={args.task.id()}>
                <Checkbox
                    value={args.task.finished()}
                    onchange={ctrl.onchecked.bind(null, args.task, args.onchecked)}
                />
                <span class="task-content">{args.task?args.task.content():''}</span>
                <Button text="Delete" onclick={args.ondelete?args.ondelete.bind(null, args.task):null}/>
            </div>
        );
    }
};

/**
 * EditTask component
 * @type 	{Object}
 *
 * @params 	{object} 	task 		Task object
 * @event 				onsave     	On task save event. Pass new task
 * @event 				oncancel    On task cancel editing event.
 */
var EditTask = {
    view: function(ctrl, args){
        return (
            <div class="edit-task">
                <Input value={args.task.content()} onchange={args.task.content}/>
                <Button text="Save" onclick={args.onsave?args.onsave.bind(null, args.task):null}/>
                <Button text="Cancel" onclick={args.oncancel?args.oncancel:null}/>
                {args.error?<ErrorTooltip msg={args.error}/>:''}
            </div>
        );
    }
};

/**
 * Toolpit error message
 * @type {Object}
 *
 * @param 	{string}	msg 	error string message
 */
var ErrorTooltip = {
    view: function(ctrl, args){
        return (
        	<div class="error-msg">
        		<span>!</span>
        		<i>{args.msg?args.msg:'No message was bound'}</i>
        	</div>
    	);
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
	           onclick={args.onclick?args.onclick:nul}
    		>
    			{args.text?args.text:'Empty'}
    		</a>
    	);
    }
};

/**
 * Wrapper for standart input checkbox, but limited for one onchange event
 * and type with value attributes
 * @type {Object}
 *
 * @param   {string}    type        type of input, default is text
 * @param   {string}    value       value true|false of checkbox
 * @event               onchange    onchange invent, pass checked state
 */
var Checkbox = {
    view:  function(ctrl, args){
        var args = args || {};
        return (
            <span class="input">
                <input
                    type="checkbox"
                    checked={args.value?true:false}
                    onchange={args.onchange?m.withAttr('checked', args.onchange):null}
                />
            </span>
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
    view:  function(ctrl, args){
        var args = args || {};
        return (
            <span class="input">
                <input
                    type={args.type?args.type:'text'}
                    value={args.value||args.default||''}
                    onchange={args.onchange?m.withAttr('value', args.onchange):null}
                />
            </span>
        );
    }
};

module.exports = {
    Button: Button,
    EditTask: EditTask,
    ViewCheckTask: ViewCheckTask
};
