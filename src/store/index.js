import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    _defaultView: '', //系统默认地图view
    _defaultXZQDHVisible: false, //行政区划面板默认隐藏
    _defaultMapTreeVisible: false, //地图目录树显示/隐藏
};

const getters = {
    _getDefaultView() {
        //名字随意取
        return state._defaultView;
    },
    _getDefaultXZQDHVisible() {
        return state._defaultXZQDHVisible;
    },
    _getDefaultMapTreeVisible() {
        return state._defaultMapTreeVisible;
    },
};

const mutations = {
    _setDefaultView(state, value) {
        state._defaultView = value;
    },
    _setDefaultXZQDHVisible(state, value) {
        state._defaultXZQDHVisible = value;
    },
    _setDefaultMapTreeVisible(state, value) {
        state._defaultMapTreeVisible = value;
    },
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    // mutations:mutations,
    // ES6解构赋值，此处的属性名与属性值是一样的，可以只写属性名（属性值）
});

export default store;
