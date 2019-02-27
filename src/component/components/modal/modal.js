import Vue from 'vue';
import Main from './modal.vue';
import {isVNode} from '../../util/index'
const ModalConstructor = Vue.extend(Main);

let instance;
let seed = 1;

const Modal = function(options) {
  options = options || {};
  const id = 'modal_' + seed++;
  instance = new ModalConstructor({
    data: options
  });
  if(isVNode(instance.message)){
    instance.$slots.default = [instance.message];
    instance.message = null;
  } else {
    delete instance.$slots.default;
  }
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.dom = instance.$el;
  return instance;
};

export default Modal;
