import React, { Component } from "react";
import styles from "./ToDoList.module.scss";
import ToDoItem from "./ToDoItem";

class ToDoList extends Component {
  render() {
    return (
      <main className={styles.toDoList}>
        {this.props.toDoItems.map(todo => 
          <React.Fragment key={todo._id}>
            <ToDoItem toDoItem={todo} />
            <hr/>
          </React.Fragment>)}
      </main>
    );
  }
}

export default ToDoList;
