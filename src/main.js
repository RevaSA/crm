import Vue from 'vue';
import VueMeta from 'vue-meta';
import firebase from 'firebase/app';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import localize from '@/filters/localize';
import titlePlugin from '@/utils/title';
import messagePlugin from '@/utils/message';
import Loader from '@/components/Loader';
import '@/registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

firebase.initializeApp({
    apiKey: 'AIzaSyCkgLLQvyrSA78RknZWGfrs_11-aOwayzY',
    authDomain: 'crm-revasa.firebaseapp.com',
    databaseURL: 'https://crm-revasa.firebaseio.com',
    projectId: 'crm-revasa',
    storageBucket: 'crm-revasa.appspot.com',
    messagingSenderId: '212628703144',
    appId: '1:212628703144:web:0dd69637f8e48565c83f9d',
});

Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.use(titlePlugin);
Vue.use(messagePlugin);
Vue.filter('localize', localize);
Vue.component('Loader', Loader);

let app = null;

firebase.auth().onAuthStateChanged(() => {
    app = app || new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
});
