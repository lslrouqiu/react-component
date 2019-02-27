<template>
  <div class="tab" v-if="flag" v-show="active" >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data() {
    return {
      flag: null,
      active: null
    }
  },
  props: ['name']
}
</script>

<style>
.tab{
  height: 100%;
}
</style>
