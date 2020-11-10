import React, { Component } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <ToDoList />
      </div>
    )
  }
}


export default App;
