<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <div class="maptree-header">
            <span>图层管理</span>
            <i class="el-icon-close" @click="closeMapTreePannel"></i>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};

export default {
    name: 'MapTree',
    components: {},
    data() {
        return {
            data: [
                {
                    label: '底图数据',
                    children: [
                        {
                            label: '蓝色系地图',
                            layid: 'layid',
                            layurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        },
                        {
                            label: '暖色系地图',
                            layid: 'layid',
                            layurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        },
                        {
                            label: '灰色系地图',
                            layid: 'layid',
                            layurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                        },
                    ],
                },
                {
                    label: '行政区划数据',
                    children: [
                        {
                            label: '省数据',
                            layid: 'layid',
                            layurl: 'http://localhost:6080/arcgis/rest/services/test/province/FeatureServer',
                        },
                        {
                            label: '市数据',
                            layid: 'layid',
                            layurl: 'http://localhost:6080/arcgis/rest/services/test/city/FeatureServer',
                        },
                        {
                            label: '县数据',
                            layid: 'layid',
                            layurl: 'http://localhost:6080/arcgis/rest/services/test/county/FeatureServer/0',
                        },
                    ],
                },
                {
                    label: '业务图层',
                    children: [
                        {
                            label: '火车站点数据 WGS84',
                            layid: 'layid',
                            layurl: 'http://localhost:6080/arcgis/rest/services/test2/trainstation_wgs84/FeatureServer',
                        },
                        {
                            label: '火车站点数据 WebMercator',
                            layid: 'layid',
                            layurl: 'http://localhost:6080/arcgis/rest/services/test2/trainstation_web/FeatureServer',
                        },
                        {
                            label: '卷帘分析 top',
                            layid: 'swipeLayerTop',
                            layurl: 'http://localhost:6080/arcgis/rest/services/test/province/FeatureServer',
                        },
                        {
                            label: '卷帘分析 bottom',
                            layid: 'swipeLayerBottom',
                            layurl: 'http://localhost:6080/arcgis/rest/services/test/city/FeatureServer',
                        },
                    ],
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        };
    },
    methods: {
        async handleNodeClick(data) {
            console.log(data);
            if (data.layurl) {
                // 删除已添加的图层
                // 卷帘分析的图层可以无限次的添加，会降低网站的显示效果
                // 应该设置删除已经添加的卷帘分析的图层
                const view = this.$store.getters._getDefaultView;
                const resultLayer = view.map.findLayerById(data.layid);
                if (resultLayer) {
                    view.map.remove(resultLayer);
                }

                // 处理不同的服务类型
                const [TileLayer, FeatureLayer] = await loadModules(
                    ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
                    options,
                );
                let layer = ''; //layer难道是一个字符串吗，他不是用类实例化的时候放在大括号里了吗
                const linkSplit = data.layurl.split('/');
                const serverType = linkSplit[linkSplit.length - 1];
                switch (serverType) {
                    case 'MapServer':
                        layer = new TileLayer({ url: data.layurl, id: data.layid });
                        break;
                    case 'FeatureServer':
                        layer = new FeatureLayer({ url: data.layurl, id: data.layid });
                        break;
                }

                view.map.add(layer);
            }
        },
        closeMapTreePannel() {
            // const currentVisible = this.$store.getters._defaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', false);
        },
    },
};
</script>

<style>
.maptree-pannel {
    position: absolute;
    width: 240px;
    height: 300px;
    top: 20px;
    left: 15px;
    background-color: #fff;
}
.maptree-header {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.maptree-header > span {
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
}
.maptree-header > i {
    line-height: 35px;
    cursor: pointer;
}
</style>
