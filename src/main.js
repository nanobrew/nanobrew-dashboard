import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false
Vue.use(VueNativeSock, 'ws://127.0.0.1:5300/ws')

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
