<script setup lang="ts">
import { ref } from 'vue';

import PDFViewer from './PDFViewer.vue';
import SelectionLayer from './SelectionLayer.vue';
import PageController from './PDFPageControl.vue';

enum ZoomSetting { Out, In }

const scale = ref(1);
const selectedPage = ref(1);
const numPages = ref(0);

const updatePage = (transform: number) => {
    if (selectedPage.value + transform >= 1 && selectedPage.value + transform <= numPages.value)
        selectedPage.value += transform;
}

const zoom = (setting: ZoomSetting) => (setting === ZoomSetting.In) ? scale.value *= 1.1 : scale.value /= 1.1;

</script>

<template>
    <div id="canvas-control-group">
        <div id="workspace"
            @click.ctrl="zoom(ZoomSetting.In)"
            @contextmenu.ctrl="zoom(ZoomSetting.Out)">
            <div id="overflow-background"/>
            <SelectionLayer :scale="scale">
            <PDFViewer 
                :scale="scale"
                :selected-page="selectedPage"
                @numpages="$event => numPages = $event"/>
            </SelectionLayer>
        </div>
        <PageController :current-page="0" :max-page="0" v-if="numPages === 0"/>
        <PageController
        v-else
        :current-page="selectedPage"
        :max-page="numPages"
        @page-update="$event => updatePage($event)"/>
    </div>
</template>

<style scoped>
#overflow-background {
    position: fixed;
    background-color: lightgrey;
    width: 40vw;
    height: 90vh;
    z-index: -1;
}
#workspace {
    min-width: 40vw;
    max-width: 40vw;
    min-height: 90vh;
    max-height: 90vh;
    top: 0;
    overflow: auto;
    margin: auto;
    scrollbar-gutter: stable;
}
#canvas-control-group {
    display: flex;
    width: fit-content;
    flex-flow: column nowrap;
    align-items: flex-start;
}
</style>
