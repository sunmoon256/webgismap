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
                <el-dropdown-item icon="el-icon-reading" command="mapprint">地图打印</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="clearscreen">清屏</span>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};

export default {
    name: 'MapTools',
    mounted: function () {
        // setInterval(code，millisec)： 间隔指定的毫秒数不停地执行指定的代码，定时器
        const checkView = setInterval(() => {
            if (this.$store.getters._getDefaultView) {
                this.initSketchTool();
                // clearInterval()： 用于停止 setInterval() 方法执行的函数代码
                clearInterval(checkView);
            }
        });
    },
    methods: {
        // 初始化绘制工具---------有一个问题，为什么graphicsLayer与sketchViewModel都没有被定义，加上_self却都能使用了呢
        async initSketchTool() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            // 1.绘制面状区域
            const [SketchViewModel, GraphicsLayer] = await loadModules(
                ['esri/widgets/Sketch/SketchViewModel', 'esri/layers/GraphicsLayer'],
                options,
            );

            const resultLayer = view.map.findLayerById('polygonGraphicLayer');
            if (resultLayer) view.map.remove(resultLayer);

            _self.graphicsLayer = new GraphicsLayer({
                id: 'polygonGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            view.map.add(_self.graphicsLayer);

            const polygonSymbol = {
                type: 'simple-fill',
                color: 'rgba(216,30,6,0.4)',
                style: 'solid',
                outline: {
                    color: '#d81e06',
                    width: 1,
                },
            };
            _self.sketchViewModel = new SketchViewModel({
                updateOnGraphicClick: false,
                view,
                layer: _self.graphicsLayer,
                polygonSymbol,
            });
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
                    this.handleClearMap();
                    break;
            }
        },
        handleCommand(command) {
            switch (command) {
                case 'distance':
                    this.initDistance();
                    break;
                case 'area':
                    this.initArea();
                    break;
                case 'spacequery':
                    this.initSpaceQuery();
                    break;
                case 'morescreen':
                    this.$router.push('/onemap/morescreen');
                    break;
                case 'swipeana':
                    this.initSwipe();
                    break;
                case 'mapprint':
                    this._initMapPrint();
                    break;
                default:
                    break;
            }
        },
        openXZQDHPannel() {
            let currentVisible = this.$store.getters._getDefaultXZQDHVisible;
            this.$store.commit('_setDefaultXZQDHVisible', !currentVisible);
        },
        openMapTreePannel() {
            let currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
            console.log(currentVisible);
        },
        // 地图距离测量
        async initDistance() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            const [DistanceMeasurement2D] = await loadModules(['esri/widgets/DistanceMeasurement2D'], options);
            if (this.measurementWidget) this.measurementWidget.destroy();
            this.measurementWidget = new DistanceMeasurement2D({
                view,
            });
            view.ui.add(this.measurementWidget, 'top-left');
        },

        // 地图面积测量
        async initArea() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            const [AreaMeasurement2D] = await loadModules(['esri/widgets/AreaMeasurement2D'], options);

            if (this.measurementWidget) this.measurementWidget.destroy();
            this.measurementWidget = new AreaMeasurement2D({
                view,
            });
            view.ui.add(this.measurementWidget, 'top-left');
        },
        // 初始化空间查询
        async initSpaceQuery() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            const [Graphic, GraphicsLayer] = await loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer'], options);

            const resultLayer = view.map.findLayerById('polygonGraphicLayer');
            if (resultLayer) view.map.remove(resultLayer);
            _self.graphicsLayer = new GraphicsLayer({
                id: 'polygonGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            view.map.add(_self.graphicsLayer);

            _self.sketchViewModel.create('polygon');

            _self.sketchViewModel.on('create-complete', function (event) {
                const graphic = new Graphic({
                    geometry: event.geometry,
                    symbol: _self.sketchViewModel.graphic.symbol, //这句话是什么意思？
                });
                _self.graphicsLayer.add(graphic);
            });
            _self.sketchViewModel.on('create', function (event) {
                if (event.state === 'complete') {
                    // 执行空间查询
                    _self.handleSpaceQuery(event.graphic);
                }
            });
        },
        handleSpaceQuery(graphic) {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;

            const resultLayer = view.map.findLayerById('layid');
            if (!resultLayer) {
                _self.$message({
                    message: '尚未添加业务图层，不能及进行空间查询',
                    type: 'warning',
                });
                return;
            }

            const queryPoint = resultLayer.createQuery();
            queryPoint.geometry = graphic.geometry;
            resultLayer
                .queryFeatures(queryPoint)
                .then(function (results) {
                    let currentData = [];
                    if (results.features.length > 0) {
                        // 符号化渲染图层
                        _self.renderResultLayer(results.features);
                        //实例化表格数据
                        results.features.map((item, index) => {
                            currentData.push({
                                name: item.attributes.name,
                                type: item.attributes.style,
                                tieluju: item.attributes.tieluju,
                                address: item.attributes.address,
                                lon: item.attributes.lon,
                                lat: item.attributes.lat,
                                key: index,
                            });
                        });
                    } else {
                        currentData.length = 0;
                    }
                    _self.$message({
                        message: `查询成功，共查到 ${results.features.length} 条数据`,
                        type: 'success',
                    });
                    _self.$store.commit('_setDefaultSQResult', currentData);
                    _self.$store.commit('_setDefaultSQResultVisible', true);
                })
                .catch(function (error) {
                    console.log(error);
                    _self.$message.error('空间查询失败，请联系管理员');
                });
        },
        async renderResultLayer(resultFeatures) {
            const view = this.$store.getters._getDefaultView;
            const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'], options);
            const resultLayer = view.map.findLayerById('initResultLayer');
            if (resultLayer) view.map.remove(resultLayer);
            const resultData = this._translateLonLat(resultFeatures);
            //实例化弹窗
            let template = {
                title: '{name}-{tieluju}',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: [
                            {
                                fieldName: 'name',
                                label: '名称',
                            },
                            {
                                fieldName: 'type',
                                label: '类型',
                            },
                            {
                                fieldName: 'tieluju',
                                label: '铁路局',
                            },
                            {
                                fieldName: 'address',
                                label: '地址',
                            },
                        ],
                    },
                ],
            };
            const queryResultLayer = new FeatureLayer({
                source: resultData,
                id: 'initResultLayer',
                objectIdField: 'ObjectID',
                renderer: {
                    type: 'simple', // autocasts as new SimpleRenderer()
                    symbol: {
                        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                        url: `static/icon/train.png`,
                        width: '32px',
                        height: '32px',
                    },
                },
                // 这里的fields跟resultData的属性字段有什么不同？，但应该是与template里面的fields是对应的
                fields: [
                    {
                        name: 'ObjectID',
                        type: 'oid',
                    },
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'type',
                        type: 'string',
                    },
                    {
                        name: 'tieluju',
                        type: 'string',
                    },
                    {
                        name: 'address',
                        type: 'string',
                    },
                ],
                popupTemplate: template, //弹窗应用提前设置好的模板样式
            });
            view.map.add(queryResultLayer);
        },
        //处理经纬度数据，返回features
        _translateLonLat(data) {
            const _self = this;
            if (data.length > 0) {
                _self.geoData = [];
                data.map((value, key) => {
                    _self.geoData.push({
                        geometry: {
                            type: 'point',
                            x: Number(value.attributes.lon),
                            y: Number(value.attributes.lat),
                        },
                        attributes: {
                            ObjectID: key + 1,
                            name: value.attributes.name,
                            type: value.attributes.style,
                            tieluju: value.attributes.tieluju,
                            address: value.attributes.address,
                        },
                    });
                });
            }
            return _self.geoData;
        },

        // 卷帘分析
        async initSwipe() {
            const _self = this;
            const view = this.$store.getters._getDefaultView;
            const [Swipe] = await loadModules(['esri/widgets/Swipe'], options);
            const topLayer = view.map.findLayerById('swipeLayerTop');
            const bottomLayer = view.map.findLayerById('swipeLayerBottom');
            if (topLayer && bottomLayer) {
                _self.swipe = new Swipe({
                    leadingLayers: [topLayer],
                    trailingLayers: [bottomLayer],
                    position: 50,
                    view: view,
                });
                // 地图控件都是通过ui添加的
                view.ui.add(_self.swipe);
            } else {
                _self.message({
                    message: '请至少添加两张业务图层',
                    type: 'warning',
                });
                return;
            }
        },

        // 地图打印
        async _initMapPrint() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            const [PrintTask, PrintTemplate, PrintParameters] = await loadModules(
                ['esri/tasks/PrintTask', 'esri/tasks/support/PrintTemplate', 'esri/tasks/support/PrintParameters'],
                options,
            );
            let printTask = new PrintTask({
                url: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
                // 使用别人的GP服务是可以的吗，答案是可以的
            });

            let template = new PrintTemplate({
                format: 'pdf',
                exportOptions: {
                    dpi: 100,
                },
                layout: 'a4-portrait',
                layoutOptions: {
                    titleText: '地图出图demo',
                    authorText: 'unalome',
                    customTextElements: [{ location: '河南省-郑州市' }, { date: '25/03/2023,21:1:13 AM' }],
                },
            });

            let params = new PrintParameters({
                view: view,
                template: template,
            });

            printTask.execute(params).then((printResult, printError) => {
                console.log(printResult, printError);
                if (printResult.url) window.open(printResult.url);
                if (printError) this.$message.error('地图打印失败'); //不懂，这也是输出message的一种方式吗
            });
        },
        // 清屏
        handleClearMap() {
            const view = this.$store.getters._getDefaultView;
            const resultLayer1 = view.map.findLayerById('swipeLayerTop');
            const resultLayer2 = view.map.findLayerById('swipeLayerBottom');
            const resultLayer3 = view.map.findLayerById('layid');
            const resultLayer4 = view.map.findLayerById('initResultLayer');
            if (resultLayer1) view.map.remove(resultLayer1);
            if (resultLayer2) view.map.remove(resultLayer2);
            if (resultLayer3) view.map.remove(resultLayer3);
            if (resultLayer4) view.map.remove(resultLayer4);
            if (this.swipe) this.swipe.destroy();
            if (this.measurementWidget) this.measurementWidget.destroy();
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
