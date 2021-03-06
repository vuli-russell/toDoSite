import React, { Component } from "react";
import styles from "./ToDoList.module.scss";
import ToDoItem from "./ToDoItem";
import FilterPanel from "./FilterPanel";
import { connect } from "react-redux";
import { signIn } from "../../services/userServices";

class ToDoList extends Component {
  state = {
    statusFilterFn: (i) => true,
    contentFilterFn: (i) => true,
  }
  
  render() {
    const toDoItems = this.props.todos;
    return (
      <main className={styles.toDoList}>
        {
          this.props.user ?
            toDoItems.length ?
              (
                <>
                  <FilterPanel parentState={this.state} setParentState={this.setState.bind(this)}/>
                  {toDoItems
                  .filter(this.state.statusFilterFn)
                  .filter(this.state.contentFilterFn)
                  .sort((a,b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated))
                  .map(todo => 
                    <React.Fragment key={todo._id}>
                      <hr/>
                      <ToDoItem toDoItem={todo} />
                    </React.Fragment>
                  )}
                </>
              ) 
            :
            <p>Click the Plus Icon to Add A ToDo Item </p>
          :
          <p>Please <button onClick={signIn}>Sign In</button> To Add ToDo Items</p>
        }
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    todos: state.todos
  }
}

export default connect(mapStateToProps)(ToDoList);