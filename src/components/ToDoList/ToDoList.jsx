import React, { Component } from "react";
import styles from "./ToDoList.module.scss";
import ToDoItem from "./ToDoItem";
import { connect } from "react-redux";
import { signIn } from "../../services/userServices";

class ToDoList extends Component {
  render() {
    return (
      <main className={styles.toDoList}>
        {
          this.props.user ?
            this.props.user.state ?
              this.props.toDoItems.length ?
                this.props.toDoItems.map(todo => 
                  <React.Fragment key={todo._id}>
                    <ToDoItem toDoItem={todo} />
                    <hr/>
                  </React.Fragment>
                ) 
            :
            <p>Click the Plus Icon to Add A ToDo Item </p>
            :
            <p>Please <button onClick={signIn}>Sign In</button> To Add ToDo Items</p>
          :
          null
        }
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(ToDoList);