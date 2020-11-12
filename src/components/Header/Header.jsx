import React, { Component } from "react";
import AddToDoItem from "./AddToDoItem";
// import styles from "./Header.module.scss";

class Header extends Component {
  state = {
    isAddFormOpen: false
  }

  handleOpenToDoItem(){
    this.setState({ isAddFormOpen: !this.state.isAddFormOpen });
  }

  render() {
    return (
      <>
        <h1>ToDoList</h1>
        <button onClick={() => this.handleOpenToDoItem()}>Add to do item</button>
        {this.state.isAddFormOpen ? <AddToDoItem /> : null}
        
      </>
    );
  }
}

export default Header;
