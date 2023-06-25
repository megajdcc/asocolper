
import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/es';
import locale from 'element-ui/lib/locale';

Vue.prototype.$eventHub = new Vue();

locale.use(lang);

import TheMask from 'vue-the-mask';

Vue.use(TheMask);

import * as VueGoogleMaps from 'vue2-google-maps';
// import VueGoogleAutocomlete from 'vue-google-autocomplete';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCNWsVH2kmknm6knGSRKDuzGeMWM1PT6gA',
    libraries: 'places',
  },
  installComponents: true

});

import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'


// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'

import VueCurrencyFilter from 'vue-currency-filter'
import moment from 'moment';

window.moment = require('moment');

moment.locale('en')

Vue.filter('fecha',(val,format = 'LL') => {
  if(val) {
    return moment(val).format(format);
  }
  return 'error en la fecha';

})




Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
});

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(ElementUI);

// Vue Meta
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

window.clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
}
window._ = require('lodash')


// Iniciamos WOW

new WOW().init();


// window.$ = window.jQuery = require('jquery');

let app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
export default app;
