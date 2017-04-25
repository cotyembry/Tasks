
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


var formatData = function(data) {
	console.log(data)
}

module.exports = formatData;
