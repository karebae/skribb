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
      p5.stroke(color);
      p5.strokeWeight(4);
      p5.line(data.x, data.y, data.px, data.py);
    });

    socket.on(SocketEvents.CLEAR_DRAW, function() {
      console.log('clear the drawing!');
      p5.clear();
    })
  };

  function sendmouse(x, y, pX, pY, isDraw) {
    console.log("sendmouse: " + x + " " + y);

    // Make a little object with  and y
    var data = {
      x: x,
      y: y,
      px: pX,
      py: pY,
      isDraw: isDraw
    };

    // Send that object to the socket
    socket.emit(SocketEvents.DRAW, data);
  }

  function mouseDragged(p5) {
    // Draw some white circles

    if (currentDrawer) {
      let color = isDraw ? 0 : 255;

      //draw line
      p5.stroke(color);
      p5.strokeWeight(4);
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);

      // Send the mouse coordinates
      sendmouse(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY, isDraw);
    }
  }


  return <Sketch setup={setup} mouseDragged={mouseDragged} style={{border: '1px solid black'}}/>;

}

export default ScribbleBoard;
