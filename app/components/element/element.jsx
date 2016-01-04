import React from 'react';
import Content from '../content/content';

export default class Element extends React.Component {
	
	constructor() {
	  super();
	  this.dipslayName = 'Element';
	}
	
	render() {;
	  return(
	    <div className = {this.props.showType.type}>
		  <a href = {this.props.hr} >
		    <h3 className = {this.props.showType.name}>{this.props.name}</h3>
		    <div className = {this.props.showType.img_div}>
		      <img src = {this.props.img_s} className = {this.props.showType.img} />
		    </div>
		    <div className={this.props.showType.about}>
		      <div className = {this.props.showType.count}>
		        Кол-во на складе: {this.props.count}
		      </div>
		      <div className = {this.props.showType.discont}>
		        Скидка: {(this.props.deal) ?  'Есть '  :  'Нет'  } 
		      </div>
		      <h5 className = {this.props.showType.price}>Цена: {this.props.price}</h5>
		    </div>
		  </a>
		</div>
	  );
	}
};
