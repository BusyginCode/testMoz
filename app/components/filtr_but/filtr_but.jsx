import React from 'react';

export default class FiltrBut extends React.Component {
	
	constructor() {
	  super();
	  this.state = {
	  	clickCheck: false};
	}
	click = () => {		// content transformation
	  var f = document.getElementById('input_box'),
	    c = document.getElementById('content'),
	    b = document.getElementById('show_but');
	  if (this.state.clickCheck) {
	    f.style.display = 'none';
		c.className = 'content_normal';
		b.className = '';
		this.setState({clickCheck: false});
	  } else {
		  f.style.display = 'block';
		  c.className = 'content_f';
		  b.className = 'marginButton';
		  this.setState({clickCheck: true});
		}
	}

	changeShowStyleM = () => {
	 // this.props.getShowType('element_mozaik', 'elem_name_m', 'img_div_m', 'elem_img_m', 'el_count_m', 'el_discont_m', 'elem_price_m','about_m');
	this.props.getShowType(false);
	}

	changeShowStyleN = () => {
	  this.props.getShowType(true);
	  //this.props.getShowType('element', 'elem_name', 'img_div', 'elem_img', 'el_count', 'el_discont', 'elem_price','about');
	}

	render() {
	  return (
	    <div className='f_b_div'>
		  <a className='filtr_but' onClick={this.click} >Фильтр</a>
		  <span className='change_show_style'>
		    <a className='mozaik_show_but change_show' onClick = {this.changeShowStyleM} >M</a>	
		    <a className='normal_content_show change_show' onClick = {this.changeShowStyleN} >N</a>		
		  </span>
		  <hr />
		</div>	
	  );
	}
};
