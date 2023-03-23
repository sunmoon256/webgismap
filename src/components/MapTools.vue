<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMapToolsitemClick" id="xzqdh">行政区导航</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="maptree">目录树管理</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="distance">距离测量</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="area">面积测量</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="clearscreen">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
    methods: {
        openXZQDHPannel() {
            let currentVisible = this.$store.getters._getDefaultXZQDHVisible;
            this.$store.commit('_setDefaultXZQDHVisible', !currentVisible);
        },
        openMapTreePannel() {
            let currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
            console.log(currentVisible);
        },
        handleMapToolsitemClick(e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case 'xzqdh':
                    this.openXZQDHPannel();
                    break;
                case 'maptree':
                    this.openMapTreePannel();
                    break;
                case 'distance':
                    break;
                case 'area':
                    break;
                case 'clearscreen':
                    break;
            }
        },
    },
};
</script>

<style>
.maptools-view {
    position: absolute;
    padding: 0 15px;
    height: 30px;
    top: 20px;
    right: 15px;
    background-color: #fff;
}
.maptools-item {
    line-height: 30px;
    margin-left: 8px;
    margin-right: 8px;
    color: black;
    cursor: pointer;
}
</style>
