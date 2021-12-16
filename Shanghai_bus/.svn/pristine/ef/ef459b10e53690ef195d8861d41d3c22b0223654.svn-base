// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "default-passive-events";
Vue.config.productionTip = false;
import "babel-polyfill";
Vue.use(ElementUI);
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "uV9gGX5pg4KbpEDsGICIqjK5IeLUlCVh" //使用申请的百度地图秘钥
});
import "./assets/css/index.scss";
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

// https://shqy.vip
