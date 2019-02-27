
import React from 'react';
import Reactdom from 'react-dom';
import component from './component/index';

const { Carousel, Calendar, Scroll } = component;
const items = ['black', 'red', 'yellow', 'blue'];
const carouselContent = items.map(item => {
  return (
    <div key={item} style={{ height: '300px', background: item }}></div>
  );
});
const scrolllContent = items.map(item => {
  return (
    <div key={item} style={{width: '900px',height: '300px', background: item }}></div>
  );
});
Reactdom.render(
  <div>
    carousel:
    <Carousel lazyLoad="true" active="2" dotShow="true" vertical="true" height="300" autoPlay="3">
      {carouselContent}
    </Carousel>
    Scroll:
    <Scroll width={300} height={200}>
      {scrolllContent}
    </Scroll>
    Calendar:
    <Calendar width={600}></Calendar>

  </div>,
  document.getElementById('root'),
);
