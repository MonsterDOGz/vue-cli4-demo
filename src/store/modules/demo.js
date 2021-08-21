/*
 * @Author: MonsterDOG
 * @Date: 2021-08-20 14:04:33
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-08-21 17:47:43
 * @FilePath: \vue-cli4-demo\src\store\modules\demo.js
 * @Description: 【描述】
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: ''
  },
  getters: {
    labelName: state => {
      return `姓名: ${state.name}`;
    }
  },
  mutations: {
    CHANGE_NAME(state, name) {
      state.name = name;
    }
  },
  actions: {
    queryName({ commit }, queryValue) {
      login(queryValue).then(res => {
        commit('CHANGE_NAME', res.name);
      });
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
