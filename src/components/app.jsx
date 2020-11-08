import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateLobby from "./CreateLobby";
import GameLobby from "./GameLobby";
import styles from './styles.css'
// import logo from './Logo.png'

function App({ redirect }) {
  return (
    <div className={styles.app}>
      {/* <img src={logo} alt="Logo"/> */}
      <Switch>
        <Route
          exact
          path="/home"
          children={<CreateLobby redirect={redirect} />}
        />
        <Route path="/:lobbyName" children={<GameLobby />} />
      </Switch>
    </div>
  );
}

export default App;
