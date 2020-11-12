import React, { Component } from "react";
// import styles from "./AddToDoItem.module.scss";
import { addToDoItem } from "../../../services/toDoItemServices";

class AddToDoItem extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  
  state = {
    title: "",
    description: ""
  }

  handleSubmit(e) {
    e.preventDefault();
    addToDoItem(this.state)
    this.setState({
      title:"",description:""
    });
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onInput={this.handleInput}/>
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onInput={this.handleInput}/>
          </label>
          <input type="submit"/>
        </form>
      </>
    );
  }
}

export default AddToDoItem;
