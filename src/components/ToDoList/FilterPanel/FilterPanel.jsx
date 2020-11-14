import React, { Component } from "react";
import styles from "./FilterPanel.module.scss";

class FilterPanel extends Component {
  setParentState = this.props.setState;


  handleStatusInput = e => {
   
    switch (e.target.id) {
      case "all": 
        this.setParentState({filterFn: (i) => true})
        break;
      case "complete":
        this.setParentState({filterFn: (i) => i.complete})
        break;
      case "incomplete":
        this.setParentState({filterFn: (i) => !i.complete})
        break;
      default:
        break;
    }
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
      </section>
    );
  }
}

export default FilterPanel;
