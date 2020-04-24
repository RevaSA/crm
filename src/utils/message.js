/* eslint-disable no-param-reassign */

export default {
    install(Vue) {
        Vue.prototype.$message = (html, type = 'default') => {
            if (html) {
                window.M.toast({ html: type === 'error' ? `[Ошибка]: ${html}` : html });
            }
        };
    },
};
