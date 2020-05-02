export default {
    bind(el, { value }) {
        if (value) {
            window.M.Tooltip.init(el, typeof value === 'object' ? value : { html: value });
        }
    },
    unbind(el) {
        const tooltip = window.M.Tooltip.getInstance(el);

        tooltip && tooltip.destroy && tooltip.destroy();
    },
};
