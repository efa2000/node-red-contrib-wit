module.exports = function(RED) {
	var wit = require('node-wit');
	var ACCESS_TOKEN = "WNGYO646UEE4LR2L3JBQZJFIEIBXAYIT";
    function witai(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        	var qtext = msg.payload;

            wit.captureTextIntent(ACCESS_TOKEN, qtext, function (err, res) {
            	if (err) {
            		node.send(err);
            	} else {
            		msg.payload = res;
            		node.send(msg);
            	};
            });
        });
    }
    RED.nodes.registerType("wit-ai",witai);
}