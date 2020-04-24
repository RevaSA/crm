import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import messagePlugin from '@/utils/message';
import '@/registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;
Vue.use(messagePlugin);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
