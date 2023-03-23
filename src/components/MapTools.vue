<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMapToolsitemClick" id="xzqdh">行政区导航</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="maptree">目录树管理</span>
        <el-dropdown class="maptools-item" @command="handleCommand">
            <span class="el-dropdown-link">地图测量<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" command="distance">距离测量</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus" command="area">面积测量</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="maptools-item" @command="handleCommand">
            <span class="el-dropdown-link">更多功能<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-search" command="spacequery">空间查询</el-dropdown-item>
                <el-dropdown-item icon="el-icon-film" command="morescreen">多屏对比</el-dropdown-item>
                <el-dropdown-item icon="el-icon-reading" command="swipeana">卷帘分析</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
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
            // console.log(e.target.id);
            switch (e.target.id) {
                case 'xzqdh':
                    this.openXZQDHPannel();
                    break;
                case 'maptree':
                    this.openMapTreePannel();
                    break;
                case 'clearscreen':
                    break;
            }
        },
        handleCommand(command) {
            switch (command) {
                case 'distance':
                    break;
                case 'area':
                    break;
                case 'spacequery':
                    break;
                case 'morescreen':
                    break;
                case 'swipeana':
                    break;
                default:
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
    font-size: 15px;
    cursor: pointer;
}
.maptools-item:hover {
    color: #409eff;
}
.maptools-item:first-child {
    margin-left: 0px;
}
.maptools-item:last-child {
    margin-right: 0px;
}
</style>
