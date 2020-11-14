import React, { Component } from "react";
import AddToDoItem from "./AddToDoItem";
import styles from "./Header.module.scss";
import { signIn, signOut } from "../../services/userServices";

import { connect } from "react-redux";

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAddFormOpen: false
    }
  }

  handleOpenToDoItem(){
    this.setState({ isAddFormOpen: !this.state.isAddFormOpen });
  }

  render() {
    return (
      <>
      <header className = {styles.header}>
        <h1>ToDoList</h1>
        <div className={styles.headerButtons}>
          {this.props.user ? 
            <>
              <button onClick={() => this.handleOpenToDoItem()}>Add to do item</button>
              <p>{this.props.user.state.displayName}</p>
              <img src={this.props.user.state.photoURL} alt="profile"/>
              <button onClick={signOut}>SignOut</button>
            </>
            : 
            <button onClick={signIn}>Sign In</button> }
        </div>
      </header>
      {this.state.isAddFormOpen ? <AddToDoItem /> : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(Header);
