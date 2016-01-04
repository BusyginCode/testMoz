import React from 'react';
import Filtr from '../filtr/filtr';

export default class Input extends React.Component {

	constructor() {
	  super();
      this.state = { 
	  	min: 0,
	  	max: 0
      }
	}

	min_seach = (e) => {		//validation min value
	  var v = this.validation(e);
	    if ((this.state.max) && parseFloat(v) > this.state.max) {
		  e.target.value = this.state.max - 0.01;
		  this.setState({min: this.state.max - 0.01});
		  this.props.getNumbers(this.state.max - 0.01, this.state.max);
		  e.target.className = 'valid';
		} else {
		    if (v) {
			  e.target.className = 'valid';
			  this.setState({min: v});
			  this.props.getNumbers(v, this.state.max);
			} else {
				this.setState({min: ''});
				e.target.className = '';
			    if (this.state.max) {
			      this.props.getNumbers(0, this.state.max);
				} 
			}
		}
	}

	max = (e) => {			// validation max value 
	  var max = this.validation(e),
	    min = this.state.min;
	  if (parseFloat(max) >= parseFloat(min)) {
	    e.target.className = 'valid';
	    this.props.getNumbers(min, max);
	    this.setState({max: max});
	  } else {
		  if (max) {
			e.target.className = 'invalid';
			this.setState({max: max});
			this.props.getNumbers(min, max);
		  } else {
			  e.target.className = '';
			  this.setState({max: ''});
			  this.props.getNumbers(min, max);
		  }
	  }
	}

	validation = (e) => {		// easily validation
	  var val = e.target.value;
	  if ((val) && (val >= 0) && (val < 1000000)) {
	    e.target.className = 'valid';
		return (val);
	  } 
	}

	clearDefaultVal = (e) => {	// clear inputs
	  if (e.target.value == 0) e.target.value = '';
	}

	check = () => {			// set checkbox value
	  if (document.getElementById('deal_input').checked) {
	    this.props.check(true);
	  } else { 
		this.props.check(false);
	  }
	}

	componentDidMount = () => {		// view values from url after restarting a page 
	  document.getElementById('deal_input').checked = this.props.filtrObject.diskont;
	  this.setRestartSettings('max', 'max');
	  this.setRestartSettings('min', 'min');
	  this.setRestartSettings('s_input', 'name');
	  this.setRestartSettings('c_input', 'count');
	  this.setState({
	  	max: this.props.filtrObject.max,
	  	min: this.props.filtrObject.min,
	  	name: this.props.filtrObject.name,
	  	count: this.props.filtrObject.count
	  });
	}

	setRestartSettings = (path,val) => {
	  document.getElementById(path).value = this.props.filtrObject[val];
	}

	getName = (e) => {
	  this.props.setName(e.target.value);
	}

	getCount = (e) => {
	  var val = e.target.value;
		  val = parseFloat(val);
		  if ((val) && (val > 0) && (val < 1000000)) {
			this.props.setCount(val);
		  } else {
		  	this.props.setCount(val);
		  }
	}

	render() {
		return (
          <div id='input_box'>
            <div>
              <label htmlFor = 'min'>Цена товара: </label>
            </div>
			<input type = "text" id = 'min' step = "0.01" placeholder = 'от' value = {this.state.min} onChange = {this.min_seach} onFocus = {this.clearDefaultVal} />
            <span className = 'to'> : </span>
            <input type = "text" step = "0.01" id = 'max' placeholder = 'до' value = {this.state.max} onChange = {this.max} onFocus = {this.clearDefaultVal} />
            <div className = 'secLab'>
              <label htmlFor = 'deal_input'>Наличие скидки: </label>
            </div>
            <input type = "checkbox" id='deal_input' onClick ={this.check} />
            <div>
              <label htmlFor = 's_input'>Название: </label>
            </div>
            <input type = "text" id='s_input' maxLength = "15" onChange = {this.getName} />
            <div className = 'secLab'>
              <label htmlFor = 's_input'>Количество: </label>
            </div>
            <input type = "number" step="any" maxLength = "15" onChange = {this.getCount} id = "c_input" />
          </div>
    	);
  	}
};




