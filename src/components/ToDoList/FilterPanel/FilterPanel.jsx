import React, { Component } from "react";
import styles from "./FilterPanel.module.scss";

class FilterPanel extends Component {

  //storing in state allows one checkbox to be selected by default. 
  //Setting default in jsx causes it to reset to the selected one on rerender? i think
  state={
    isFirstSelection: true
  }

  handleStatusInput = e => {
    //set to flase to allow buttons to be selected per click with no defaults after first select
    this.setState({isFirstSelection: null})
    this.statusFilterSelected = e.target.id;
    switch (e.target.id) {
      case "all": 
        this.props.setParentState({...this.props.parentState,statusFilterFn: (i) => true})
        break;
      case "complete":
        this.props.setParentState({...this.props.parentState,statusFilterFn: (i) => i.complete})
        break;
      case "incomplete":
        this.props.setParentState({...this.props.parentState,statusFilterFn: (i) => !i.complete})
        break;
      default:
        break;
    }
  }

  handleSearchContentInput = e => {
    const searchStr = (e.target.value)
    this.props.setParentState({
      ...this.props.parentState,
      contentFilterFn: (i) => i.title.match(new RegExp(searchStr,"i"))
      ||i.description.match(new RegExp(searchStr,"i"))
      ||i.tags.some(tag => tag.match(new RegExp(searchStr,"i")))
      // contentFilterFn: (i) => false
    })
  }  
  
  render() {
    return (
      <section className={styles.filters}>     
          <input type="radio" name="statusFilter" id="all" checked={this.state.isFirstSelection} onChange={this.handleStatusInput}/>
          <label htmlFor="all">All</label>          
          <input type="radio" name="statusFilter" id="complete" onChange={this.handleStatusInput}/>
          <label htmlFor="complete">Complete</label>
          <input type="radio" name="statusFilter" id="incomplete" onChange={this.handleStatusInput}/>
          <label htmlFor="incomplete">Incomplete</label>
          <input type="text" placeholder="Search Content" onInput={this.handleSearchContentInput}/>
      </section>
    );
  }
}

export default FilterPanel;
