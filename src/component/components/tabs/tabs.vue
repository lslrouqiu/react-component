<template>
  <div class="tabs-continer" :style="{height:`${height}px`}">
    <div class="tabs-nav-container">
      <ul class="tabs-nav-ul">
        <li class="tabs-nav"  v-for="(nav,index) in navs"  :class="{active:index == activeIndex}" @click="tabClick(index)">{{nav}}</li>
      </ul>
    </div>
    <div class="tabs-content" :style="{height:`${height-30}px`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data() {
    return {
      navs: [],
      activeIndex: 0,
      showFlag: [],
    }
  },
  props: {
    height:{
      default: '300'
    },
    initalIndex: {
      default: 0
    }
  },
  mounted() {
    this.activeIndex = this.initalIndex;
    this.$children.map((child,index) => {
      this.navs.push(child.name)
      child.flag = index == this.activeIndex;
      child.active = index == this.activeIndex;
      this.showFlag.push(index == this.activeIndex)
    });
  },
  methods: {
    tabClick(index){
      if(!this.showFlag[index]){
        this.$children[index].flag = true;
        this.showFlag[index] = true;
      }
      this.$children[this.activeIndex].active = false;
      this.activeIndex = index;
      this.$children[index].active = true;
    }
  }
}
</script>

<style>
.tabs-nav-container{
  height: 30px;
  border-bottom: 1px solid #e5e5e5;
}
.tabs-nav-ul{
  text-align: left;
  list-style: none;
}
.tabs-nav{
  display: inline-block;
  padding: 0 10px;
  line-height: 30px;
  cursor: pointer;
}
.tabs-nav.active{
    color: #1cd39b;
    border-bottom: 2px solid #1cd39b;
}
</style>
