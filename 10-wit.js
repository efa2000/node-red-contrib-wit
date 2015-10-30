module.exports = function(RED) {
	var request = require('request'),
	rec = require('node-record-lpcm16');
	function witaiText(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        	var options = {
		        url: 'https://api.wit.ai/message',
		        qs: {'q': msg.payload},
		        json: true,
		        headers: {
		            'Authorization': 'Bearer ' + config.access_token,
		            'Accept': 'application/vnd.wit.' + config.version
		        }
		    };
		    request(options, function (error, response, body) {
		        if (response && response.statusCode != 200) {
		            error = "Invalid response received from server: " + response.statusCode + " - " + body;
		            node.error(error);
		        } else {
		        	msg.payload = body;
		        	node.send(msg);
		        };
		    });
        });
    }

    function witaiVoice(config){
        RED.nodes.createNode(this,config);
        var node = this;
	this.on('input', function(msg){
		rec.start().pipe(request.post({
		    'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
		    'headers' : {
		    'Accept'        : 'application/vnd.wit.20160202+json',
		    'Authorization' : 'Bearer ' + config.access_token,
		    'Content-Type'  : 'audio/wav',
		    'Transfer-encoding' : 'chunked'
		    }
		}, function (error, response, body) {
		        if (response && response.statusCode != 200) {
		            error = "Invalid response received from server: " + response.statusCode + " - " + body;
		            node.error(error);
		        } else {
		        	msg.payload = body;
		        	msg.error = error
				node.send(msg);
		        };
		    }));
		setTimeout(function () {
			rec.stop();
		}, config.timeout);
	})
    }
    RED.nodes.registerType("wit.ai text",witaiText);
    RED.nodes.registerType("wit.ai voice",witaiVoice);
}
