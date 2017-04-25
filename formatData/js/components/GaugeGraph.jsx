import React from 'react';

import PathLabel from './GaugeGraphPathLabel.jsx';

import 'jquery-ui';

export default class GaugeGraph extends React.Component {
	addCSSStyleSheet() {
		//if the style element for the cmGauge.css code has not been appended & it is not found in the DOM, append it
		if(this.cmGaugeStyleWasCreated == false && document.getElementById('cmGaugeStyleDefinition') === null) {
			var cmGaugeStyleElement = document.createElement('style');
			cmGaugeStyleElement.type = 'text/css';
			cmGaugeStyleElement.className = 'cmGaugeStyleDefinitionClass';
			cmGaugeStyleElement.id = 'cmGaugeStyleDefinition';

			let cmGaugeStyleDefinition = `@keyframes startGaugeGraphAnimation {
    0%   {transform: rotate(270deg);}
    33%  {transform: rotate(450deg);}
    100% {transform: rotate(270deg);}
}


.gauge {
    position: relative;
    display: inline-block;
    font-size: 33px;
    line-height: 2em;
    height: 2em;
    width: 4em;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.gauge.gauge-big {
    font-size: 117px;
}

.gauge.gauge-small {
    font-size: 17px;
}

.gauge:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 100%;
    height: 4em;
    width: 4em;
    line-height: 2em;
    border: 0.35em solid #666666;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    -ms-border-radius: 100%;
    -o-border-radius: 100%;
    border-radius: 100%;
    clip: rect(auto, auto, 2em, auto);
}

.addAnimation {
    animation-name: startGaugeGraphAnimation;
    animation-duration: 2s;
}

.gauge .gauge-arrow {
    height: 90%;
    width: 0.075em;
    margin-left: -.05em;
    -webkit-transform-origin: 50% 100%;
    -moz-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    -o-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    transform: rotate(270deg);      /* this makes sure the needle starts out at 0 (i.e. completely horizontal and pointing to the left) */
}

.gauge .gauge-arrow, .gauge .gauge-arrow:before {
    position: absolute;
    display: inline-block;
    background: #A6A6A6;
    left: 50%;
    border-radius: 50% 50% 50% 50% / 50% 50% 0 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.gauge .gauge-arrow:before {
    content: '';
    height: 0.15em;
    width: 0.15em;
    bottom: -0.1em;
    margin-left: -0.075em;
    border-radius: 100%;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    -ms-border-radius: 100%;
    -o-border-radius: 100%;
}

.gauge-red.gauge:before {
    border-color: #ff4e00;
}

.gauge-orange.gauge:before {
    border-color: #ffa600;
}

.gauge-yellow.gauge:before {
    border-color: #f9f865;
}

.gauge-green.gauge:before {
    border-color: #8ceab9;
}`		

			//finally, now that the elment has been created, insert the css into it
			cmGaugeStyleElement.innerHTML = cmGaugeStyleDefinition;
			//and append it to the document
			document.head.appendChild(cmGaugeStyleElement);

			this.cmGaugeStyleWasCreated = true;	//to not allow this element to be created again
		}


	}
	animateNeedleToPercentageToGraph(needleElement) {
		
		//honestly what I need to do is bite the bullet and figure out
		//how to create a new css3 animation on the fly right here
		//inside the javascript and use keyframes maybe if this is possible
		//to animate to the next percentage that is from the data to graph


		// Below is an example of how to do the css keyframes from within React (this has not bee tested..)
		//
    	// let styleSheet = document.styleSheets[0];
	 	//
	    // let animationName = `animation${Math.round(Math.random() * 100)}`;
	    //
	    // let keyframes =
	    // `@-webkit-keyframes ${animationName} {
	    //     10% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)} 
	    //     90% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)}
	    //     100% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)}
	    // }`;
	 	//
	    // styleSheet.insertRule(keyframes, styleSheet.cssRules.length);


	    // var styleSheet = $('#styleSheet')[0];


	    //I manually create the style element and edit the innerHTML as I wish to get this to dynamically make a CSS3 animation
	    var styleElement;
	    var sheet;

	    if(this.styleElementWasCreated == false) {
		    styleElement = document.createElement('style');
		    styleElement.appendChild(document.createTextNode(''));	//Webkit hack :(
		    styleElement.id = 'styleElement';
		    styleElement.type = 'text/css';

		    document.head.appendChild(styleElement);
		    sheet = styleElement.sheet;

		    this.styleElementWasCreated = true;
		}
		else {
			styleElement = $('#styleElement')[0];
			sheet = styleElement.sheet;
		}
	    var styleSheet = styleElement.sheet;	//grab the style sheet



		// var styleSheetString = styleSheet.innerHTML.toString();
		// var startSlice = styleSheetString.indexOf('rotate(') + 7;
		// var endSlice = styleSheetString.indexOf('deg)');
	 //    var currentPercent = styleSheetString.slice(startSlice, endSlice);
	 	var currentPercent = $('#gauge' + this.props.id)[0].style.transform.toString().split('(')[1].split('deg')[0];

	    var selector = '#gauge' + this.props.id + '{ animation-name: startAnimation; animation-duration: 2s; }'



	    // console.log( styleSheet.style.transform.toString().split('(')[1].split('deg')[0] );

	    // console.log(this.state.percentage, percentConstantHelper[this.state.percentage])


// 	    let keyframes =
// `@keyframes startAnimation {
// 	0% {
// 	   	transform: rotate(${currentPercent}deg)
// 	} 
// 	100% {
// 	   	transform: rotate(${percentConstantHelper[this.state.percentage]}deg)
// 	}
// }`;


		//this is formatted all the way to the left because I don't want the interpolation of the variable to have the tabs in it
	    let keyframesAndStyle =
`#gauge${this.props.id} {
	transform: rotate(${percentConstantHelper[this.state.percentage]}deg);
	animation-name: startAnimation;
	animation-duration: 2s;
}



@keyframes startAnimation {
	0% {
	   	transform: rotate(${currentPercent}deg)
	} 
	100% {
	   	transform: rotate(${percentConstantHelper[this.state.percentage]}deg)
	}
}`;




	    // sheet.insertRule("header { float: left; opacity: 0.8; }");





// 	    styleSheet.insertRule('#gauge' + this.props.id + ` {
//     animation-name: startAnimation;
//     animation-duration: 2s;
// }`, 0)

		// console.log('styleElement = ', styleElement)


	    styleElement.innerHTML = keyframesAndStyle;

	    //this will set the transform style to the percent that the css is animating it to above so that once the animation is done, it retains its rotate transform
	    $('#gauge' + this.props.id)[0].style.transform = 'rotate(' + percentConstantHelper[this.state.percentage] + 'deg)';


		/*
		var currentPercent = parseFloat(needleElement.style.transform.toString().split('(')[1].split('deg')[0]);
		// alert(percentConstantHelper[this.state.percent])
		var percentToSetTo = percentConstantHelper[this.state.percentage];

		console.log( percentConstantHelper[this.state.percentage]);

		var goingUpInValue;

		if(currentPercent > percentToSetTo) {
			goingUpInValue = false;
		}
		else {
			goingUpInValue = true;
		}



		$(needleElement).animate({
			dataPercentage: percentConstantHelper[this.state.percentage]
		}, {
			easing: 'swing',
			duration: 2000,
			step: function(now, fx) {
				console.log(currentPercent + (currentPercent - percentToSetTo))

				if(goingUpInValue == true) {
					if(now > currentPercent + (currentPercent - percentToSetTo)) {
						$(needleElement).css({'transform': 'rotate(' + now + 'deg' });
					}
				}
				else {
					//todo write the code to figure out if the value needs to go up or down
					console.log('write this code')
				}
			}
		})
		*/		
	}
	constructor(props) {
		super(props);


		this.cmGaugeStyleWasCreated = false;	//this will be used in the addCSSStyleSheet method
		this.styleElementWasCreated = false;	//this will be used in the animateNeedleToPercentageToGraph method
		
		this.addCSSStyleSheet();				//this method call must be called after cmGaugeStyleElement has been set

		this.state = {
			border: '',
			width: 0,
			height: 0,
			percentage: 0,		//percentage will the the value to actually graph and show to the user
			pathElements: []
		}

		//it would be nice not to expose this to the window object and instead emit events and listen for the events...
		//now to expose an update function for GaugeGraph.jsx to use to update the new display value
		window.setStateOfGaugeGraph = this.setStateOfGaugeGraph.bind(this);

	}
	componentDidMount() {
		
		// // Listen for the event.
		// elem.addEventListener('build', function (e) {
		//   // e.target matches elem
		// }, false);
		// document.getElementsByTagName('html')[0].addEventListener(this.props.eventName, function(e) {
		// 	console.log('event was fired')
		// }, false)

		var gaugeParent = $('#gaugeParent' + this.props.id)[0];


		var widthTS = $(gaugeParent).outerWidth();
		var heightTS = $(gaugeParent).outerHeight();

		//sometimes the width returned from .outerWidth() is undefined so just to be sure to have a value I do the next statements
		if(typeof widthTS === 'undefined') widthTS = 0;
		
		if(typeof heightTS === 'undefined') heightTS = 0;

		//set the state with the value to graph and other values for later
		this.setState({
			percentage: this.props.valueToGraph,
			width: widthTS,
			height: heightTS
		});

		// below is an example of how to update the value of the graph and what it displays
		//
		// $("button").click(function () {
		// 	var randomNum = Math.floor((Math.random() * 100));
		// 	$('#gaugeParent .gauge-arrow').trigger('updateGauge', randomNum);
		// });

		//add the styling
		// $('#gaugeParent' +  this.props.id + ' .gauge-arrow').cmGauge();
		

		$(window.top).resize(this.resize.bind(this));


		this.createLabels(heightTS);


		//this.startAnimatingNeedle();	jce commented out 3160129 since I am restucturing the animation to use css keyframes (which are defined in cmGauge.css)
		//what I will do is subscribe to the animation end event so I can then set the actual value that the gauge should show		
		//then I wll start the animation by removing the class to the gauge element then adding it back
		document.getElementById('gauge' + this.props.id).addEventListener("animationend", this.cssAnimationEnded.bind(this), false);		
		$('#gauge' + this.props.id).removeClass('addAnimation');
		$('#gauge' + this.props.id).addClass('addAnimation');

		//this.startingAnimation();
	}



	createLabels(height) {
		var nodes = this.createNodes(40, height);	//setting the createNodes with 40 for the amount makes a perfect spacing (pretty much) for 5% intervals for the graph labels
		
		var tempPathLabelArray = [];
		nodes.map((nodeData) => tempPathLabelArray.push(<PathLabel key={nodeData.id.toString()} nodeData={nodeData} />));
	
		this.setState({ pathElements: tempPathLabelArray }); 
	}

    createNodes(numNodes, radius) {
		var nodes = [], 
		// width = (radius * 2) + 50,
		// height = (radius * 2) + 50,
		
		width = (radius * 2) + 0,
		height = (radius * 2) + 0,
		angle,
		x,
		y,
		i;

		for (i = 0; i < numNodes; i++) {
			angle = (i / (numNodes / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
												  // For a semicircle, we would use (i / numNodes) * Math.PI.
			//angle = (i / numNodes) * Math.PI;												  
			x = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
			y = (radius * Math.sin(angle)) + (width / 2); // Calculate the y position of the element.
			
			//jce added adjustment measure 3170120
			// x = x + 10
			y = y + 10;

			nodes.push({'id': i, 'x': x, 'y': y, angle: angle});
		}
		return nodes;
	}

	cssAnimationEnded() {
		//this is executed from an event listener that is set in the componentDidMount method
		//now that the css keyframes animation is over I need to set the value to the actual value to be graphed
		
		// $('#gaugeParent' + this.props.id + ' .gauge-arrow').trigger('updateGauge', this.state.percentage);

		this.animateNeedleToPercentageToGraph($('#gaugeParent' + this.props.id + ' .gauge-arrow')[0]);
	}


	render() {
		

		// Below is an incorrect way to mutate the styles
		// // var svgStyle = styles.svg;
		// // svgStyle.width = this.state.width;
		// // svgStyle.height = this.state.height;
		//
		// Below is a proper way to mutate styles
		var svgStyle = {...styles.svg, width: this.state.width, height: this.state.height }



		var cx = this.state.width / 2;			//to center the labels
		var cy = this.state.height;				//since this is where the bottom of the circle drawing for the graph should start
		var r = this.state.height;
		var mask = {
			width: this.state.width,
			height: this.state.height,
			position: 'absolute'
		}

		return (
			<div>
				<div style={styles.container} className="container" onClick={this.props.onClick}>
				    <svg id="svgGaugeGraph" style={svgStyle}>
					    <defs>
							<circle fill="blue" style={{ zIndex: 2 }} r={r} cx={cx} cy={cy} />
							<clipPath id="svgPath">
							    <circle style={{ zIndex: 3 }} fill="orange" r={r == 0 ? 0 : r - 20} cx={cx} cy={cy} opacity="0" />
					        </clipPath>
					    </defs>
				    	<circle style={{ zIndex: 1 }} r={r} cx={cx} cy={cy} clipPath="url(#svgPath)" />
				    	
				    	{/*this.state.pathElements.map((PathLabel) => <PathLabel /> )*/}
				    	{this.state.pathElements}

				    </svg>

				    <div id={'gaugeParent' + this.props.id} className="gauge gauge-big gauge-green">
				        <div id={'gauge' + this.props.id} className="gauge-arrow" data-percentage="0" style={styles.gaugeArrow}></div>
				    </div>

				    <center>
				    	<div style={styles.displayPercent}>{this.state.percentage}</div>
				    </center>

				</div>
			</div>
		)
	}
	resize() {
		//the size of the svg state should reflect
		var gaugeParent = $('#gaugeParent' + this.props.id)[0];

		var widthTS = $(gaugeParent).outerWidth();
		var heightTS = $(gaugeParent).outerHeight();
		if(typeof widthTS === 'undefined') widthTS = 0;
		if(typeof heightTS === 'undefined') heightTS = 0;

		this.setState({
			width: widthTS,
			height: heightTS
		});	
	}

	//this gets called from the CQMMeasuresGraph.jsx component when the user clicks on a different measure to view
	setStateOfGaugeGraph(percentageToSet) {
		this.setState({ percentage: percentageToSet });

		// this.startingAnimation();

		this.animateNeedleToPercentageToGraph($('#gauge' + this.props.id)[0])
	}

	// startingAnimation() {
	// 	$('#gauge' + this.props.id).removeClass('addAnimation');
	// 	$('#gauge' + this.props.id).addClass('addAnimation');
	// }

}

var styles = {
	btnParent: {
		marginTop: 30
	},
	circle: {
		fill: 'yellow'
	},
	container: {
		cursor: 'pointer'
	},
	displayPercent: {
		marginTop: 10,
		fontSize: 20,
		borderRadius: 5,
		border: '2px solid black'
	},
	gaugeArrow: {
		transform: 'rotate(270deg)',
		zIndex: 11
	},
	svg: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 1,
		overflow: 'hidden'
	}
}

//this runs when the file gets loaded which is fine. It has no dependencies on anything other than the javascript interpreter
var percentConstantHelper = [];
var startingDegreeValue = 270;		//when setting the percentage I want to be able to simply say, set the degree to 55 and it does it... right now 55 would actually require a rotate degree of 325 so this for loop helps me with a simple conversion based off of the index used
									//usage: to set the degree of the needle to be 50percent (in human terms) then do
									//
									//			percentConstantHelper[50]
									//
									//		 this will spit out the proper conversion (which is idk.. what 270 = 0 so 270 + 50 so the answer would be 320 I suppose.)
for(var i = 0; i < 101; i++) {
	percentConstantHelper[i] = startingDegreeValue;
	startingDegreeValue += 1;
}
