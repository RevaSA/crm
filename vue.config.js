const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    lintOnSave: false,
    publicPath: isProduction ? '/crm/' : '/',
};
