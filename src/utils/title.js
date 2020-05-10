/* eslint-disable no-param-reassign */

export default {
    install(Vue) {
        Vue.prototype.$title = title => `${title} | ${process.env.VUE_APP_TITLE}`;
    },
};
