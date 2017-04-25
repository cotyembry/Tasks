import React from 'react';

export default class PathLabel extends React.Component {
	render() {
		//nodes.push({'id': i, 'x': x, 'y': y});
		//var dAttribute = 'M' + x + ' ' + y;
		var labelColor = typeof this.props.labelColor === 'undefined' ? '#A6A6A6' : this.props.labelColor;
		return (
			<circle cx={this.props.nodeData.x} cy={this.props.nodeData.y} r={5} fill={labelColor} />	
		)
	}
}

var styles = {
	rootElement: {
		zIndex: 20
	}
}
