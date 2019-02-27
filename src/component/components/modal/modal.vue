<template>
  <div class="modal-wrap" v-if="show" :id="id">
    <div class="modal-bg"></div>
    <div class="modal-container" :style="{width:`${width}px`,'margin-left': `-${width/2}px`,top: `${top}px`}">
      <div class="modal-header">
        {{title}}
        <span class="close" @click="hiddenModal">X</span>
      </div>
      <div class="modal-content">
        <slot>
          <div v-if="message">{{message}}</div>
        </slot>
      </div>
      <div class="modal-footer" :style="{'text-align': buttonAlign}">
        <button class="confirm-button" @click="confirmClick" v-if="confirmShow">{{confirmText}}</button>
        <button class="cancel-button" @click="cancelClick" v-if="cancelShow">{{cancelText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '标题',
      message: '',
      confirmText: '确认',
      cancelText: '取消',
      confirmEvent: null,
      cancelEvent: null,
      confirmShow: true,
      cancelShow: true,
      show: true,
      width: 300,
      top: 100,
      buttonAlign: 'center',
      id: null
    }
  },
  mounted() {
    document.querySelector('html').style.overflow = 'hidden';
  },
  methods: {
    hiddenModal() {
      document.querySelector('html').style.overflow = 'auto';
      this.show = false;
    },
    confirmClick() {
      if(this.confirmEvent != null) {
        if(this.confirmEvent()) {
          this.hiddenModal();
        }
      } else {
        this.hiddenModal();
      }
    },
    cancelClick() {
      if(this.cancelEvent!=null) {
        this.cancelEvent();
      }
      this.hiddenModal();
    }
  }
}
</script>

<style>
.modal-wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-bg{
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.4;
}
.modal-container{
  position: relative;
  padding: 10px;
  background: #fff;
  left: 50%;
  border-radius: 15px;
}
.modal-header{
  height: 30px;
  line-height: 30px;
  font-size: 17px;
}
.modal-header .close{
  float: right;
  color: #bcbcbc;
  cursor: pointer;
}
.modal-header .close:hover{
  color: #000 ;
}
.modal-content{
  padding: 10px 0;
}
.modal-footer{
  text-align:
}
.modal-footer button{
    width: 60px;
    height: 28px;
    border-radius: 10px;
}
.confirm-button{
  background: #47b7ee;
  color: white;
  border: none;
  margin-right: 20px;
}
.cancel-button{
  background: #fff;
  border: #bcbbbb 1px solid;
}
</style>
