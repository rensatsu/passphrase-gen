import Vue from "vue";
import app from "./app.vue";
import Fragment from "vue-fragment";

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);

new Vue({
    render: h => h(app)
}).$mount("#app");
