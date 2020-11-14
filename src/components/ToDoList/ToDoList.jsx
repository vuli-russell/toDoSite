import React, { Component } from "react";
import styles from "./ToDoList.module.scss";
import ToDoItem from "./ToDoItem";
import FilterPanel from "./FilterPanel";
import { connect } from "react-redux";
import { signIn } from "../../services/userServices";

class ToDoList extends Component {
  state = {
    filterFn: (i) => true,
  }
  render() {

    const toDoItems = this.props.toDoItems;
    console.log(toDoItems)
    return (
      <main className={styles.toDoList}>
        {
          this.props.user ?
            this.props.user.state ?
              toDoItems.length ?
                (
                  <>
                    <FilterPanel setState={this.setState.bind(this)}/>
                    {toDoItems.filter(this.state.filterFn).sort((a,b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated)).map(todo => 
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
          :
          <p>Loading...</p>
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