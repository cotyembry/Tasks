import React from 'react';

import $ from 'jquery';
import Chart from 'chart.js';


/**
 *		Note: 	If you ever need to update/rename or add more measures to this CQMMeasuresGraph, the place this logic
 *				is defined is in the following two methods
 *
 *					formatData, switchGaugeGraphToDisplay
 *
 *				(inside the measures object in formatData, and in switch statement in switchGaugeGraphToDisplay)
 *
 *				You will probably have to also keep in mind the data coming from the server and making sure it all matches up
 */

var self;	//here I will expose a global to help me with dealing with the `this` variable when conflicts occur


export default class CQMMeasuresGraph extends React.Component {
	//I will wrap canvasClicked in a try catch block to avoid an error that occurs when the user clicks in the canvas with no element underneath the click event
	canvasClicked(event) {
		try {
			var CQMMeasuresGraphReference = this.idObject[event.target.id];
			var activeElement = CQMMeasuresGraphReference.getElementAtEvent(event);
			//switchValue will be the label of the particular bar that was clicked on
			var switchValue = activeElement[0]._model.label;
			this.switchGaugeGraphToDisplay(switchValue);
		}
		catch(error) {
			//ignore the error here since this will typically mean that the user failed to click on an element within the canvas
		}
	}
	constructor(props) {
		super(props);

		this.GaugeGraphHeight = 275;	//this will make sure to consistently keep the GaugeGraphHeigth to be 275

		this.idObject = [];	//idObject will hold a reference to the instance of the Chart.js graph
		this.store = [];
		self = this;
		var totalHeight = $(document).outerHeight(true);
		var marginSpaceHelper = 10;

		this.state = {
			canvas: {
				// width: 400,
				height: totalHeight - this.GaugeGraphHeight - marginSpaceHelper
			},
			gaugeGraphDisplaying: 'P236'
		}
		
	}
	componentDidMount() {
		// Create the event.
		//var event = document.createEvent('Event');

		// Define that the event name is 'build'.
		//event.initEvent(this.props.eventName, true, true);



		// // Listen for the event.
		// elem.addEventListener('build', function (e) {
		//   // e.target matches elem
		// }, false);

		// target can be any Element or other EventTarget.
		//elem.dispatchEvent(event);		


		// var totalHeight = $('html').outerHeight();
		// var containerHeight = 475;	//475 is what I will say for the space necessary to hold the GaugeGraph

		// this.setState({
		// 	canvas: {
		// 		height: totalHeight - containerHeight
		// 	}
		// })
		this.displayChart(this.props.data, this.props.canvasId);


		// console.log('testing state', this.state.canvas)


	}
	displayChart(data, idForCanvas) {
		var data = getGraphDataHelper();

		data = this.formatData(data);

		var ctx = document.getElementById(idForCanvas).getContext('2d');

		var CQMMeasuresGraphReference = new Chart(ctx, {
			type: 'bar',
			
			data: data,
			options: {
				maintainAspectRatio: false,
				legend: {
					display: true,
					labels: {
						fontSize: 40
					}
				},
				tooltips: {
					titleFontSize: 40,
					bodyFontSize: 38
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							fontSize: 40
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true,
							fontSize: 40
						}
					}]
				}
			}
		});


		// window.chartRef = CQMMeasuresGraphReference;


		// ctx.canvas.height = 


		//here I will add an onclick listener to the canvas to respond appropriately to what the user clicks on
		this.idObject[idForCanvas] = CQMMeasuresGraphReference;
		document.getElementById(idForCanvas).onclick = this.canvasClicked.bind(this);


		//here I set the height of the canvas container after it has been rendered to the screen to control the height dimensions
		//It would be nice to not have the containerHeight hard coded. I will change this possibly later when I have more time
		// var totalHeight = $('html').outerHeight();
		
		// console.log('totalHeight = ', totalHeight);

		// var containerHeight = this.GaugeGraphHeight;	//GaugeGraph.jsx is created to be 275 pixels, fixed size

		// this.setState({
		// 	canvas: {
		// 		height: this.GaugeGraphHeight
		// 	}
		// })

		// console.log(' ->', this.state.canvas.height)
		
		// console.log('height is: ', totalHeight - containerHeight)

		// ctx.canvas.height = totalHeight - containerHeight;

		// CQMMeasuresGraphReference.resize();

	}
	formatData(data) {
		/**
		 *	The format the line graph is expecting is the following:
		 *		data = {
		 *			labels: ['labelName1', 'labelName2', ...],
		 *			datasets: [
		 *				{
		 *					label: 'lineName',
		 *					data: [CheckInToCheckOutValue, CheckInToTriageValue, CurrentCheckInsValue]
		 *				},
		 *				{
		 *					same format as the object in the datasets array above
		 *					(each object in the datasets array will represent
		 *					another section in the bar graph)
		 *				}
		 *			]
		 *		}
		 *
		 */

		
	
		
		//the measures will be hard coded and used later depending on which measures are needed
		var measures = {
			p236: 'P236',
			mmr: 'MMR',
			dtap: 'DTap'
		}
		var labels = [];
		var objectKeys = Object.keys(data);
		var datasets = [];
		var valuesToGraph = [];
		var customHelper = [];
		//this for loop gets the labels to use by getting the values from the json objects key values
		for(var i = 0; i < objectKeys.length; i++) {
			labels.push(measures[objectKeys[i]])
			valuesToGraph.push(data[objectKeys[i]][0]);
			customHelper.push(this.extendOptions(i));		//extendOptions will help me add color and options to the graph
		}

		//Now I will customize the options passed to the graph
		var backgroundColorArray = [];
		var borderColorArray = [];
		var borderDashArray = [];
		var pointBorderColorArray = [];
		var pointHoverBackgroundColorArray = [];
		var pointHoverBorderColorArray = [];

		for(var i = 0; i < customHelper.length; i++) {
			backgroundColorArray.push(customHelper[i].backgroundColor);
			borderColorArray.push(customHelper[i].borderColor);
			borderDashArray.push(customHelper[i].borderDash);
			pointBorderColorArray.push(customHelper[i].pointBorderColor);
			pointHoverBackgroundColorArray.push(customHelper[i].pointHoverBorderColor);
			pointHoverBorderColorArray.push(customHelper[i].pointHoverBackgroundColor);
		}

          


		datasets[0] = {
			label: 'CQM Measure Value',
			data: valuesToGraph,					//these will be the values for the current month
			backgroundColor: backgroundColorArray,
			borderColor: borderColorArray,
			borderDash: borderDashArray,
			fill: true,
			borderCapStyle: 'butt',
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: pointBorderColorArray,
			pointHoverBackgroundColor: pointHoverBackgroundColorArray,
			pointHoverBorderColor: pointHoverBorderColorArray,
			pointBackgroundColor: "#FFFFFF",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBorderWidth: 2,
			pointRadius: 5,
			pointHitRadius: 10
		}
		

		var dataExt = {
			labels: labels,
			datasets: datasets
		}
		

		return dataExt;
	}

	extendOptions(index) {
		var objectToReturn = {};
		switch(index) {
			case 0:	
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(252, 182, 23, 0.2)",
		            borderColor: "#FCB617",
		            borderCapStyle: 'butt',
		            borderDash: [5, 15],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#FCB617",
		            pointBackgroundColor: "#FFFFFF",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#fdd068",
		            pointHoverBorderColor: "#FCB617",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}

				break;
			
			case 1:
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(134, 152, 162, 0.2)",
		            borderColor: "#8698A2",
		            borderCapStyle: 'butt',
		            borderDash: [50, 20],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#8698A2",
		            pointBackgroundColor: "#FFFFFF",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#a9b5bc",
		            pointHoverBorderColor: "#8698A2",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}				
				break;
			case 2:
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(56, 198, 244, 0.2)",
		            borderColor: "#38C6F4",
		            borderCapStyle: 'butt',
		            borderDash: [10, 10],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#38C6F4",
		            pointBackgroundColor: "#FFFFFF",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#7bd1d1",
		            pointHoverBorderColor: "#38C6F4",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}
				break;
			case 3:
				//TODO: pick different colors from here and to the end to the default case
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(217, 31, 38, 0.2)",
		            borderColor: "#d91f26",
		            borderCapStyle: 'butt',
		            borderDash: [25, 25],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "#D91F26",
		            pointBackgroundColor: "#FFFFFF",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#e64d52",
		            pointHoverBorderColor: "#D91F26",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}
				break;
			case 4:
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(0, 0, 0, 0.2)",
		            borderColor: "rgba(0, 0, 0, 1)",
		            borderCapStyle: 'butt',
		            borderDash: [5, 5, 10],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgb(0, 0, 0)",
		            pointBackgroundColor: "#FFFFFF",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "rgba(0, 0, 0, 0.2)",
		            pointHoverBorderColor: "#333333",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}
				break;
			case 5:
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(128, 0, 128, 0.2)",
		            borderColor: "rgba(128, 0, 128, 0.2)",
		            borderCapStyle: 'butt',
		            borderDash: [75, 75],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(128, 0, 128, 0.2)",
		            pointBackgroundColor: "#FFFFFF",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#cc00cc",
		            pointHoverBorderColor: "rgba(220,220,220,1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}
				break;
			case 6:
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(51, 204, 51, 0.2)",
		            borderColor: "rgba(75,192,192,1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#FFFFFF",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#85e085",
		            pointHoverBorderColor: "rgba(51, 204, 51, 0.2)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}
				break;
			default:
				objectToReturn = {
		           	fill: true,
		            backgroundColor: "rgba(255, 165, 0, 0.2)",
		            borderColor: "rgba(255, 165, 0, 1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(255, 165, 0, 1)",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "#ffc14d",
		            pointHoverBorderColor: "rgba(255, 165, 0, 1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 5,
		            pointHitRadius: 10,
				}
		}

		return objectToReturn;		
	}

	render() {

		return (
			<div style={styles.canvasParent}>
				{/*<canvas id={this.props.canvasId} style={self.state.canvas}></canvas>*/}
				<canvas height={this.state.canvas.height} id={this.props.canvasId}></canvas>
			</div>
		)
	}

	switchGaugeGraphToDisplay(labelValue) {
		var valuesToGraph = 0;

		//todo: possibly change to if statement later
		switch(labelValue) {
			case 'P236':
				console.log('P236')
				valuesToGraph = 30
				break;

			case 'MMR':
				console.log('mmr')
				valuesToGraph = 20
				break;

			case 'DTap':
				console.log('dtap')
				valuesToGraph = 10
				break;
			default:
				console.error('Error: Add case statement for another measure.');
				valuesToGraph = 40
				break;
		}
		


		//this setStateOfGaugeGraph function is exposed to the window object in the constructor of GaugeGraph.jsx component
		window.setStateOfGaugeGraph(valuesToGraph);
	}
}


var styles = {
	canvasParent: {
		// width: '100%',
		// height: 391
	},
	get canvas() {
		var totalWidth = $(document).outerWidth();
		return {
			// background: 'yellow',
			width: totalWidth + 'px',
			height: '400px'
		}

	}
}
