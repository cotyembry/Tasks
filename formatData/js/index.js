/*
*	       Author:	John Coty Embry
*	 Date Created: 	01-18-2017
*	Last Modified: 	01-18-2017
*/

import React from 'react';
import ReactDOM from 'react-dom';

import CQMMeasuresGraph from './components/CQMMeasuresGraph.jsx';
import GaugeGraph from './components/GaugeGraph.jsx';

import {Array} from './jsUtils.js';




import formatData from './formatData.js';





var uniqueId = 0;

$(document).ready(function() {	
	//for CQMMeasuresGraph
	var data = getGraphDataHelper();


	//For GaugeGraph
	// getGaugeGraphData will be a function on the .csp page that will return the data needed to graph
	var valueToGraph = typeof getGaugeGraphData === 'undefined' ? 55 : getGaugeGraphData();

	var onClickFunction = function() {
		//this function will propertly route the page to the correct location
		window.top.document.getElementById('page').contentWindow.document.getElementById('iframe1').src = 'MARSPQRSINTRO.csp';
	}


	ReactDOM.render(<CQMMeasuresGraph data={data} canvasId={'canvasId-' + uniqueId} rootDiv={'CQMMeasuresGraph'} />, document.getElementById('CQMMeasuresGraph'));
	uniqueId++;
	
	// ReactDOM.render(<GaugeGraph id={uniqueId}  onClick={onClickFunction} />, document.getElementById('GaugeGraph1'));
	ReactDOM.render(<GaugeGraph id={uniqueId} valueToGraph={10} onClick={onClickFunction} />, document.getElementById('GaugeGraph1'));
	



	formatData(data);	//here is where your code will run


	// uniqueId++;
	// ReactDOM.render(<GaugeGraph id={uniqueId} valueToGraph={50} onClick={onClickFunction} />, document.getElementById('GaugeGraph2'));
	// uniqueId++;	
	// ReactDOM.render(<GaugeGraph id={uniqueId} valueToGraph={75} onClick={onClickFunction} />, document.getElementById('GaugeGraph3'));
})
