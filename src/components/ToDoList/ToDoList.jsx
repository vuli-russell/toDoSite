import React, { Component } from "react";
// import styles from "./ToDoList.module.scss";
import ToDoItem from "./ToDoItem";

class ToDoList extends Component {
  render() {
    return (
      <div>
        {this.props.toDoItems.map(todo => <ToDoItem key={todo._id} toDoItem={todo} />)}
      </div>
    );
  }
}

export default ToDoList;
