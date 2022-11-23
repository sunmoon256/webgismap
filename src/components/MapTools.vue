<template>
    <div class="maptools-view">
        <span class="maptools-item">行政区导航</span>
        <span class="maptools-item">距离测量</span>
        <span class="maptools-item">面积测量</span>
        <span class="maptools-item">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
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
