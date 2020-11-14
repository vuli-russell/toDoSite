import React, { Component } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import { io } from 'socket.io-client';
import { getToDoItems } from "./services/toDoItemServices";
import firebase from "./services/firebase"
import { update } from "./redux/userSlice"
import { connect } from "react-redux";

class App extends Component {
  constructor(){
    super()
    this.state = {
      toDoItems: []
    }
    this.socket = io("http://localhost:8080")
  }

  componentDidMount(){
    this._isMounted = true;
    getToDoItems()
    .then(r => {
      if(this._isMounted&&r&&r.statusText==="OK"){
        this.setState({toDoItems: r.data})
      }else{
        console.log(r)
      }
    })

    this.socket.on("toDoChange", data => {

      switch(data.operationType){
        case "insert":
          this.setState({toDoItems: [...this.state.toDoItems, data.fullDocument]})
          break;
        case "delete":
          this.setState({toDoItems : this.state.toDoItems.filter(item => item._id!==data.documentKey._id)})
          break;
        case "update":
          this.setState({
            toDoItems: this.state.toDoItems.map(i => i._id === data.documentKey._id ? {...i, ...data.updateDescription.updatedFields} : i)
          })
          break;
        default:
          console.log(data)
      }
    })

    //watch user
    firebase.auth().onAuthStateChanged(user => {
      this.props.dispatch(update(user.providerData[0]))
    })
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.socket.disconnect();
  }
  
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <ToDoList toDoItems={this.state.toDoItems}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
