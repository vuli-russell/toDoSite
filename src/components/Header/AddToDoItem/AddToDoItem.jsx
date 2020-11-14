import React, { Component } from "react";
import styles from "./AddToDoItem.module.scss";
import { addToDoItem } from "../../../services/toDoItemServices";
import { connect } from "react-redux";

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
    addToDoItem({...this.state, users: [this.props.user.state.uid]})
    this.setState({
      title:"",description:""
    });
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount(){
    let addItemContainer = document.getElementById("addItem")
    addItemContainer.style.height = `${addItemContainer.scrollHeight}px`;
  }


  render() {
    return (
      <section id="addItem" className={styles.addItem}>
        <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Title" name="title" value={this.state.title} onInput={this.handleInput}/>
          <br/>
            <input type="text" placeholder="Description" name="description" value={this.state.description} onInput={this.handleInput}/>
          <br/>
          <input type="submit"/>
          <button onClick={this.props.closeForm}>Close</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(AddToDoItem);
