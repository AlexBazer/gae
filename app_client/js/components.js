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
            <div class={['row', args.task.finished()?'checked':''].join(' ')} key={args.task.id()}>
                <div class="col s6">
                    <Checkbox
                        value={args.task.finished()}
                        onchange={ctrl.onchecked.bind(null, args.task, args.onchecked)}
                    />
                    <span>{args.task.content()}</span>
                </div>
                <div>
                    <Button
                        icon="delete"
                        class="btn-floating"
                        onclick={args.ondelete?args.ondelete.bind(null, args.task):null}/>
                </div>
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
            <div class="edit-task row">
                <Input
                    value={args.task.content()}
                    onchange={args.task.content}
                    class="col s6"
                />
                <div>
                    <Button text="Save" onclick={args.onsave?args.onsave.bind(null, args.task):null}/>
                    <Button text="Cancel" onclick={args.oncancel?args.oncancel:null}/>
                </div>
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
 * @params 	{string}    text     	button text
 * @params 	{string}    icon     	button icon
 * @event 				onclick 	onckick event handler
 */
var Button = {
    view: function(ctrl, args) {
    	return (
    		<a class={['btn', args.class?args.class:''].join(' ')}
    		   disabled={args.disabled?true:false}
               href={args.href?args.href:'#'}
	           onclick={args.onclick?args.onclick:null}
    		>
                {args.icon?<i class="material-icons">{args.icon}</i>:''}
    			{args.text?args.text:''}
    		</a>
    	);
    }
};

/**
 * Wrapper for standart input checkbox, but limited for one onchange event
 * and type with value attributes
 * !!! ids used for materialize.css
 * @type {Object}
 *
 * @param   {string}    type        type of input, default is text
 * @param   {string}    value       value true|false of checkbox
 * @event               onchange    onchange invent, pass checked state
 */
var Checkbox = {
    view:  function(ctrl, args){
        var args = args || {};
        var _id = 'checkbox_' + Math.floor(Math.random()*1000);
        return (
            <span class={['checkbox', args.class?args.class:''].join(' ')}>
                <input
                    type="checkbox"
                    checked={args.value?true:false}
                    onchange={args.onchange?m.withAttr('checked', args.onchange):null}
                    class="filled-in"
                    id={_id}
                />
                <label for={_id}></label>
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
            <div class={['input', args.class?args.class:''].join(' ')}>
                <input
                    type={args.type?args.type:'text'}
                    value={args.value||args.default||''}
                    onchange={args.onchange?m.withAttr('value', args.onchange):null}
                />
            </div>
        );
    }
};

module.exports = {
    Button: Button,
    EditTask: EditTask,
    ViewCheckTask: ViewCheckTask
};
