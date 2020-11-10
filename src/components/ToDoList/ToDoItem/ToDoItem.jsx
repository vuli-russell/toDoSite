import React, { Component } from "react";
// import styles from "./ToDoItem.module.scss";

class ToDoItem extends Component {
  render() {
    const {title, description} = this.props.toDoItem
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    );
  }
}

export default ToDoItem;
