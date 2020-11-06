import React, { useState, useEffect, Suspense } from "react";
import { EventOptions } from "../lib/utils";
import SocketEvents from "../lib/enums/socketEvents";
const ScribbleBoard = React.lazy(() => import("./ScribbleBoard"));

function GameBoard({ initialGameData, initialUserState, socket, userName }) {
  const [gameData, updateGameData] = useState(initialGameData);
  const [users, updateUserData] = useState(initialUserState);
  const [myWord, updateMyWord] = useState();
  const [isDraw, updateIsDraw] = useState(true);

  useEffect(() => {
    function decrementDrawTimer(message) {
      const updatedGameData = { ...gameData };
      updatedGameData.drawTimer = message.data.drawTimer;
      updatedGameData.currentRound = message.data.currentRound;
      updatedGameData.currentDrawerName = message.data.currentDrawerName;
      updateGameData(updatedGameData);
    }

    function updateWord(message) {
      updateMyWord(message.data);
    }
    socket.on(SocketEvents.DECREMENT_DRAW_TIMER, decrementDrawTimer);
    socket.on(SocketEvents.START_YOUR_TURN, updateWord);

    return () => {
      socket.off(SocketEvents.DECREMENT_DRAW_TIMER, decrementDrawTimer);
      socket.off(SocketEvents.START_YOUR_TURN, updateWord);
    };
  }, [gameData, myWord]);

  function handleClearDrawing() {
    console.log('hit clear drawing');
    socket.emit(SocketEvents.CLEAR_DRAW);
  }

  function handleEraseOrDraw(e) {
    console.log('erase/draw button');
    console.log(e.target.id);
    if (e.target.id === 'eraseBtn') {
      updateIsDraw(false);
    } else if (e.target.id === 'drawBtn') {
      updateIsDraw(true);
    }
  }

  let displayMyWord =
    userName === gameData.currentDrawerName ? <div>{`Your word is: ${myWord}`}</div> : <></>;

  let clearDrawingButton =
    userName === gameData.currentDrawerName ? <button type="button" onClick={() => handleClearDrawing()}> Clear Drawing </button> : <></>;

  let eraseButton =
    userName === gameData.currentDrawerName ? <button id="eraseBtn" type="button" onClick={(e) => handleEraseOrDraw(e)}> Erase </button> : <></>;

  let drawButton =
    userName === gameData.currentDrawerName ? <button id="drawBtn" type="button" onClick={(e) => handleEraseOrDraw(e)}> Draw </button> : <></>;

  return (
    <div>
      {displayMyWord}
      <div>Total Rounds: {gameData.totalRounds}</div>
      <div>Current Round: {gameData.currentRound}</div>
      <div>Draw Timer: {gameData.drawTimer}</div>
      <div>Current Drawer: {gameData.currentDrawerName} </div>
      <Suspense fallback={<dev>Loading...</dev>}>
        <ScribbleBoard
          socket={socket}
          currentDrawer={userName === gameData.currentDrawerName}
          isDraw={isDraw}
        />
      </Suspense>
      {drawButton}
      {eraseButton}
      {clearDrawingButton}
    </div>
  );
}

export default GameBoard;
