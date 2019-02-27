import React from 'react';
import './scroll.less';

class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHeight = React.createRef();
    this.scrollContainer = React.createRef();
    this.state ={
      totalHeight: 0,
      totalWidth: 0,
      translateY: 0,
      translateX: 0,
    }
    this.onScrollEvent = this.onScrollEvent.bind(this);
    this.clickScroll = this.clickScroll.bind(this);
    this.scrollClickHandler = this.scrollClickHandler.bind(this);
    this.scrollBtnMouseDown = this.scrollBtnMouseDown.bind(this);
    this.scrollBtnMouseMove = this.scrollBtnMouseMove.bind(this);
    this.scrollBtnMouseUp = this.scrollBtnMouseUp.bind(this);
  }

  componentDidMount(){
    const totalDom = this.scrollHeight.current;
    this.setState({
      totalHeight: totalDom.scrollHeight,
      totalWidth: totalDom.scrollWidth
    })
  }

  onScrollEvent(event){
    event.stopPropagation();
    event.preventDefault();
    const { translateY, totalHeight } = this.state;
    const { height } = this.props;
    const totalTranslate = height - totalHeight;
    const base = event.nativeEvent.deltaY / 100;
    if(base < 0 && translateY >= 0){
      this.setState({
        translateY: 0
      });
      return;
    }
    if(base > 0 && translateY <= totalTranslate){
      this.setState({
        translateY: totalTranslate
      });
      return;
    }
    this.setState((prevState, props) => ({
      translateY: prevState.translateY - props.moveBase * base
    }));
  }

  clickScroll(offset, flag, click,target){
    const { totalHeight, translateY, totalWidth, translateX } = this.state;
    const { height, width } = this.props;
    let finalPosition = flag ? offset * totalHeight / height : offset * totalWidth /width;
    const btnTranslate = flag ? translateY * height / totalHeight : translateX * width /totalWidth;
    const totalTranslate = flag ? totalHeight - height : totalWidth - width;
    const btnLength = flag ? height * height / totalHeight : width * width / totalWidth;
    if(click && (target.className === 'scroll-btn' || (offset > btnTranslate && offset < btnTranslate + btnLength)) ){
      return;
    }
    finalPosition = finalPosition > totalTranslate ? totalTranslate : finalPosition;
    finalPosition = finalPosition < 0 ? 0 : finalPosition;
    if(flag){
      this.setState({
        translateY: finalPosition
      });
    } else {
      this.setState({
        translateX: finalPosition
      });
    }
  }

  scrollClickHandler(flag, event) {
    let offset = null;
    event = event.nativeEvent;
    if(flag) {
      offset = event.offsetY;
    } else {
      offset = event.offsetX;
    }
    this.clickScroll(offset, flag, true, event.target);
  }

  scrollBtnMouseDown(flag) {
    this.dragFlag = flag;
    this.beginYPosition = this.scrollContainer.current.offsetTop;
    this.beginXPosition = this.scrollContainer.current.offsetLeft;
    window.addEventListener('mousemove', this.scrollBtnMouseMove);
    window.addEventListener('mouseup', this.scrollBtnMouseUp);
    document.body.style.cursor = 'pointer';
    document.onselectstart = () => false;
  }

  scrollBtnMouseMove(event) {
    const flag = this.dragFlag;
    const offset = flag ? event.pageY - this.beginYPosition : event.pageX - this.beginXPosition;
    requestAnimationFrame(this.clickScroll.bind(this, offset, flag, false));
  }

  scrollBtnMouseUp(){
    window.removeEventListener('mousemove', this.scrollBtnMouseMove);
    window.removeEventListener('mouseup',this.scrollBtnMouseUp);
    document.body.style.cursor = '';
    document.onselectstart = null;
  }



  render() {
    const { width, height, controlWidth, controlHeight } = this.props;
    const { totalHeight, totalWidth, translateY, translateX } = this.state;
    const scrollX = width < totalWidth;
    const scrollY = width < totalHeight;
    const containerStyle = {
      width: `${scrollY ? width + controlWidth : width }px`,
      height: `${scrollX ?  height + controlHeight : height }px`,
    }
    let scrollXHtml = null,
        scrollYHtml = null;
    if(scrollY) {
      const btnHeight = height * height / totalHeight;
      const btnTranslateY = translateY * height / totalHeight;
      scrollYHtml = (
        <div
          className="scroll-controller scroll-controllerY"
          style={{height: height + 'px', width: controlWidth + 'px'}}
          onClick={this.scrollClickHandler.bind(this, true)}>
          <div
            className="scroll-btn"
            style={{height: btnHeight + 'px',transform: `translateY(${btnTranslateY}px)`}}
            onMouseDown={this.scrollBtnMouseDown.bind(this, true)} >
          </div>
        </div>
      )
    }
    if(scrollX) {
      const btnWidth = width * width / totalWidth;
      const btnTranslateX = translateX * width / totalWidth;
      scrollXHtml = (
        <div
          className="scroll-controller scroll-controllerX"
          style={{height: controlHeight + 'px', width: width + 'px'}}
          onClick={this.scrollClickHandler.bind(this, false)}>
          <div
            className="scroll-btn"
            style={{width: btnWidth + 'px',transform: `translateX(${btnTranslateX}px)`}}
            onMouseDown={this.scrollBtnMouseDown.bind(this, false)} >
          </div>
        </div>
      )
    }
    return (
      <div className="scroll-container" style={containerStyle} onWheel={this.onScrollEvent} ref={this.scrollContainer}>
        <div className="scroll-content" style={{width: width + 'px', height: height + 'px'}}>
          <div ref={this.scrollHeight} className="scroll-translate" style={{transform: `translate(-${translateX}px,-${translateY}px)`}}>
          {this.props.children}
          </div>
        </div>
        {scrollYHtml}
        {scrollXHtml}
      </div>
    )
  }
}
Scroll.defaultProps = {
  controlWidth: 10,
  controlHeight: 10,
  moveBase: 20,
}

export default Scroll;
