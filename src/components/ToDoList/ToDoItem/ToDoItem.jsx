import React, { Component } from "react";
// import styles from "./ToDoItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { deleteToDoItem } from "../../../services/toDoItemServices";

class ToDoItem extends Component {

  async handleDeleteItem(){
    let response = await deleteToDoItem(this.props.toDoItem._id);
    console.log(response)
  }

  render() {
    const {title, description} = this.props.toDoItem
    return (
      <div>
        <header>
          <h1>{title}</h1>
          <FontAwesomeIcon icon={faEdit}/>
          <button onClick={() => this.handleDeleteItem()}>Delete this</button>
        </header>
        <article>
          <p>{description}</p>
        </article>
      </div>
    );
  }
}

export default ToDoItem;
