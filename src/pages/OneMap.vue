<template>
    <div class="onemap-page">
        <MapView />
        <MapTools />
        <MapTree />
        <XZQDHComponent />
    </div>
</template>

<script>
import MapView from '../components/common/MapView';
import MapTools from '../components/MapTools';
import MapTree from '@/components/MapTree';
import XZQDHComponent from '@/components/XZQDHComponent';

export default {
    name: 'OneMap',
    components: {
        MapView,
        MapTools,
        MapTree,
        XZQDHComponent,
    },
    methods: {},
};
</script>

<style>
.onemap-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
