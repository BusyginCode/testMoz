import React from 'react';
import Element from '../element/element';
import Inputs from '../input/input.jsx';
import Filtr from '../filtr/filtr.jsx';

export default class Content extends React.Component {
	
	constructor() {
	  super();
	  this.dipslayName = 'Content';
	  this.defaultProps = {
	  	i:0,
	    j:0
	  };
	  this.state = {
      min:0,
      max:0,
      data: {
        "products":[]
      },
      countRender: 3, 
      filtr:[],
      old_count:0
    };
	}

	ajax = (url) => {      // ajax request
      var request = new XMLHttpRequest(),
    	  self = this;
      request.open('GET', url, true);
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            // Success!
          self.setState({data: JSON.parse(request.responseText)});
        } 
    };
      request.send();
    }

    componentWillMount = () => {    // call ajax request 
      this.ajax('http://localhost:3000/products/');
    }

    componentDidUpdate = () => {    // show/hint button 
      if ((this.defaultProps.j <= this.defaultProps.i)) {
        document.getElementById('show_but').style.display = 'none';
      } else {
      	document.getElementById('show_but').style.display = 'inline';
      }
    }

    calculateFiltr = () => {              //fields filtration
      var min = this.props.filtrObject.min;
	  var max = this.props.filtrObject.max,
	      mount_content = this.state.data.products;
	      this.defaultProps.i = 0;
	      this.defaultProps.j = 0;
	  var filtr = mount_content.map((datum) => {
	 	if ((datum.deals == this.props.filtrObject.diskont) || (!this.props.filtrObject.diskont)) {
	 	  if ((datum.count == this.props.filtrObject.count) || (!this.props.filtrObject.count)) {
	 	  	if ((datum.price < max) && (datum.price > min) || (!this.props.filtrObject.max)) {
	 	  	  if ((datum.price > min) || (!this.props.filtrObject.min)) {
	 	  	  	if ((datum.name.indexOf(this.props.filtrObject.name)+1) || (!this.props.filtrObject.name)) {
	 	  	  	  ++this.defaultProps.j;
	 	  	  	  if (this.defaultProps.i < this.props.filtrObject.renderCount) {
	  		        ++this.defaultProps.i;
	                return (
	    	          <Element name = {datum.name} img_s = {datum.img} price = {datum.price} count = {datum.count} deal = {datum.deals} showType = {this.props.showType} />
	  		        );
	  		      }
	  		    }
	  		  }
	 	    }
	      } 
	    } 
	  });
	  return this.showHint(filtr, this.defaultProps.i);
    }

    showHint = (filtr,i) => {
      if (i) {
      	return filtr;
      } else {
      	return (
      	  <div id = 'hint'>
		  	<h2>Нет подходящего контента</h2>
		  </div>
      	);
      }
    }

	render() {
	  return (
	    <div id = 'content' className = 'content_normal'>
		  {this.calculateFiltr()}	 
		</div>				
	  );
	}
};

