const http = require('http');
const url=require('url');
const hostname = '127.0.0.1';
const port = 3000;
const eventCards = require('./cards/cards.js');
var cardNumber;
const server = http.createServer(function(req, res){
	res.setHeader('Content-Type', 'text/html');
	res.write('<head><meta charset="UTF-8"></head>');
	var pathname=url.parse(req.url).pathname;
	if (pathname.substring(0,6)=='/cards') {
		if (pathname[6]=='/'&&pathname[7]!=null){
			cardNumber=parseInt(pathname.substring(7,10));
			if (cardNumber<97){
				res.write('<p>' + eventCards[cardNumber-1].eventTitle + '</p>' );				
				res.write('<p>' + eventCards[cardNumber-1].type + '</p>' );
				if (eventCards[cardNumber-1].eventPreCondition==null){
					res.write('<p>This card does not have an event precondition!</p>');
				}
				else 
					res.write('<p>' + eventCards[cardNumber-1].eventPreCondition + '</p>' );
				res.write('<p>' + eventCards[cardNumber-1].eventText + '</p>' );
				if (eventCards[cardNumber-1].eventDiscardCondition==null){
					res.write('<p>This card does not have a discard condition!</p>');
				}
				else
					res.write('<p>' + eventCards[cardNumber-1].eventDiscardCondition + '</p>' );
				if (eventCards[cardNumber-1].multiplayerGameInformation==null){
					res.write('<p>This card does not have any information about multiplayer games!</p>')	
				}
				else
					res.write('<p>' + eventCards[cardNumber-1].multiplayerGameInformation + '</p>' );
				res.write('<p>' + eventCards[cardNumber-1].combatTitle + '</p>' );
				if (eventCards[cardNumber-1].combatPreCondition==null){
					res.write('<p>This card does not have an event pre-condition!</p>');
				}
				else 
					res.write('<p>' + eventCards[cardNumber-1].combatPreCondition + '</p>' );
				res.write('<p>' + eventCards[cardNumber-1].combatText + '</p>' );
				res.write('<p>' + eventCards[cardNumber-1].initiativeNumbers + '</p>' );
				res.write('<p>' + cardNumber + '</p>' );		
			}				
			else res.write('<p>Such card does not exist!</p>');
		}
		else for(var i=0; i<96; i++)
			res.write('<p>Card #' + (i+1) + ': ' + eventCards[i].eventTitle + '</p>');
		
	}

	res.end();
}).listen(3000);


server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});