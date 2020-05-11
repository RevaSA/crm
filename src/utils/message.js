/* eslint-disable no-param-reassign */
import localize from '@/filters/localize';

export default {
    install(Vue) {
        Vue.prototype.$message = (html, type = 'default') => {
            if (html) {
                window.M.toast({ html: type === 'error' ? `[${localize('Error')}]: ${html}` : html });
            }
        };
    },
};
