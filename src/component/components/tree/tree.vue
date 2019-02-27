<template>
  <div>
    <div class="tree-item" v-for="(tree,index) in data" :key="tree.label">
      <div class="tree-title" @click="clickHandler(index)" :style="{cursor: cursor(tree.children)}">
        <span class="tree-icon" v-if="tree.children">{{childText(treeShow[index])}}</span>
        <a v-if="tree.href" :href="tree.href">
          <span>{{tree.label}}</span>
        </a>
        <span v-else>{{tree.label}}</span>
      </div>
      <div class="tree-children" v-if="tree.children" v-show="treeShow[index]">
        <tree  :data="tree.children" ></tree>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'tree',
  data(){
    return {
      treeShow:[]
    }
  },
  props:['data'],
  created() {
    this.data.map(tree => {
      this.treeShow.push(tree.childShow || false);
    })
  },
  methods: {
    cursor(flag) {
       if(flag) {
        return 'pointer';
      }
      return 'default';
    },
    childText(flag) {
      if(flag) {
        return '-';
      }
      return '+';
    },
    clickHandler(index) {
      if(!this.data[index].children) {
        return;
      }
      if(this.data[index].click) {
        this.data[index].click();
      }
      this.$set(this.treeShow, index , !this.treeShow[index]);
    }
  }
}
</script>
<style>
.tree-icon{
    display: inline-block;
    height: 12px;
    width: 12px;
    text-align: center;
    line-height: 8px;
    border: 1px solid;
    border-radius: 3px;
}
.tree-children{
  padding-left: 15px;
}
</style>
