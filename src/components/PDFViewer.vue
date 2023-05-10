<script setup lang="ts">
// @ts-ignore -- TODO: Non-ideal, will get to writing custom .d.ts file
import pdf from 'pdfvuer';
import { ref } from 'vue';

import Controller from './PDFController.vue';

const numPages = ref(0);
const selectedPage = ref(1);
const errorVisible = ref(false);

const pdfPath = "C:/Users/R/Documents/projects/vue-elec-test/local/Gravity.pdf";

const updatePage = (transform: number) => {
    if (selectedPage.value + transform >= 1 && selectedPage.value + transform <= numPages.value)
        selectedPage.value += transform;
}
</script>

<template>
    <pdf :src="pdfPath" 
        :page="selectedPage" 
        @error="() => errorVisible = true" 
        @numpages="($event: number) => numPages=$event">
        <template slot="loading">
            <div>Loading!</div>
        </template>
        <div v-if="errorVisible">{{ "Error occured while loading pdf. File may be corrupt or ill-formatted" }}</div>
    </pdf>

    <Controller 
        :current-page="selectedPage"
        :max-page="numPages"
        @page-update="$event => updatePage($event)"/>
</template>

<style scoped>

</style>
