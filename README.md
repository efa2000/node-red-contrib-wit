node-red-contrib-wit
====================

Node-Red nodes for communication with Wit.ai

WIT.AI - Natural Language for the Internet of Things! https://wit.ai/

[![Screen shot](https://raw.githubusercontent.com/efa2000/node-red-contrib-wit/master/screen-shot.png)](https://raw.githubusercontent.com/efa2000/node-red-contrib-wit/master/screen-shot.png)

#Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-wit

#Input
Text string from msg.payload

#Output
Response Object in msg.payload
Example response

	  {
	    "msg_id" : "387b8515-0c1d-42a9-aa80-e68b66b66c27",
	    "_text" : "how many people between Tuesday and Friday",
	    "outcomes" : [ {
	        "_text" : "how many people between Tuesday and Friday",
	        "intent" : "query_metrics",
	        "entities" : {
	            "metric" : [ {
	              "metadata" : "{'code' : 324}",
	              "value" : "metric_visitor"
	            } ],
	            "datetime" : [ {
	                "value" : {
	                    "from" : "2014-07-01T00:00:00.000-07:00",
	                    "to" : "2014-07-02T00:00:00.000-07:00"
	                }
	              }, {
	                "value" : {
	                    "from" : "2014-07-04T00:00:00.000-07:00",
	                    "to" : "2014-07-05T00:00:00.000-07:00"
	                }
	              } ]
	        },
	        "confidence" : 0.621
	    } ]
	  }
#wit.ai voice
Additional node to handle microphone recordings for voice recognition
