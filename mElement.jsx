import React from 'react';
import Content from './mContent';

export default class Element extends React.Component {
	
	constructor() {
	  super();
	}
	
	render() {
	  return(
	   <div style={{width:this.props.width + '%'}}>
	      <img src = {this.props.img} style={{width:100 + '%',marginTop:-this.props.mT}} />
	      <div className = 'd_show' style={{width:100 + '%'}} >
	        <span>{this.props.name}</span>
	      </div>
	    </div>
	  );
	}
};
