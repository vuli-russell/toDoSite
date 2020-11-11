import React, { Component } from "react";
// import styles from "./ToDoList.module.scss";
import ToDoItem from "./ToDoItem";
import { getToDoItems } from "../../services/toDoItemServices";

class ToDoList extends Component {

  state = {
    toDoItems: []
  }

  componentDidMount(){
    this._isMounted = true;
    getToDoItems()
    .then(r => {
      if(this._isMounted&&r&&r.statusText==="OK"){
        this.setState({toDoItems: r.data})
      }else{
        //do something with this error
        console.log(r)
      }
    })
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        
        {this.state.toDoItems.map(todo => <ToDoItem key={todo._id} toDoItem={todo} />)}
      </div>
    );
  }
}

export default ToDoList;
