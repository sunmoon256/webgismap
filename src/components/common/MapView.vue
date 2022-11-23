<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemaptoggle"></div>
        <div id="scalbar"></div>
        <div id="zoom"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};

export default {
    name: 'MapView',
    components: {},
    mounted: function () {
        // console.log(this.$store.state._defaultView);
        this._createMapView();
    },
    methods: {
        async _createMapView() {
            const [Map, Mapview, Basemap, TileLayer, BasemapToggle, ScaleBar, Zoom] = await loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    'esri/widgets/BasemapToggle',
                    'esri/widgets/ScaleBar',
                    'esri/widgets/Zoom',
                ],
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

            const map = new Map({
                basemap,
            });

            const view = new Mapview({
                container: 'mapview',
                map: map,
                zoom: 14,
                center: [113.828185, 34.824426],
                // center:[113.688266,34.77982],//郑州市中心12级
            });

            // 添加底图切换控件
            const basemapToggle = new BasemapToggle({
                view: view,
                nextBasemap: 'hybrid',
                container: 'basemaptoggle',
            });
            view.ui.add(basemapToggle);

            // 添加比例尺
            const scaleBar = new ScaleBar({
                view: view,
                unit: 'metric',
                container: 'scalbar',
            });
            view.ui.add(scaleBar);

            // 添加缩放控件
            const zoom = new Zoom({
                view: view,
                container: 'zoom',
            });
            view.ui.add(zoom);

            view.ui.components = [];
            // console.log('test测试');
            this.$store.commit('_setDefaultView', view);
        },
    },
};
</script>

<style>
.mapview-pannel,
#mapview {
    position: relative;
    height: 100%;
    width: 100%;
}
#basemaptoggle {
    position: absolute;
    right: 15px;
    bottom: 15px;
}
#scalbar {
    position: absolute;
    left: 15px;
    bottom: 15px;
}
#zoom {
    position: absolute;
    right: 15px;
    bottom: 100px;
}
</style>
