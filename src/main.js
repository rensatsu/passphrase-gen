import Vue from 'vue';
import app from './app.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(app),
}).$mount('#app');
