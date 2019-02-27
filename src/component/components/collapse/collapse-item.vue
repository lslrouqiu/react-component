<template>
  <div class="collapse-wrap">
    <div class="collapse-title" @click="clickHandle">
      <slot name="header">{{title}}</slot>
    </div>
      <div class="collapse-content" ref="content" >
        <slot name="content" ></slot>
      </div>
  </div>
</template>
<script>
export default {
  name: 'collapseItem',
  props: ['title'],
  data() {
    return {
      active: false,
      height: 0,
    }
  },
  mounted(){
    this.height = this.$refs.content.children[0].offsetHeight;
  },
  methods: {
    clickHandle(){
      this.$parent.clickTitle();
      if(this.active){
        this.$refs.content.style.height = '0px'
      } else {
        this.$refs.content.style.height = `${this.height}px`;
      }
      this.active = !this.active;
    },

  }
}
</script>

<style>
.collapse-wrap{
  border-top: 1px solid #bcbcbc;
}
.collapse-title{
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.collapse-content{
  overflow: hidden;
  transition: height 1s;
  height: 0px;
}
.collapse-enter-active {
  transition: max-height 1s;
}
.collapse-leave-active {
  transition: max-height 1s;
}
.collapse-enter, .collapse-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  max-height: 0;
}
.collapse-enter-to, .collapse-leave
/* .slide-fade-leave-active for below version 2.1.8 */ {
  max-height: 200px;
}
</style>
