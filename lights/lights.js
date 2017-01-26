#!/usr/local/bin/node

const exec = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');

const POWER_PIN = 0;
const LIGHT_PIN = 2;

// check for parameters
// -configure: sets the GPIO to their initial state
process.argv.forEach(function (val, index, array) {
  if (val == "-configure") {
      exec.execSync(util.format("gpio mode %d out", POWER_PIN));
      exec.execSync(util.format("gpio mode %d out", LIGHT_PIN));
      exec.execSync(util.format("gpio write %d 1", POWER_PIN));
      exec.execSync(util.format("gpio write %d 1", LIGHT_PIN));
      process.exit();
  }
  if (val == "-force") {
    var letter = process.argv[index + 1];
      if (letter == 'W' || letter == 'B' || letter == 'N') {
	  change_lights(letter);
      }
      else {
	  console.warn("Unable to use -force without W|B|N mode.");
      }
      process.exit();
  }
});

function change_lights(action) {
    if (action === 'N') {
	exec.execSync(util.format("gpio write %d 1", LIGHT_PIN));
	exec.execSync(util.format("gpio write %d 1", POWER_PIN));
    } else if (action === 'W') {
	exec.execSync(util.format("gpio write %d 0", LIGHT_PIN));
	exec.execSync(util.format("gpio write %d 0", POWER_PIN));
    } else if (action === 'B') {
	exec.execSync(util.format("gpio write %d 1", LIGHT_PIN));
	exec.execSync(util.format("gpio write %d 0", POWER_PIN));
    }
}

// read schedule
var json = fs.readFileSync(path.resolve(__dirname, './schedule.json'), 'utf8');
var schedule = JSON.parse(json);

// get current date, and find appropriate light mode
var date = new Date();
var current_hour = date.getHours();
var action = schedule[current_hour];

// apply light mode
change_lights(action);