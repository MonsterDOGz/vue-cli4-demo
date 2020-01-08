// little Dragon，项目贷款阶段相关数据
import $apiBaseApi from '@/request/modules/baseApi';

const state = {
  bankInfo: {}, // 银行相关信息
  info: {}, // 项目验证返回的结果
  projLoanApprovalId: '' // 贷款申请id
};

const getters = {};

const mutations = {
  // 获取银行信息
  changeGetBankInfo (state, data) {
    state.bankInfo = data;
    console.log(state.bankInfo);
  },
  // 获取项目验证返回的信息
  getProjVerifiInterface (state, action) {
    state.info = action;
  },
  // 获取贷款申请id
  getProjLoanApprovalId (state, data) {
    state.projLoanApprovalId = data;
  }
};

// 个人认为需要在多个组件中复用的信息，请求可以放入actions中，然后将返回的信息保存在vuex中
// 而那些只在当前组件中用到的信息，请求可以放入那个组件里不需要放入actions中
const actions = {
  // 项目验证
  async getProjVerifiInterfaceAsync ({ commit }, action) {
    let { userId, socialCreditCode, stage } = action;
    await $apiBaseApi.apiProjVerifiInterface({
      socialCreditCode, userId, stage
    }).then(res => {
      console.log(res);
      let { data } = res;
      commit('getProjVerifiInterface', data);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
