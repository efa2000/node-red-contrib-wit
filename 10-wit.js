module.exports = function(RED) {
	var request = require('request');
	function witai(config) {
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
		            error = "Invalid response received from server: " + response.statusCode
		            msg.payload = error;
		        } else {
		        	msg.payload = body;
		        };
				node.send(msg);
		    });
        });
    }
    RED.nodes.registerType("wit.ai",witai);
}