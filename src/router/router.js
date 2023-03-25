import Vue from 'vue';
import VueRouter from 'vue-router';
import DataVisual from './../pages/DataVisual';
import OneMap from './../pages/OneMap';
import MoreScreen from './../components/MoreScreen';

Vue.use(VueRouter);

// 解决问题：到当前位置的冗余导航, 简单来说就是重复触发了同一个路由
// const originalPush = VueRouter.prototype.push

// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default new VueRouter({
    // routers是一个数组，定义hash地址与组件之间的关系
    routes: [
        { path: '/', component: DataVisual },
        { path: '/onemap', component: OneMap },
        { path: '/onemap/morescreen', component: MoreScreen },
    ],
    mode: 'history',
});
