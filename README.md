# 这里是readme文档

1. [carousel](#carousel)
2. [scroll](#scroll)

## carousel

用法：

```
const items = ['black', 'red', 'yellow', 'blue'];
const carouselContent = items.map(item => {
  return (
    <div key={item} style={{ height: '300px', background: item }}></div>
  );
});

<Carousel lazyLoad="true" active="2" dotShow="true" vertical="true" height="300" autoPlay="3">
    {carouselContent}
</Carousel>
```
可传入参数：

| 属性        | 类型     |  作用  |
| ----        | -----:   | :----: |
| lazyLoad    | Boolean  |   是否对carousel里的内容进行懒加载    |
| active        | int      |   首次激活的子元素    |
| dotShow        | Boolean      |   是否显示下部显示点    |
| vertical |  Boolean  |  是否为垂直显示|
|height | int | 垂直播放需要添加高度属性(px) |
|autoPlay  | int | 是否自动播放，自动播放则加该属性，值为自动播放的间隔(s)|
|width | int | carousel宽度，默认为子元素宽度|

## scroll

用法：

```
const items = ['black', 'red', 'yellow', 'blue'];
const scrolllContent = items.map(item => {
  return (
    <div key={item} style={{width: '900px',height: '300px', background: item }}></div>
  );
});

<Scroll width={300} height={200}>
  {scrolllContent}
</Scroll>
```
可传入参数：

| 属性        | 类型     |  作用  |
| ----        | -----:   | :----: |
| width    | number  |   显示区域宽度，必填   |
| height   | number  |   显示区域高度，必填    |
| controlWidth  | number      |   左侧滚动条的宽度，默认10    |
| controlHeight |  number  |  下侧滚动条的高度，默认10 |
|moveBase | number | 滚动时的基础距离 |

