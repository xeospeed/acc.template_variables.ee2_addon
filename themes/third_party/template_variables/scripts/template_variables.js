$(document).ready(function() {
	// create tabs for custom field groups
	$('#tabs').tabs();
	
	// create rounded corners
	$("a.copy").corner();
	$("h3.section-heading").corner("8px tl tr");
	$(".snippetsTable thead th:first-child").corner("8px tl");
	$(".snippetsTable thead th:last-child").corner("8px tr");
	$(".globalVariableTable thead th:first-child").corner("8px tl");
	$(".globalVariableTable thead th:last-child").corner("8px tr");
	$("tfoot td").corner("8px bl br");
	
	
	// assign ZeroClipboard.swf path
	// var is set in javascript code outside this file
	ZeroClipboard.setMoviePath(pathToZeroClipboardSwf);

	// setup single ZeroClipboard object for all our elements
	var clip = new ZeroClipboard.Client();
	clip.setHandCursor( true );

	// assign a common mouseover function for all elements using jQuery
	$('a.copy').mouseover( function() {
		// set the clip text to our innerHTML
		clip.setText($(this).children('span.copyText').html());
		$(this).children('span.clipTip').children('span.clipText').html('Click to Copy');
		
		// reposition the movie over our element
		// or create it if this is the first time
		if (clip.div) {
			clip.receiveEvent('mouseout', null);
			clip.reposition(this);
		}
		else clip.glue(this);

		// gotta force these events due to the Flash movie
		// moving all around.  This insures the CSS effects
		// are properly updated.
		clip.receiveEvent('mouseover', null);
	});
	
	//Add a complete event to let the user know the text was copied
	clip.addEventListener('complete', function() {
		$('span.clipText').html('Copied!');
	});
});