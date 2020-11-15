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
    this.socket = io("https://vuli-todo-list-api.herokuapp.com/")
  }

  componentDidMount(){   
    this._isMounted = true;

    this.socket.on("toDoChange", data => {
      console.log("socket recieved"+data)
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
      this.props.dispatch(update(user ? user.providerData[0]:null))
      if(this.props.user&&this.props.user.state){
        getToDoItems(this.props.user.state.uid)
        .then(r => {
          if(this._isMounted&&r&&r.statusText==="OK"){
            this.setState({toDoItems: r.data})
          }else{
            console.log(r)
          }
        })
      }else{
        this.setState({toDoItems: []})
      }
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
