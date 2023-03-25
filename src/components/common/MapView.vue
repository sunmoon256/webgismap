<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemaptoggle"></div>
        <div id="scalbar"></div>
        <div id="zoom"></div>
        <div class="view-change" @click="handleViewChange">
            <span>{{ viewModel }}</span>
        </div>
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
    data() {
        return {
            viewModel: '3D',
        };
    },
    mounted: function () {
        // console.log(this.$store.state._defaultView);
        this._createMapView();
    },
    methods: {
        // 创建地图视图，将需要用到的API模块加载进来，再应用相应的模块开发需要的功能
        async _createMapView() {
            // 删除标签内的全部内容
            document.getElementById('basemaptoggle').innerHTML = '';
            document.getElementById('scalbar').innerHTML = '';
            document.getElementById('zoom').innerHTML = '';
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

            // 定义底图数据
            const map = new Map({
                basemap,
            });

            // 实例化视图控件，并将控件绑定到容器上
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

            // 添加比例尺，绑定到容器上
            const scaleBar = new ScaleBar({
                view: view,
                unit: 'metric',
                container: 'scalbar',
            });
            view.ui.add(scaleBar);

            // 添加缩放控件，绑定到容器上
            const zoom = new Zoom({
                view: view,
                container: 'zoom',
            });
            view.ui.add(zoom);

            view.ui.components = []; //清空view中自带的控件
            // console.log('test测试');
            this.$store.commit('_setDefaultView', view);
        },
        // 创建三维视图
        async _createScenceView() {
            document.getElementById('basemaptoggle').innerHTML = '';
            document.getElementById('scalbar').innerHTML = '';
            document.getElementById('zoom').innerHTML = '';
            const [Map, SceneView, Basemap, TileLayer] = await loadModules(
                ['esri/Map', 'esri/views/SceneView', 'esri/Basemap', 'esri/layers/TileLayer'],
                options,
            );

            let basemap = new Basemap({
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

            const sceneView = new SceneView({
                container: 'mapview',
                map: map,
            });

            // setTimeout() 是属于 window 的方法，该方法用于在指定的毫秒数后调用函数或计算表达式。
            setTimeout(() => {
                sceneView.goTo({
                    center: [113.828185, 34.824426],
                    zoom: 10,
                });
            }, 3000);

            sceneView.ui.components = [];

            this.$store.commit('_setDefaultView', sceneView);
        },
        // 二三维切换
        handleViewChange() {
            if (this.viewModel === '3D') {
                this._createScenceView();
                this.viewModel = '2D';
            } else {
                this._createMapView();
                this.viewModel = '3D';
            }
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
.view-change {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 15px;
    bottom: 180px;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
}
.view-change {
    line-height: 32px;
}
</style>
