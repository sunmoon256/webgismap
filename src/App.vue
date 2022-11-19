<template>
    <div id="app">
        <el-container class="app-out-panel">
            <el-header class="sys-header">一张图项目</el-header>
            <el-container class="app-content-panel">
                <el-aside width="200px" class="sys-menu">左侧菜单</el-aside>
                <el-main class="sys-map">
                    <MapView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MapView from './components/common/MapView';
export default {
    name: 'App',
    components: { MapView },
};
</script>

<style>
html,
body,
#app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0px;
    /* 设置margin是为了去除Google浏览器自带的8像素外边距 */
}
.app-out-panel,
.app-content-panel {
    height: 100%;
}
.sys-header {
    background-color: #409eff;
    line-height: 60px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
}
.sys-menu {
    background-color: #c0c4cc;
}
.sys-map {
    padding: 5px !important;
}
</style>
