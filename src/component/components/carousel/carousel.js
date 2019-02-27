import React from 'react';
import './carousel.less';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
      carouselWidth: null,
      carouselHeight: null,
    };
    this.carouselContent = React.createRef();
    this.loadArr = Array(this.props.children.length).fill(false);
    this.timer = null;
    this.preClickHandler = this.preClickHandler.bind(this);
    this.nextClickHandler = this.nextClickHandler.bind(this);
  }

  componentDidMount() {
    const { length } = this.props.children;
    const {
      lazyLoad, width, height, autoPlay,
    } = this.props;
    let activeItem = this.props.active || 0;
    activeItem %= length;
    if (lazyLoad) {
      this.loadArr[activeItem] = true;
    }
    this.setState({
      activeItem,
      carouselWidth: width || this.carouselContent.current.offsetWidth,
      carouselHeight: height || 0,
    });
    if (autoPlay) {
      this.timer = setTimeout(this.autoPlay.bind(this), Number(autoPlay) * 1000);
    }
  }

  leftDiasble() {
    const { activeItem } = this.state;
    if (activeItem === 0) {
      return true;
    }
    return false;
  }

  rightDiasble() {
    const { activeItem } = this.state;
    const { length } = this.props.children;
    if (activeItem === length - 1) {
      return true;
    }
    return false;
  }

  getPadding() {
    const { lazyLoad, vertical } = this.props;
    const { carouselWidth, carouselHeight, activeItem } = this.state;
    const lastIndex = this.loadArr.lastIndexOf(false, activeItem) + 1;
    if (lazyLoad && lastIndex !== -1) {
      return vertical ? lastIndex * carouselHeight + 'px' : lastIndex * carouselWidth + 'px';
    }
    return null;
  }


  preClickHandler() {
    const { lazyLoad, autoPlay } = this.props;
    const { activeItem } = this.state;
    if (activeItem === 0) {
      return;
    }
    if(autoPlay){
      clearTimeout(this.timer);
    }
    if (lazyLoad) {
      this.loadArr[activeItem - 1] = true;
    }
    this.setState({
      activeItem: activeItem - 1,
    });
    if(autoPlay){
      this.timer = setTimeout(this.autoPlay.bind(this), Number(autoPlay) * 1000);
    }
  }

  nextClickHandler() {
    const { lazyLoad, autoPlay } = this.props;
    const { activeItem } = this.state;
    const { length } = this.props.children;
    if (activeItem === length - 1) {
      return;
    }
    if(autoPlay){
      clearTimeout(this.timer);
    }
    if (lazyLoad) {
      this.loadArr[activeItem + 1] = true;
    }
    this.setState({
      activeItem: activeItem + 1,
    });
    if(autoPlay){
      this.timer = setTimeout(this.autoPlay.bind(this), Number(autoPlay) * 1000);
    }
  }

  nextClickDots(activeItem) {
    const { lazyLoad, autoPlay } = this.props;
    if(autoPlay){
      clearTimeout(this.timer);
    }
    if (lazyLoad) {
      this.loadArr[activeItem] = true;
    }
    this.setState({ activeItem });
    if(autoPlay){
      this.timer = setTimeout(this.autoPlay.bind(this), Number(autoPlay) * 1000);
    }
  }

  autoPlay() {
    const { activeItem } = this.state;
    const { length } = this.props.children;
    const { autoPlay, lazyLoad } = this.props;
    let active = activeItem + 1;
    if (active === length) {
      active = 0;
    }
    if (lazyLoad) {
      this.loadArr[active] = true;
    }
    this.setState({ activeItem: active });
    this.timer = setTimeout(this.autoPlay.bind(this), Number(autoPlay) * 1000);
  }

  render() {
    const { lazyLoad, dotShow, vertical } = this.props;
    const { carouselWidth, carouselHeight, activeItem } = this.state;
    const { length } = this.props.children;
    const children = this.props.children.map((item, idx) => {
      if (lazyLoad) {
        if (!this.loadArr[idx]) {
          return null;
        }
      }
      const style = Object.assign({}, item.props.style, { width: `${carouselWidth}px` });
      return React.cloneElement(item, {
        className: 'carousel-item',
        style,
      });
    });
    let dotGroup = null;
    if (dotShow) {
      const dots = this.props.children.map((item, idx) => {
        return (
          <div className={`carousel-dot ${activeItem === idx ? 'active' : ''}`} onClick={this.nextClickDots.bind(this, idx)} key={idx}></div>
        );
      });
      dotGroup = (
        <div className={`carousel-dot-group ${vertical ? 'vertical' : ''}`}>
          {dots}
        </div>
      );
    }
    let contentStyle = {};
    if (vertical) {
      contentStyle = {
        height: `${carouselHeight * length}px`,
        transform: `translateY(-${carouselHeight * activeItem}px)`,
        paddingTop: this.getPadding(),
      };
    } else {
      contentStyle = {
        width: `${carouselWidth * length}px`,
        transform: `translateX(-${carouselWidth * activeItem}px)`,
        paddingLeft: this.getPadding(),
      };
    }
    return (
      <div className="carousel-container">
        <div className="carousel-main" ref={this.carouselContent} style={{ width: `${carouselWidth}px`, height: `${carouselHeight}px` }}>
          <div
            className="carousel-content"
            style={contentStyle}>
          {children}
          </div>
        </div>
        <div className="carousel-btn-group">
          <div className={`carousel-btn left ${vertical ? 'top' : ''} ${this.leftDiasble() ? 'disabled' : ''}`} onClick={this.preClickHandler}></div>
          <div className={`carousel-btn right ${vertical ? 'bottom' : ''} ${this.rightDiasble() ? 'disabled' : ''}`} onClick={this.nextClickHandler}></div>
        </div>
        {dotGroup}
      </div>
    );
  }
}

export default Carousel;
