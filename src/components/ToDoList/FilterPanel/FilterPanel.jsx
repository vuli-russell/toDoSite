import React, { Component } from "react";
import styles from "./FilterPanel.module.scss";

class FilterPanel extends Component {
  
  parentState = this.props.parentState;
  setParentState = this.props.setParentState;


  handleStatusInput = e => {
    switch (e.target.id) {
      case "all": 
        this.setParentState({...this.parentState,statusFilterFn: (i) => true})
        break;
      case "complete":
        this.setParentState({...this.parentState,statusFilterFn: (i) => i.complete})
        break;
      case "incomplete":
        this.setParentState({...this.parentState,statusFilterFn: (i) => !i.complete})
        break;
      default:
        break;
    }
  }

  handleSearchInput = e => {
    const searchStr = (e.target.value)
    this.setParentState({
      ...this.parentState,
      textFilterFn: (i) => i.title.match(new RegExp(searchStr,"i"))||i.description.match(new RegExp(searchStr,"i"))
    })
  }

  
  
  render() {
    return (
      <section className={styles.filters}>     
          <input type="radio" name="statusFilter" id="all" onChange={this.handleStatusInput}/>
          <label htmlFor="all">All</label>          
          <input type="radio" name="statusFilter" id="complete" onChange={this.handleStatusInput}/>
          <label htmlFor="complete">Complete</label>
          <input type="radio" name="statusFilter" id="incomplete" onChange={this.handleStatusInput}/>
          <label htmlFor="incomplete">Incomplete</label>
          <input type="text" placeholder="Search Content" onInput={this.handleSearchInput}/>
      </section>
    );
  }
}

export default FilterPanel;
