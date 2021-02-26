/*
 * @Author: MonsterDOG
 * @Date: 2020-07-29 10:47:31
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 14:31:30
 * @FilePath: /vue-cli4-demo/src/icons/index.js
 * @Description: 【描述】
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg 组件

Vue.component('svg-icon', SvgIcon)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
