// -go over for loop in javascript and print all items in an array

var myArray = ['this', 'is', 'an', 'array', 'of', 'strings'];

for(var i = 0; i < myArray.length; i++) {
	console.log(myArray[i]);
}


// -do the same thing with .map ES5 syntax
myArray.map(function(value, index) {
	console.log(value);
})

// -do same thing with .map ES6 syntax
myArray.map((value, index) => {
	console.log(value);
})
