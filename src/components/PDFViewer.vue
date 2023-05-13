<script setup lang="ts">
// @ts-ignore -- TODO: Non-ideal, will get to writing custom .d.ts file
import pdf from 'pdfvuer';
import { ref, defineProps, toRefs } from 'vue';

const props = defineProps<{
    scale?: Number,
    selectedPage: Number
}>();

const { scale, selectedPage } = toRefs(props);

const errorVisible = ref(false);

const pdfPath = "C:/Users/R/Documents/projects/vue-elec-test/local/Gravity.pdf";
</script>

<template>
    <pdf :src="pdfPath" 
        :page="selectedPage"
        :scale="scale"
        @error="() => errorVisible = true" 
        @numpages="($event: number) => $emit('numpages', $event)">
        <template slot="loading">
            <div class="loading-div">Loading!</div>
        </template>
        <div v-if="errorVisible">{{ "Error occured while loading pdf. File may be corrupt or ill-formatted" }}</div>
    </pdf>
</template>

<style scoped>
.loading-div {
    height: 800px;
    width: 500px;
    background-color: lightgrey;
}

</style>
