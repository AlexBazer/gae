var m = require('mithril');

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


module.exports = {
    Button: Button
}
