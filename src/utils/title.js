/* eslint-disable no-param-reassign */
import locaize from '@/filters/localize';

export default {
    install(Vue) {
        Vue.prototype.$title = title => `${locaize(title)} | ${process.env.VUE_APP_TITLE}`;
    },
};
