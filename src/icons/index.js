import Vue from 'vue'
import AppSvgIcon from '@/components/AppSvgIcon' // svg 组件

Vue.component('app-svg-icon', AppSvgIcon)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
