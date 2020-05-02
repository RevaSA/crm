import Vue from 'vue';
import firebase from 'firebase/app';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import messagePlugin from '@/utils/message';
import Loader from '@/components/Loader';
import '@/registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

firebase.initializeApp({
    apiKey: 'AIzaSyAfgbnGIMaQwJmTH6tWNwqJbDFYJ54CDGE',
    authDomain: 'dementor-vue-crm.firebaseapp.com',
    databaseURL: 'https://dementor-vue-crm.firebaseio.com',
    projectId: 'dementor-vue-crm',
    storageBucket: 'dementor-vue-crm.appspot.com',
    messagingSenderId: '287515160947',
    appId: '1:287515160947:web:b9648413839ac65aad9506',
});

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
