<template>
    <div class="datavisual-page">
        <MapDataVisual />
    </div>
</template>

<script>
import MapDataVisual from '@/components/MapDataVisual.vue';

export default {
    name: 'DataVisual',
    components: { MapDataVisual },
    mounted: function () {
        this._createScenceView();
    },
    methods: {},
};
</script>

<style>
.datavisual-page {
    width: 100%;
    height: 100%;
}
</style>
