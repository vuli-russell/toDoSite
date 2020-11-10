import React, { Component } from "react";
// import styles from "./ToDoList.module.scss";
import ToDoItem from "./ToDoItem";
import { getToDoItems } from "../../services/toDoItemServices";

class ToDoList extends Component {

  state = {
    toDoItems: []
  }

  componentDidMount(){
    console.log("mounting")
    this._isMounted = true;
    getToDoItems()
    .then(r => {
      if(this._isMounted){
        this.setState({toDoItems: r})
      }
    })
  }

  componentWillUnmount(){
    console.log("unmounting")
    this._isMounted = false;
  }

  render() {
    return (
      <>
        {this.state.toDoItems.map(todo => <ToDoItem key={todo._id} toDoItem={todo} />)}
      </>
    );
  }
}

export default ToDoList;
