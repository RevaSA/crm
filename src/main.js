import Vue from 'vue';
import firebase from 'firebase/app';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import messagePlugin from '@/utils/message';
import Loader from '@/components/Loader';
import '@/firebase';
import '@/registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;
Vue.use(messagePlugin);
Vue.component('Loader', Loader);

let app = null;

firebase.auth().onAuthStateChanged(() => {
    app = app || new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
});
