<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';

import { type Color } from './MainPage.vue';

let timer: number;
const debounce = (callback: Function, time: Number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(callback, timer);
}

const emit = defineEmits(['changeColor']);
const colorSelector = ref<HTMLInputElement | null>();

const selectedColor = ref("#0000FF");

const hexToColor = (hexString: string): Color => {
    const parsedVals = hexString.match(/[0-9a-f][0-9a-f]/g);
    if (!(parsedVals && parsedVals.length === 3)) {
        console.error('Parsing hex color failed. Returning black color');
        return { red: 0, green: 0, blue: 0 };
    }
    return {
        red: Number(parseInt(parsedVals[0], 16)),
        green: Number(parseInt(parsedVals[1], 16)),
        blue: Number(parseInt(parsedVals[2], 16)),
    }
}

watch(selectedColor, (newSelection) => {
    debounce(() => emit('changeColor', hexToColor(newSelection)), 400);
});

</script>

<template>
    <div id="color-picker" :style="{backgroundColor: selectedColor}" @click="colorSelector?.click()">
        <input type="color" v-model="selectedColor" ref="colorSelector" :value="selectedColor">
    </div>
</template>

<style scoped>
    input {
        position: relative;
        border: 0;
        visibility: hidden;
    }
    
</style>