import React from 'react';
import Element from './mElement.jsx';


export default class ContentM extends React.Component {
    
    constructor() {
      super();
    }

    renderElemF = (i,width,img,name,ElWperB,dHeight,borderLeft,mT) => {
      return ({
        marginTop:mT,
        width:width,
        imgWidth:width,
        id:i,
        img:img,
        name:name,
        ElWidPerc:ElWperB,
        height:dHeight,
        borderLeft:borderLeft
      });
      //marginTop: (dHeight > this.props.height + this.props.height / 5) ? (-dHeight / 4) : (dHeight < this.props.height / 100 * 70) ? (dHeight / 4) : 0 + 'px',
    }

    calculateFiltr = () => {              //fields filtration
      var mount_content = this.props.products;
      var contWidth = (document.body.offsetWidth-15) / 100 * this.props.contWidth,
        renderWidth = 0,
        elemWidth = 0,
        renderElem = {},
        renderElements=[],
        i = 0,
        filtr = [],
        ElWperB = (document.body.offsetWidth-15) / 100 * this.props.contWidth / 100;
      for(var f = 0; f < mount_content.length-1; f++) {
        if (renderWidth >= contWidth && mount_content[f].width < contWidth) {
          renderWidth = 0;
          i = 0;
          renderWidth += mount_content[f].width;
          renderElem = this.renderElemF(i, 
                                        mount_content[f].width / ElWperB, 
                                        mount_content[f].img, 
                                        mount_content[f].name, 
                                        ElWperB, 
                                        mount_content[f].height,
                                        0,
                                        0);
          i++;
          filtr.push(renderElem);       
        } else {
          if (mount_content[f].width <= (contWidth - renderWidth)) {
            renderWidth+=mount_content[f].width;
            renderElem = this.renderElemF(i, 
                                          mount_content[f].width / ElWperB, 
                                          mount_content[f].img, 
                                          mount_content[f].name, 
                                          ElWperB, 
                                          mount_content[f].height,
                                          15,
                                          0);
            i++;
            filtr.push(renderElem);     
          } else {
            elemWidth = contWidth - renderWidth;
            var coeficientW = elemWidth / i / ElWperB,
             dW = 0;
             if (mount_content[f].width / ElWperB > 100) {
               dW = contWidth;
             } else {
               dW = mount_content[f].width;
             }
             for (var j = i; j > 0; j--) {
               var lastW = filtr[filtr.length - j].width,
                   lastWPer = lastW / 100;
               filtr[filtr.length - j].width = filtr[filtr.length - j].width + coeficientW;  
               var sub = (filtr[filtr.length - j].width - lastW) / lastWPer,
                   mT = ((filtr[filtr.length - j].height / 100) * sub) / 2
             } 
             i = 0;
             i++; 
             renderWidth = 0;
             renderWidth+=dW;
             renderElem = this.renderElemF(i, 
                                          dW / ElWperB, 
                                          mount_content[f].img, 
                                          mount_content[f].name, 
                                          ElWperB, 
                                          mount_content[f].height,
                                          0,
                                          mT);
             filtr.push(renderElem); 
          }
        }
      }
      return this.preRender(filtr);
    }

    componentDidMount = () => {
      var t = this;
      document.body.onresize = function() {
        t.forceUpdate();
      };
    }

    preRender = (filtr) => {
      var res = [];
      for (var t = 0; t <= filtr.length-1; t++) {
        res.push(<Element width = {filtr[t].width} img = {filtr[t].img} name = {filtr[t].name} mT = {filtr[t].marginTop} />);
      }
      return res;
    }

    render() {
      return (
        <div id="content_m" style={{width:this.props.contWidth + '%'}}>
          {this.calculateFiltr()}
        </div>              
      );
    }
};



/*
elemWidth = contWidth - renderWidth;
            var coeficientW = elemWidth / renderElements.length / ElWperB;
            if (datum.width > elemWidth && (datum.width - (contWidth - renderWidth) > ElWperB * 10)) {
              if (datum.width / ElWperB > 100) {
                datum.width = contWidth;
                renderWidth+=datum.width;
                renderElem = this.renderElemF(i, datum.width, datum.img, datum.name, ElWperB, datum.height);
                renderElements.push(renderElem);
                return (renderElem);
              }
              //растягиваем картинки
              for (var i in renderElements) {
                renderElements[i].props.style.width = parseFloat(renderElements[i].props.style.width) + coeficientW + '%';  
                //(renderElements[i].style.height > this.props.height) ? renderElements[i].style.marginTop = -renderElements[i].style.height / 4  : 0 + 'px';
              } 
              renderWidth = 0;
              renderElements=[];
              renderWidth+=datum.width;
              renderElem = this.renderElemF(i, datum.width, datum.img, datum.name, ElWperB, datum.height);
              renderElem.props.style.borderLeft = 0;
              renderElements.push(renderElem);
              return (renderElem);
            } 
else {  cut img
                var coeficientR = (datum.width - elemWidth) / renderElements.length / ElWperB;
                for (var i in renderElements) {
                  renderElements[i].props.style.width = (parseFloat(renderElements[i].props.style.width) - coeficientR) + '%';
                } 
                renderWidth+=datum.width;
                renderElem = this.renderElemF(i, datum.width, datum.img, datum.name, ElWperB);
                renderElements.push(renderElem);
                return (renderElem);
            }   











showHint = (filtr,i) => {     
      if (i) {
        if (this.props.clickCheck) {
          return ( <div id = 'content' className = 'content_normal'>
             {filtr}   
           </div> 
      );
        } else {
          return (<ContentM products = {filtr} contWidth = {78} height = {300} />);
        }
      } else {
        return (
          <div id = 'hint'>
        <h2>Нет подходящего контента</h2>
      </div>
        );
      }
  }












    renderElemF = (i,width,img,name,ElWperB,dHeight) => {
      return (<div id={i} style={{width:width / ElWperB + '%', height:this.props.height + 'px'}}>
                <img src = {img} id={i} style={{ width:100 + '%'}} />
                <div className = 'd_show' style={{width:100 + '%'}} >
                  <span>{name}</span>
                </div>
              </div>
      );
      //marginTop: (dHeight > this.props.height + this.props.height / 5) ? (-dHeight / 4) : (dHeight < this.props.height / 100 * 70) ? (dHeight / 4) : 0 + 'px',
    }

             var filtr = mount_content.map((datum) => { 
        i++;
        console.log(filtr[0]);
        var ElWperB = (document.body.offsetWidth-15) / 100 * this.props.contWidth / 100;
        if (renderWidth >= contWidth && datum.width < contWidth) {
          renderWidth = 0;
          renderElements=[];
          renderWidth+=datum.width;
          renderElem = this.renderElemF(i, datum.width, datum.img, datum.name, ElWperB, datum.height);
          console.log(renderElem);
          console.log(<Element width = {datum.width} img = {datum.img} i = {i} name = {datum.name} />);
          renderElem.props.style.borderLeft = 0;
          renderElements.push(renderElem);
          return (renderElem);       
        } else {
          if (datum.width <= (contWidth - renderWidth)) {
            renderWidth+=datum.width;
            renderElem = this.renderElemF(i, datum.width, datum.img, datum.name, ElWperB, datum.height);
            renderElements.push(renderElem);
            return (renderElem);    
          } else {
            elemWidth = contWidth - renderWidth;
            var coeficientW = elemWidth / renderElements.length / ElWperB,
             dW = 0;
             if (datum.width / ElWperB > 100) {
               dW = contWidth;
             } else {
               dW = datum.width;
             }
             //растягиваем картинки
             for (var i in renderElements) {
               renderElements[i].props.style.width = parseFloat(renderElements[i].props.style.width) + coeficientW + '%';   
             } 
             renderWidth = 0;
             renderElements=[];
             renderWidth+=dW;
             renderElem = this.renderElemF(i, dW, datum.img, datum.name, ElWperB, datum.height);
             renderElem.props.style.borderLeft = 0;
             renderElements.push(renderElem);
             return (renderElem);
          }
        }   
      });
      return filtr;*/