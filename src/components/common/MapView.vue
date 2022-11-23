<template>
    <div id="mapview"></div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
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
            const [Map, Mapview] = await loadModules(['esri/Map', 'esri/views/MapView'], options);

            const map = new Map({
                basemap: 'osm',
            });
            const view = new Mapview({
                container: 'mapview',
                map: map,
                zoom: 14,
                center: [113.828185, 34.824426],
                // center:[113.688266,34.77982],//郑州市中心12级
            });

            view.ui.components = [];
            // console.log('test测试');
            this.$store.commit('_setDefaultView', view);
        },
    },
};
</script>

<style>
#mapview {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
