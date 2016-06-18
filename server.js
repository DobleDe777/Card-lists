var express = require('express');
var app = express();
const eventCards  =  require('./cards/cards.js');
function beautify(string) {
 return string
  // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); });
}

function dooblede(cardNumber) {
 var order = ['eventTitle', 'type', 'eventPreCondition', 'eventDiscardCondition',
        'multiplayerGameInformation', 'combatTitle', 'combatPreCondition',
        'combatText', 'initiativeNumbers'];
 var kvArray = [];
 var response = '';
 order.forEach(
 (value) => {
	 kvArray.push(eventCards[cardNumber-1][value])
});
 kvArray.forEach(function(value, key) {
  if (value == null || value == undefined) {
   response += '<p>This card does not have ' + beautify(order[key]) + '!</p>';
  } else {
   response += '<p>' + value + '</p>';
  }
 });
 return response;
}


app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/cards', function (req, res) {
	for(var i = 0; i<96; i++) {
		res.write('<p><a href = "./cards/' + (i+1) + '">Card #' + (i+1) + '</a>: ' + eventCards[i].eventTitle + '</p>');
	}
	res.end();
});

app.get('/cards/:id', function (req, res) {
	res.write('<head><meta charset="UTF-8"></head>');
	res.write('<p>' + req.params.id + '</p>');
	if((req.params.id < 97) && (req.params.id > 0)){
		res.write('' + dooblede(req.params.id));
	}
	else {
		res.write('<p>Such card does not exist!</p>');
	}
	res.end();
	});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
	
});