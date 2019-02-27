<template>
  <div class="pagination-container" >
    <span>共{{total}}页,当前第{{current}}页</span>
    <ul class="pagination-ul" v-if="total > shownum + 2">
       <li><a :class="{disabled: current === 1}" @click="firstClick">{{first}}</a></li>
      <li><a :class="{disabled: current === 1}" @click="preClick">{{pre}}</a></li>
      <li ><a :class="{active:1==current}" @click="firstClick" >1</a></li>
      <li v-if="fistMore">...</li>
      <li v-for="i in show"><a :class="{active:i==current}" @click="pageMoreClick(i)" >{{i}}</a></li>
       <li v-if="lastMore">...</li>
       <li ><a :class="{active: total==current}" @click="lastClick">{{total}}</a></li>
       <li><a :class="{disabled: current === total}" @click="nextClick">{{next}}</a></li>
       <li><a :class="{disabled: current === total}" @click="lastClick">{{last}}</a></li>
    </ul>
    <ul class="pagination-ul" v-else>
      <li><a :class="{disabled: current === 1}" @click="preClick">{{pre}}</a></li>
      <li v-for="i in total"><a :class="{active:i==current}" @click="pageClick(i)">{{i}}</a></li>
      <li><a :class="{disabled: current === total}" @click="nextClick">{{next}}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'page',
  data() {
    return {
      current: this.active,
      show: this.pageArray(2, this.shownum+1),
      fistMore: false,
      lastMore: true,
    }
  },
  props: {
    total: {
      type: Number,
    },
    shownum: {
      default: 5
    },
    pre: {
      default: '<'
    },
    next: {
      default: '>'
    },
    first: {
      default: '《'
    },
    last: {
      default: '》'
    },
    active: {
      default: 1
    },
    handleClick: {
      type: Function,
    }
  },
  mounted() {
    if(this.active !== 1) {
      if(this.active > this.total){
        this.current = 1;
      }
      if(this.current > this.shownum ) {
           this.fistMore = true;
        if(this.current <= this.total - this.shownum) {
          this.lastMore = true;
          this.show = this.pageArray(this.current - this.shownum + 2,this.current + 1);
        } else {
          this.lastMore = false;
          this.show = this.pageArray(this.total - this.shownum, this.total - 1);
        }
      }

    }
  },
  methods: {
    preClick() {
      if(this.current === 1) {
        return;
      }
       if(this.current === this.show[0] + 1 && this.current > 3) {
        this.show.unshift(this.show[0] - 1);
        this.show = this.show.slice(0, this.shownum);
        if(!this.lastMore) {
          this.lastMore = true;
        }
        if(this.current <= 4){
          this.fistMore = false;
        }
      }
      this.pageClick(this.current - 1);
    },
    nextClick() {
      if(this.current === this.total) {
        return;
      }
      if(this.current === this.show[this.shownum - 2] && this.current < this.total - 2) {
        this.show = this.show.slice(1);
        this.show.push(this.current + 2);
        if(!this.fistMore) {
          this.fistMore = true;
        }
        if(this.current >= this.total - 3){
          this.lastMore = false;
        }
      }
      this.pageClick(this.current + 1);
    },
    pageClick(i) {
      this.current = i;
      if(this.handleClick) {
        this.handleClick(this.current);
      }
    },
    pageMoreClick(i) {
      if(i === this.show[this.shownum - 1] && i < this.total - 1) {
        this.show = this.show.slice(1);
        this.show.push(i + 1);
        if(!this.fistMore){
          this.fistMore = true;
        }
        if(i + 2 >= this.total){
          this.lastMore = false;
        }
      }
      if(i === this.show[0] && i > 2) {
        this.show.unshift(this.show[0] - 1);
        this.show = this.show.slice(0, this.shownum);
        if(!this.lastMore) {
          this.lastMore = true;
        }
        if(i <= 3){
          this.fistMore = false;
        }
      }
      this.pageClick(i);
    },
    lastClick() {
      const { total } = this;
      this.show = this.pageArray(total - this.shownum ,total - 1);
      this.fistMore = true;
      this.lastMore = false;
      this.pageClick(total);
    },
    firstClick() {
      this.show = this.pageArray(2, this.shownum + 1);
      this.fistMore = false;
      this.lastMore = true;
      this.pageClick(1);
    },
    pageArray(begin, end) {
      let arr = [];
      for(let i = begin; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    }
  }
}
</script>

<style>
.pagination-container {
  text-align: center;
  font-size: 16px;
}
.pagination-ul{
  list-style: none;
  display: inline-block;
  padding: 0 0 0 7px;
  margin: 0;
}
.pagination-ul>li{
  display: inline-block;
  margin: 0 5px;
}
.pagination-ul>li>a{
  cursor: pointer;
  color: #303133;
}
.pagination-ul>li>a.disabled{
  cursor: default;
  color: #CBCBCB;
}
.pagination-ul>li>a.disabled:hover{
  color: #CBCBCB;
}
.pagination-ul>li>a:hover{
  color: #1BD29A;
}
.pagination-ul>li>a.active{
  cursor: default;
  color: #1BD29A;
}

</style>
