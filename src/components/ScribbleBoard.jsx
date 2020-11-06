import React from "react";
import Sketch from "react-p5";
import SocketEvents from "../lib/enums/socketEvents";

function ScribbleBoard({ socket, currentDrawer, isDraw }) {
  let x = 50;
  const y = 50;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(255); //white

    socket.on(SocketEvents.DRAW, function (data) {
      console.log("Got: " + data.x + " " + data.y);
      let color = data.isDraw ? 0 : 255;
      p5.fill(color); //if drawState is 'draw' 0 if drawState
      p5.noStroke();
      p5.circle(data.x, data.y, 10);
    });

    socket.on(SocketEvents.CLEAR_DRAW, function() {
      console.log('clear the drawing!');
      p5.clear();
    })
  };

  function sendmouse(xpos, ypos, isDraw) {
    console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with  and y
    var data = {
      x: xpos,
      y: ypos,
      isDraw: isDraw
    };

    // Send that object to the socket
    socket.emit(SocketEvents.DRAW, data);
  }

  function mouseDragged(p5) {
    // Draw some white circles

    if (currentDrawer) {
      let color = isDraw ? 0 : 255;
      p5.fill(color); //black
      p5.noStroke();
      p5.circle(p5.mouseX, p5.mouseY, 10);
      // Send the mouse coordinates
      sendmouse(p5.mouseX, p5.mouseY, isDraw);
    }
  }


  return <Sketch setup={setup} mouseDragged={mouseDragged} style={{border: '1px solid black'}}/>;

}

export default ScribbleBoard;
