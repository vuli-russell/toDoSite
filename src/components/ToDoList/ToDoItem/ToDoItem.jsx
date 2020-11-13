import React, { Component } from "react";
import styles from "./ToDoItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons"
import { deleteToDoItem, updateToDoItem } from "../../../services/toDoItemServices";

class ToDoItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
    }
  }

  //to do item is passed as props and then stored in state so it can be used to give value to form items during editing.
  //ToDO: state needs to update when props change, to matchn any incoming data, but setting a state change in will udpate causes loop
  //this will be important for dream goal of multiple users having access to a todo item and updating it
  //ToDo: think about locking out items that are being editied to prevent two edits overwriting each other.

  handleDeleteItem= async () => {
    let response = await deleteToDoItem(this.props.toDoItem._id);
    console.log(response)
  }

  handleStartEdit = () => {
    this.setState({isEditing: true});
  }

  handleFinishEdit = async () => {
    let description = document.getElementById("description").innerText;
    let title = document.getElementById("title").innerText;
    // console.log(description)
    let response = await updateToDoItem({...this.props.toDoItem,title: title, description: description})
    console.log(response)
    this.setState({isEditing: false})
  }

  sizeToScrollHeight(e){
    if (e.target.scrollHeight > e.target.clientHeight){
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  }

  render() {
    const {title, description} = this.props.toDoItem;
    return (
      <div>
        <header className={styles.title}>
          <h1 id="title" 
          contentEditable={ this.state.isEditing ? "true" : "false" }
          suppressContentEditableWarning={true}>
            {title}
          </h1>
          <span className={styles.faIcon} onClick={ this.state.isEditing ? this.handleFinishEdit : this.handleStartEdit}>
            <FontAwesomeIcon icon={this.state.isEditing ? faCheck : faEdit }/>
          </span> 
          <span className={styles.faIcon} onClick={this.handleDeleteItem}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </header>

        <article className={styles.description}>
          <p id="description" 
          contentEditable={ this.state.isEditing ? "true" : "false" } 
          suppressContentEditableWarning={true}>
            {description}
          </p>
        </article>
      </div>
    );
  }
}

export default ToDoItem;
