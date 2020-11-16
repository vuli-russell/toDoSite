import React, { Component } from "react";
import AddToDoItem from "./AddToDoItem";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn, signOut } from "../../services/userServices";

import { connect } from "react-redux";

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAddFormOpen: false
    }
  }

  handleToggleAddForm = () =>{
    this.setState({ isAddFormOpen: !this.state.isAddFormOpen });
  }


  render() {
    return (
      <>
      <header className = {styles.header}>
        <h1>ToDoList</h1>
        <div className={styles.headerButtons}>
          {this.props.user&&this.props.user.state ? 
            <>
              <div className={styles.faIcon} onClick={this.handleToggleAddForm}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className={styles.user}>
                <p>{this.props.user.state.displayName}</p>
                <img src={this.props.user.state.photoURL} alt="profile" id="profileImg"/>
                <div className={styles.faIcon} onClick={signOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
              </div>
            </>
            : 
            <div className={styles.faIcon} onClick={signIn}>
              <FontAwesomeIcon icon={faGoogle} />
            </div>}
        </div>
      </header>
      {this.state.isAddFormOpen ? <AddToDoItem closeForm={this.handleToggleAddForm}/> : null}
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
