'use strict';

const robot = require("robotjs");
// Speed up the mouse.
robot.setMouseDelay(2);

const twoPI = Math.PI * 2.0;
const screenSize = robot.getScreenSize();
const height = (screenSize.height / 2) - 10;
const width = screenSize.width;

function moveMouse() {
    console.log('Moving cursor now...');
    let y;
    for (let x = 0; x < width; x++) {
        y = height * Math.sin((twoPI * x) / width) + height;
        robot.moveMouse(x, y);
    }
}

function handleMoveMouse() {
    let lastPos = robot.getMousePos();
    setTimeout(() => {
        let currentPos = robot.getMousePos();
        if (lastPos.x === currentPos.x && lastPos.y === currentPos.y) {
            moveMouse();
        } else {
            console.log('Cursor in movement, no action required. Last pos: ' + JSON.stringify(lastPos) + ' current pos: ' + JSON.stringify(currentPos) );
        }
    }, 6000);
}

console.log('Argments : ' +JSON.stringify( process.argv));
let intervalInSec = process.argv[2] || 15;
const interval = parseInt(intervalInSec) * 1000;
console.log('Ready to move cursor each %d seconds to avoid screensaver', intervalInSec);
setInterval(handleMoveMouse, interval);
