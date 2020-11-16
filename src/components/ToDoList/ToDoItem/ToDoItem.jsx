import React, { Component } from "react";
import styles from "./ToDoItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faCheck, faCheckCircle,  faTimesCircle, faUndo, faPlusCircle} from "@fortawesome/free-solid-svg-icons"
import { deleteToDoItem, updateToDoItem } from "../../../services/toDoItemServices";

class ToDoItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      tagInput: ""
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
    //ToDo: add some validation to inputs before sending them off.
    let title = document.getElementById(`title-${this.props.toDoItem._id}`).innerText;
    let description = document.getElementById(`description-${this.props.toDoItem._id}`).innerText;
    // console.log(description)
    let response = await updateToDoItem({...this.props.toDoItem,title: title, description: description});
    console.log(response);
    this.setState({...this.state,isEditing: false});
  }

  sizeToScrollHeight(e){
    if (e.target.scrollHeight > e.target.clientHeight){
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  }

  toggleComplete = async () => {
    let response = await updateToDoItem({...this.props.toDoItem,complete : !this.props.toDoItem.complete});
    console.log(response);
  }

  handleAddTagSubmit = async (e) => {
    e.preventDefault()
    console.log(await updateToDoItem({...this.props.toDoItem, tags : this.props.toDoItem.tags.length ? [...this.props.toDoItem.tags,this.state.tagInput] : [this.state.tagInput] }))
    this.setState({...this.state, tagInput: ""})
  }

  handleAddTagInput = (e) => {
    this.setState({...this.state, tagInput: e.target.value})
  }

  handleDeleteTag = async (tagToDelete) => {
    console.log(await updateToDoItem({...this.props.toDoItem, tags : this.props.toDoItem.tags.filter(tag => tag!==tagToDelete)}));
  }

  render() {
    const {title, description, _id, complete} = this.props.toDoItem;
    return (
      <div className={`${styles.toDoItem} ${complete ? styles.complete : null} ${this.state.isEditing ? styles.editing : null}`}>

        <header className={styles.header}>
          {/* complete check and title */}
          <div className={styles.title}>
            <span className={styles.faIcon} 
            onClick={ this.toggleComplete}>
              <FontAwesomeIcon icon={ complete ? faUndo : faCheckCircle }/>
            </span>
            <h1 id={`title-${_id}`} 
            contentEditable={ this.state.isEditing ? "true" : "false" }
            suppressContentEditableWarning={true}>
              {title}
            </h1>
          </div>

          {/* edit and delete */}
          <section className={styles.buttons}>
            <span className={styles.faIcon} onClick={ this.state.isEditing ? this.handleFinishEdit : this.handleStartEdit}>
              <FontAwesomeIcon icon={this.state.isEditing ? faCheck : faEdit }/>
            </span> 
            <span className={styles.faIcon} onClick={this.handleDeleteItem}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </section>

        </header>

        {/* tags */}
        <div className={styles.tagContainer}>
          {this.props.toDoItem.tags ? this.props.toDoItem.tags.map(tag => 
            <div className={styles.tag}>
              <p>{tag}</p>
              <span className={styles.tagDeleteIcon} onClick={()=>this.handleDeleteTag(tag)}>
                <FontAwesomeIcon icon={ faTimesCircle }/>
              </span> 
            </div>) 
          : null}
          <form onSubmit={this.handleAddTagSubmit}> 
            <input type="text" value={this.state.tagInput} onInput={this.handleAddTagInput}/>
          </form>
          <span className={styles.tagAddIcon} onClick={this.handleAddTagSubmit}>
            <FontAwesomeIcon icon={ faPlusCircle }/>
          </span>
        </div>

        {/* description */}
        <article className={styles.description}>
          <p id={`description-${_id}`}  
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
