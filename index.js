/*
 * Copyright (c) 2016, Bigsens, LLC
 * A simple example of the host service with connection to the Service Gateway
 * That example can be implemented on any language with TCP socket support
 * Author: Constantin Alexandrov
 */

'use strict';

var Message = require('./protocol').Message, // Platform definitions, get only message
	net = require('net'), // We work with clear TCP socket
	aguid = require('aguid'); // GUID generator, you can choose others with support RFC4122

// Make service guid
var guid = aguid('helloworld'); // 936a185c-aa26-4b9c-8981-9e05cb78cd73

function main() {

	// Step 1: Create TCP client with connection to the Service Gateway on port 13777
	var socket = net.connect(13777, function() {

		// Connected

		// Step 2: All new services must announce yourself with the SERVICE_ANNCE message
		// Otherwise connection will be closed by the Service Gateway
		var packet = {
			cmd : Message.SERVICE_ANNCE,
			data : {
				guid : guid, // Mandatory field
				name : 'Hello World Service', // Mandatory field
				description : 'Simple host service with connection to the Service Gateway'
			}
		}

		// Step 3: Encode our packet
		packet = JSON.stringify(packet);

		// Step 4: Send packet to the Service Gateway
		socket.write(packet);

		// So our service will be instantly registered in the Service Gateway 
		// Then you can interact with Service Gateway and others services

	});

}

main(); // Let's start our first service

