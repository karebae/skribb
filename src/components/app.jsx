import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateLobby from "./CreateLobby";
import GameLobby from "./GameLobby";
import styles from './styles.css'

function App({ redirect }) {
  return (
    <div className={styles.app}>
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
