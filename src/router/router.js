import Vue from 'vue';
import VueRouter from 'vue-router';
import DataVisual from './../pages/DataVisual';
import OneMap from './../pages/OneMap';

Vue.use(VueRouter);

export default new VueRouter({
    // routers是一个数组，定义hash地址与组件之间的关系
    routes: [
        { path: '/', component: DataVisual },
        { path: '/onemap', component: OneMap },
    ],
    mode: 'history',
});
