import React from 'react';

export default class Content extends React.Component {
	
	constructor() {
	  super();
	  this.defaultProps = {
	  	i:0,
	    j:0
	  };
	  this.state = {
        data: {
          "products":[]
        }
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

    calculateFiltr = () => {              //fields filtration
      var mount_content = this.state.data.products;
      var contWidth = this.props.contWidth,
      	renderWidth = 0,
      	elemWidth = 0,
      	colRender=0,
      	renderElem = {},
      	renderElements=[];
	  var filtr = mount_content.map((datum) => { 
	  	this.defaultProps.i++;
	  	if (renderWidth >= contWidth) {
	  	  renderWidth = 0;
	  	  colRender = 0;
	  	  colRender+=1;
	  	  renderElements=[];
	  	  renderWidth+=datum.width;
	  	  renderElem = <div id='this.defaultProps.i' style={{width:datum.width + 'px'}} className='first' >
	      	  			<img src = {datum.img} id={this.defaultProps.i} style={{width:datum.width + 'px'}} />
	      	  			<div className = 'd_show'  style={{width:datum.width + 'px'}} >
	      	  			  <span>{datum.name}c</span>
	      	  			</div>	
	        		   </div>;
	      renderElements.push(renderElem);
	  	  return (
	        renderElem
	  	  );	     
	  	} else {
	  	  if (datum.width <= (contWidth - renderWidth)) {
	  	    renderWidth+=datum.width;
	  	    colRender+=1;
	  	    renderElem = <div id='this.defaultProps.i' style={{width:datum.width + 'px'}} >
	      	  			  <img src = {datum.img} id={this.defaultProps.i} style={{width:datum.width + 'px'}} />
	      	  			  <div className = 'd_show' style={{width:datum.width + 'px'}} >
	      	  			    <span>{datum.name}</span>
	      	  			  </div>
	        		     </div>;
	        renderElements.push(renderElem);
	  	    return (
	          renderElem
	  	    );	
	  	  } else {
	  	  	elemWidth = contWidth - renderWidth;
	  	  	var coeficientW = elemWidth / renderElements.length;
	  	  	if (datum.width > elemWidth && (datum.width - (contWidth - renderWidth) > 100)) {
	  	  		//растягиваем картинки
	  	  		for (var i in renderElements) {
	  	  		  renderElements[i].props.style.width = parseFloat(renderElements[i].props.style.width) + coeficientW + 'px';
	  	  		  console.log(renderElements[i]);
	  	  		  renderElements[i].props.children[0].props.style.width = parseFloat(renderElements[i].props.children[0].props.style.width) + coeficientW + 'px';
	  	  		  renderElements[i].props.children[1].props.style.width = parseFloat(renderElements[i].props.children[1].props.style.width) + coeficientW + 'px';
	  	  		} 
	  	  		renderWidth = 0;
	  	  		renderElements=[];
	  	  		renderWidth+=datum.width;
	  	  		renderElem = <div id='this.defaultProps.i' style={{width:datum.width + 'px'}} className='first' >
	      	  			       <img src = {datum.img} id={this.defaultProps.i} style={{width:datum.width + 'px'}} />
	      	  			       <div className = 'd_show' style={{width:datum.width + 'px'}} >
	      	  			         <span>{datum.name}</span>
	      	  			       </div>
	        		         </div>;
	            renderElements.push(renderElem);
	            return (renderElem);
	  	  	} else {
	  	  	  var coeficientR = (datum.width - elemWidth) / renderElements.length;
			  for (var i in renderElements) {
	  	  			renderElements[i].props.style.width = parseFloat(renderElements[i].props.style.width) - coeficientR + 'px';
	  	  			renderElements[i].props.children[1].props.style.width = renderElements[i].props.style.width
	  	  			//renderElements[i].props.children.props.style.width = parseFloat(renderElements[i].props.children.props.style.width) - coeficientW + 'px';
	  	  		} 
	  	  		renderWidth+=datum.width;
	  	  		renderElem = <div id='this.defaultProps.i' style={{width:datum.width + 'px'}}>
	      	  			       <img src = {datum.img} id={this.defaultProps.i} style={{width:datum.width + 'px'}} />
	      	   					<div className = 'd_show' style={{width:datum.width + 'px'}} >
	      	   					  <span>{datum.name}</span>
	      	   					</div>
	        		         </div>;
	            renderElements.push(renderElem);
	            return (renderElem);
	  	    }	
	  	  }
	  	}   
	  });
	  return filtr;
    }

	render() {
	  return (
	    <div id = 'content_m' style={{width:this.props.contWidth + 'px'}} >
		  {this.calculateFiltr()}	 
		</div>				
	  );
	}
};

