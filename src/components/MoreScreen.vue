<template>
    <div class="morescreen-view">
        <div class="morescreen-top-view">
            <div id="top-left" class="map-item"></div>
            <div id="top-right" class="map-item"></div>
        </div>
        <div class="morescreen-bottom-view">
            <div id="bottom-left" class="map-item"></div>
            <div id="bottom-right" class="map-item"></div>
        </div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
// import config from './config';
const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
    name: 'MoreScreen',
    mounted: function () {
        this._initMap();
    },
    methods: {
        async _initMap() {
            const [Map, MapView, Basemap, TileLayer, watchUtils] = await loadModules(
                ['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/TileLayer', 'esri/core/watchUtils'],
                options,
            );

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

            const map01 = new Map({
                basemap,
            });
            const mapview01 = new MapView({
                container: 'top-left',
                map: map01,
                zoom: 10,
                center: [113.828185, 34.824426],
            });

            const map02 = new Map({
                basemap,
            });
            const mapview02 = new MapView({
                container: 'top-right',
                map: map02,
                zoom: 10,
                center: [113.828185, 34.824426],
            });

            const map03 = new Map({
                basemap,
            });
            const mapview03 = new MapView({
                container: 'bottom-left',
                map: map03,
                zoom: 10,
                center: [113.828185, 34.824426],
            });

            const map04 = new Map({
                basemap,
            });
            const mapview04 = new MapView({
                container: 'bottom-right',
                map: map04,
                zoom: 10,
                center: [113.828185, 34.824426],
            });

            mapview01.ui.components = [];
            mapview02.ui.components = [];
            mapview03.ui.components = [];
            mapview04.ui.components = [];

            // 地图联动
            watchUtils.whenTrue(mapview01, 'stationary', function () {
                // 当视图静止时获取视图的中心，啊啊啊，经度的英语是longitude，不是longtitude
                if (mapview01.center) {
                    mapview02.goTo({
                        center: [mapview01.center.longitude, mapview01.center.latitude],
                        zoom: mapview01.zoom, //这句生效
                    });
                    mapview03.goTo({
                        center: [mapview01.center.longitude, mapview01.center.latitude],
                        zoom: mapview01.zoom,
                    });
                    mapview04.goTo({
                        center: [mapview01.center.longitude, mapview01.center.latitude],
                        zoom: mapview01.zoom,
                    });
                }

                if (mapview01.extent) {
                    console.log(
                        '2',
                        mapview01.extent.xmin.toFixed(2),
                        mapview01.extent.xmax.toFixed(2),
                        mapview01.extent.ymin.toFixed(2),
                        mapview01.extent.ymax.toFixed(2),
                    ); //将视图01的四至输出，并保留两位数字，toFixed()返回的是字符串
                }
            });
        },
    },
};
</script>

<style>
.morescreen-view {
    width: 100%;
    height: 100%;
}
.map-item {
    width: calc(50% - 2.5px);
    height: 100%;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
}
.morescreen-top-view {
    width: 100%;
    height: calc(50% - 2.5px);
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5px;
}
.morescreen-bottom-view {
    width: 100%;
    /* height: calc(50% - 2.5px); */
    /* 运算符号前后必须要空格 */
    height: calc(50% - 2.5px);
    display: flex;
    justify-content: space-between;
    margin-top: 2.5px;
}
#top-left {
    margin-right: 2.5px;
}
#top-right {
    margin-left: 2.5px;
}
#bottom-left {
    margin-right: 2.5px;
}
#bottom-right {
    margin-left: 2.5px;
}
</style>
