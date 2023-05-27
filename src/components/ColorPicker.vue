<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useColorStore } from '../stores/color';

const DEBOUNCE_TIME = 400;

const colorStore = useColorStore();
const { color } = storeToRefs(colorStore);

const colorSelector = ref<HTMLInputElement | null>();

let timer: number;
const debounce = (callback: Function, time: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(callback, time);
}

const toTwoHexDigits = (decimal: number) => {
    const hexValue = decimal.toString(16);
    if (hexValue.length === 1) {
        return `0${hexValue}`;
    }
    return hexValue;
}
const hexActiveColor = () => {
    return `#${toTwoHexDigits(color.value.red)}${toTwoHexDigits(color.value.green)}${toTwoHexDigits(color.value.blue)}`;
};

const selectedColor = ref(hexActiveColor());

watch(selectedColor, (newSelection) => {
    debounce(() => colorStore.updateFromHex(newSelection), DEBOUNCE_TIME);
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
