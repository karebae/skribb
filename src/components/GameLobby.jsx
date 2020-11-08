import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import SetUser from "./SetUser";
import establishIoConnection from "../lib/socket/";
import SocketEvents from "../lib/enums/socketEvents";
import GameBoard from "./GameBoard";
import WinnerPage from "./WinnerPage";
import styles from './styles.css'


function GameLobby() {
  const [lobbyName] = useState(useParams().lobbyName);
  const [gameStatus, updateGameStatus] = useState();
  const [gameData, updateGameData] = useState();
  const [initialUserState, updateInitialUserState] = useState();
  const [userName, setUserName] = useState();
  const [users, updateUserData] = useState({});
  const [gameOver, updateGameOver] = useState(false);
  const socket = useRef(establishIoConnection(window.location.pathname))
    .current;

  useEffect(() => {
      updateUserData(initialUserState);
  }, [initialUserState]);

  useEffect(() => {
    function startGame(message) {
      updateGameData(message.data);
      updateGameStatus(message.success);
      updateInitialUserState(message.users);
    }

    function updateUser(message) {
      updateUserData(message.data);
    }

    function updateGame(message) {
      updateGameOver(message.data);
    }

    socket.on(SocketEvents.START_GAME, startGame);
    socket.on(SocketEvents.USERS_UPDATED, updateUser);
    socket.on(SocketEvents.GAME_OVER, updateGame);

    return () => {
      socket.off(SocketEvents.START_GAME, startGame);
      socket.off(SocketEvents.USERS_UPDATED, updateUser);
      socket.off(SocketEvents.GAME_OVER, updateGame);
    };
  }, [gameStatus]);

  console.log("user after click", users)
  console.log("gameOver after click", gameOver)
  console.log("game Status after click", gameStatus)


  return (
    <div>
      <h3>LobbyName: {lobbyName}</h3>
      {gameOver === "WINNER" ? (
        <WinnerPage users={users} updateUserData={updateUserData} socket = {socket} userName= {userName} initialUserState={initialUserState} updateGameStatus={updateGameStatus} updateGameOver={updateGameOver} />
      )
      :
      (
        gameStatus ? (
        <GameBoard
          initialGameData={gameData}
          initialUserState={initialUserState}
          socket={socket}
          userName={userName}
          users ={users}
        />
      ) : (
        <SetUser
          socket={socket}
          userName={userName}
          setUserName={setUserName}
        />
      ))
      }

      {<ChatRoom socket={socket} userName={userName} />}
    </div>
  );
}

export default GameLobby;
