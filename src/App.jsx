import React, { Component } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import { io } from 'socket.io-client';
import { getToDoItems } from "./services/toDoItemServices";
import firebase from "./services/firebase"
import { update } from "./redux/userSlice"
import { connect } from "react-redux";
import {fetchToDoItems, toDoItemInserted, toDoItemDeleted, toDoItemUpdated} from "./redux/toDoSlice";

class App extends Component {
  constructor(){
    super()
    this.state = {
      toDoItems: []
    }
    //change before deploy
    // this.socket = io("https://vuli-todo-list-api.herokuapp.com/")
    this.socket = io("http://localhost:8080/")
  }

  componentDidMount(){   
    this._isMounted = true;

  //listen for mongodb changes via socket
    this.socket.on("toDoChange", data => {
      console.log("socket recieved"+data)
      switch(data.operationType){
        case "insert":
          this.setState({toDoItems: [...this.state.toDoItems, data.fullDocument]})
          this.props.dispatch(toDoItemInserted(data.fullDocument))
          break;
        case "delete":
          this.setState({toDoItems : this.state.toDoItems.filter(item => item._id!==data.documentKey._id)})
          this.props.dispatch(toDoItemDeleted(data.documentKey._id))
          break;
        case "update":
          this.setState({toDoItems: this.state.toDoItems.map(i => i._id === data.documentKey._id ? {...i, ...data.updateDescription.updatedFields} : i)})
          this.props.dispatch(toDoItemUpdated({_id:data.documentKey._id,updatedFields: data.updateDescription.updatedFields}))
          break;
        default:
          console.log(data)
      }
    })

    //watch user
    firebase.auth().onAuthStateChanged(user => {
      this.props.dispatch(update(user ? user.providerData[0]:null))
      if(this.props.user&&this.props.user.state){
        this.props.dispatch(fetchToDoItems(this.props.user.state.uid));
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
    user: state.user,
    toDos : state.toDos 
  }
}

export default connect(mapStateToProps)(App);
