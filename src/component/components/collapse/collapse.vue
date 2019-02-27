<template>
  <div class="collapses-wrap">
    <slot  @clickTitle="clickTitle"></slot>
  </div>
</template>
<script>
export default {
  name: 'Collapse',
  props: ['accordion'],

  methods: {
    clickTitle(){
      if(this.accordion){
        this.$children.map(child => child.active = false);
      }
    }
  }
}
</script>
<style>

</style>
