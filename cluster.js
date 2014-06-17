'use strict';
var cluster = require('cluster');
var os = require('os');
var i;

// Am I the master of the cluster?
// YES - span the workers
// NO - run the work

if (cluster.isMaster) {
  console.log("I am the master");
  console.log(process.pid);
  for (i=0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker) {
    cluster.fork();
  });
} else {
    console.log("I am a worker");
    console.log(process.pid);
}
