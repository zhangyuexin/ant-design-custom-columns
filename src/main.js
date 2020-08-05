import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import zyxTable from '@/packaging/table'
Vue.component('zyxTable', zyxTable)

Vue.config.productionTip = false
Vue.use(Antd);
new Vue({
  render: h => h(App),
}).$mount('#app')
