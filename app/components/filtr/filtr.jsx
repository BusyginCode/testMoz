import React from 'react'
import Content from '../content/content';
import Input from '../input/input';

export default class Filter extends React.Component {
	
	constructor() {
	  super();
	  this.displayName = 'Filtr';
	  var urlVal = this.getUrl();
	  this.state = {
	  	locationFiltr: {
	  	  count: urlVal.count ? parseInt(urlVal.count) : 0,
	  	  min: urlVal.min ? parseFloat(urlVal.min) : 0,
	  	  max: urlVal.max ? parseFloat(urlVal.max) : 0,
	  	  name: urlVal.name || '',
	  	  diskont: urlVal.diskont ? true : false,
	  	  renderCount: urlVal.renderCount ? parseInt(urlVal.renderCount) : 3,
	  	  oldRenderCount: urlVal.oldRenderCount ? parseInt(urlVal.oldRenderCount) : 3
	  	}
	  };
	}

	getNumbers = (a,b) => {
	  this.setFiltr('min',a);
	  this.setFiltr('max',b);
	  this.returnRenterCount();
	}

	check = (c) => {
	  this.setFiltr('diskont', c);
	  this.returnRenterCount();
	}

	getCount = (count) => {
	  this.setFiltr('count', count);
	  this.returnRenterCount();
	}

	getName = (name) => {
	  this.setFiltr('name', name);
	  this.returnRenterCount();
	}

	setFiltr = (key, val) => {
	  var currentObj = this.state.locationFiltr;
	  currentObj[key] = val;
	  this.setState({locationFiltr: currentObj});
	  history.pushState(null, null, '/' + this.setUrl(currentObj));
	}

	getUrl = () => {
	  var query = location.search.substr(1);
      var result = {};
      if (query.length) {
        query.split("&").forEach(function(part) {
          var item = part.split("=");
          result[item[0]] = decodeURIComponent(item[1]);
        });
        return result
      } else {
  	    return false;
      }
	}

	setUrl = (obj) => {
	  var result = '?';
	  for (var i in obj) {
	  	if (obj[i]) {
	  	  result = result + i + '=' + obj[i] + '&';
	    }
	  }
	  result = result.substring(0, result.length - 1);
	  return result
	}

	showMore = () => {    //add render count
	  var currentObj = this.state.locationFiltr;
	  currentObj['renderCount'] = currentObj['renderCount'] + 3;
	  this.setFiltr('renderCount', currentObj['renderCount']);
    }

    returnRenterCount = () => {
    	this.setFiltr('renderCount', 3);
    }

	render() {
	  return (
	    <div className = 'filtr'>	
	      <Input getNumbers={this.getNumbers} check = {this.check} setName = {this.getName} setCount = {this.getCount} filtrObject = {this.state.locationFiltr} getUrl = {this.getUrl} />	
		  <Content filtrObject = {this.state.locationFiltr} setFiltr = {this.setFiltr} showType = {this.props.showType} />
		   <div className='show_cont'>
		    <a id = 'show_but' onClick = {this.showMore}>Показать еще</a>
		  </div>
		</div>
	  );
	}
};

