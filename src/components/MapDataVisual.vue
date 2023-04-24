<template>
    <div class="map-data-visual-view">
        <div id="scenceview"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
    name: 'MapDataVisual',
    components: {},
    data() {
        return {
            data: '',
        };
    },
    mounted: function () {
        this._initMap();
    },
    methods: {
        async _initMap() {
            const [Map, SceneView, Basemap, TileLayer] = await loadModules(
                ['esri/Map', 'esri/views/SceneView', 'esri/Basemap', 'esri/layers/TileLayer'],
                options,
            );

            //自定义一张底图，来自捷泰的瓦片底图服务
            const basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });

            // 定义底图数据
            const map = new Map({
                basemap,
            });

            // 实例化视图控件，并将控件绑定到容器上
            const scenceview = new SceneView({
                container: 'scenceview',
                map: map,
                // zoom: 14,
                // center: [113.828185, 34.824426],
                // center:[113.688266,34.77982],//郑州市中心12级
            });

            scenceview.ui.components = []; //清空scenceview中自带的控件
        },
    },
};
</script>

<style>
.map-data-visual-view {
    position: relative;
    height: 100%;
    width: 100%;
}
#scenceview {
    height: 100%;
    width: 100%;
}
</style>
