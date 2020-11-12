import React, { Component } from "react";
import styles from "./ToDoItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { deleteToDoItem } from "../../../services/toDoItemServices";

class ToDoItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      toDoItem: this.props.toDoItem
    }
    // this.handleChange = this.handleChange.bind(this)
  }

  handleDeleteItem= async () => {
    let response = await deleteToDoItem(this.props.toDoItem._id);
    console.log(response)
  }

  handleStartEdit = () => {
    this.setState({isEditing: true});
  }

  handleFinishEdit = async () => {
    //need to write service and api calls for update
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
     toDoItem: {
       ...this.state.toDoItem,
       [e.target.name]: e.target.value
     } 
    })
  }

  render() {
    const {title, description} = this.state.toDoItem;
    return (
      <div>
        <header className={styles.title}>
          { this.state.isEditing ? 
            <input type="text" name="title" value={title} onChange={this.handleChange}/> 
            :
            <h1>{title}</h1>
          }
          <span className={styles.faIcon} onClick={this.handleStartEdit}>
            <FontAwesomeIcon icon={faEdit}/>
          </span>
          <span className={styles.faIcon} onClick={this.handleDeleteItem}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </header>
        <article>
          <p>{description}</p>
        </article>
      </div>
    );
  }
}

export default ToDoItem;
