// loading/index.js
import Vue from 'vue';
import LoadingComponent from './custom-loading.vue';

// 通过Vue.extend将组件包装成一个子类
const LoadingConstructor = Vue.extend(LoadingComponent);

let loading = null;

LoadingConstructor.prototype.close = function() {
  // 如果loading 有引用，则去掉引用
  if (loading) {
    loading = null;
  }
  // 先将组件隐藏
  this.visible = false;
  // 延迟300毫秒，等待loading关闭动画执行完之后销毁组件
  setTimeout(() => {
    // 移除挂载的dom元素
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    // 调用组件的$destroy方法进行组件销毁
    this.$destroy();
  }, 300);
};

const cLoading = (options = {}) => {
  // 如果组件已渲染，则返回即可
  if (loading) {
    return loading;
  }
  // 要挂载的元素
  const parent = document.body;
  // 组件属性
  const opts = {
    text: '',
    ...options
  };
  // 通过构造函数初始化组件 相当于 new Vue()
  const instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: opts
  });
  // 将loading元素挂载到parent上面
  parent.appendChild(instance.$el);
  // 显示loading
  Vue.nextTick(() => {
    instance.visible = true;
  });
  // 将组件实例赋值给loading
  loading = instance;
  return instance;
};

Vue.directive('cLoading', {
  /**
   * 只调用一次，在指令第一次绑定到元素时调用，可以在这里做一些初始化的设置
   * @param {*} el 指令要绑定的元素
   * @param {*} binding 指令传入的信息，包括 {name:'指令名称', value: '指令绑定的值',arg: '指令参数 v-bind:text 对应 text'}
   */
  bind(el, binding) {
    const instance = new LoadingConstructor({
      el: document.createElement('div'),
      data: {}
    });
    el.appendChild(instance.$el);
    el.instance = instance;
    Vue.nextTick(() => {
      el.instance.visible = binding.value;
    });
  },
  /**
   * 所在组件的 VNode 更新时调用
   * @param {*} el
   * @param {*} binding
   */
  update(el, binding) {
    // 通过对比值的变化判断loading是否显示
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value;
    }
  },
  /**
   * 只调用一次，在 指令与元素解绑时调用
   * @param {*} el
   */
  unbind(el) {
    const mask = el.instance.$el;
    if (mask.parentNode) {
      mask.parentNode.removeChild(mask);
    }
    el.instance.$destroy();
    el.instance = undefined;
  }
});

export default cLoading;
