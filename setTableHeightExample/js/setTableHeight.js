

$(document).ready(function() {
	var totalHeight = $(document.getElementsByTagName('body')[0]).outerHeight();
	var curentTableHeight = $('#outerDivForTableId').outerHeight();


	var heightToAdd = totalHeight - curentTableHeight;

	var headerHeights = $('#headId').outerHeight() + $('#t_fixed_header_captionId').outerHeight();

	var heightTS = curentTableHeight + heightToAdd - 25; //- 25 for the distance that is from the bottom

	// console.log($(document.getElementsByTagName('body')[0]).outerHeight(), $('#outerDivForTableId').outerHeight());

	$('#outerDivForTableId').css({ height: heightTS })
	$('#tableBodyId').css({ height: heightTS - headerHeights - 5 })


	//now to save the heights so when the page is resized, I can adjust the size
	setTableHeightObject.outerDivHeight = heightTS;
	setTableHeightObject.tableBodyHeight = heightTS - headerHeights - 5; //-5 to give the padding look/border look to the table

	//setup some more helper variables to keep track of how much the window moves in the future
	setTableHeightObject.windowInnerHeight = window.innerHeight;

	$(window).resize(setTableHeightObject.adjustHeight) //now set an event listener to be called every time the resize event is fired

})

//go over javascript objects (more specifically ES5 objects) if you don't understand the below code
var setTableHeightObject = {
	outerDivHeight: 0,
	tableBodyHeight: 0,
	windowInnerHeight: 0,

	adjustHeight: function() {
		var currentWindowHeight = window.innerHeight;

		var amountToResize = currentWindowHeight - setTableHeightObject.windowInnerHeight ;

		//no matter if the window got bigger or smaller, I can now just add amountToResize to the heights
		//and not use if else statements since it will be a negative number if getting smaller (which works)
		//or a positive one if it got bigger which also works
		setTableHeightObject.outerDivHeight += amountToResize;  //do this for both elements
		setTableHeightObject.tableBodyHeight += amountToResize; //do this for both elements

		//now set the height
		$('#outerDivForTableId').css({ height: setTableHeightObject.outerDivHeight })
		$('#tableBodyId').css({ height: setTableHeightObject.tableBodyHeight })

		//now make sure the save the window's height to use during the next iteration
		setTableHeightObject.windowInnerHeight = currentWindowHeight;

	}
}
