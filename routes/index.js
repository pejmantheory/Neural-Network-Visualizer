var express = require('express');
var router = express.Router();
var synaptic = require("synaptic");

/* GET home page. */
router.get('/', function(req, res, next) {

  var Architect = synaptic.Architect;

  // Create a new neural network with 3 input neurons, 10 hidden neurons, and 7 output neurons
  var net = new Architect.Perceptron(3, 10, 7);

  // Define the training set
  var trainingSet = [
    { input: [0.03, 0.7, 0.5], output: [1, 0, 0, 0, 0, 0, 0] }, // Black
    { input: [0.16, 0.09, 0.2], output: [0, 1, 0, 0, 0, 0, 0] }, // White
    { input: [1.0, 0.0, 0.0], output: [0, 0, 1, 0, 0, 0, 0] }, // Red
    { input: [0.0, 1.0, 0.0], output: [0, 0, 0, 1, 0, 0, 0] }, // Green
    { input: [0.0, 0.0, 1.0], output: [0, 0, 0, 0, 1, 0, 0] }, // Blue
    { input: [1.0, 1.0, 0.0], output: [0, 0, 0, 0, 0, 1, 0] }, // Yellow
    { input: [0.5, 0.0, 0.5], output: [0, 0, 0, 0, 0, 0, 1] } // Purple
  ];

  // Train the network
  var learningRate = .3;
  for(var i = 0; i < 5000000; i++)
  {
    var data = trainingSet[Math.floor(Math.random() * trainingSet.length)];
    net.activate(data.input);
    net.propagate(learningRate, data.output);
  }

  // Run the network
  var output = net.activate([1, 0.4, 0]);

  console.log("Raw Output: ", output); // Log raw output

  // Normalize the output to be between 0 and 1
  var sum = output.reduce((a, b) => a + b, 0);
  var normalizedOutput = {
    black: output[0] / sum,
    white: output[1] / sum,
    red: output[2] / sum,
    green: output[3] / sum,
    blue: output[4] / sum,
    yellow: output[5] / sum,
    purple: output[6] / sum
  };

  console.log("Normalized Output: ", normalizedOutput); // Log normalized output

  res.render('index', { title: 'Neural Network Visualizer', output: normalizedOutput });
});

module.exports = router;
