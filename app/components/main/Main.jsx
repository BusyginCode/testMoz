import React from 'react';
import ReactDOM from 'react-dom';
import FilterBut from '../filtr_but/filtr_but';
import Filter from '../filtr/filtr';
import Content from '../mContent.jsx';

export default class App extends React.Component {

	constructor() {
		super();
		document.title = 'Test shop';
		this.state = {
		  'showType': {
		  	type:'element',
		  	name:'elem_name',
	  	    img_div:'img_div',
	  	    img:'elem_img',
	  	    count:'el_count',
	  	    discont:'el_discont',
	  	    price:'elem_price',
	  	    about:'about'
		  },
		  clickCheck:true
		};
	}

	getShowType = (type) => {
	  this.setState({
	  	clickCheck:type
	  });
	}

	render() {
	  return (
	    <div className = ''>
	     <FilterBut getShowType = {this.getShowType} />
	     {(this.state.clickCheck) ?  <Filter showType = {this.state.showType} />  :  <Content contWidth = {1000} />  }
	    { //if (clickCheck) {
		   //<Filter showType = {this.state.showType} />
		 //} else {
		   //<Content contWidth = {1000} />
		 //}
		}
	    </div>
	  );
	}
};






