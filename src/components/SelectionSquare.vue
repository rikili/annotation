<script setup lang="ts">
import { defineProps } from 'vue';

import { type Color } from './MainPage.vue';

const { loc, size, color, id } = defineProps<{
    loc: [number, number];
    size: [number, number];
    color: Color;
    id: string;
}>();

const colorToString = (color: Color) => {
    return `rgba(${color.red},${color.green},${color.blue},1)`;
}

const toUnitString = (value: number) => `${value}px`;

console.log(colorToString(color));

</script>

<template>
    <div class="selection-square" :style="{
        position: 'absolute',
        width: toUnitString(size[0]),
        height: toUnitString(size[1]),
        left: toUnitString(loc[0]),
        top: toUnitString(loc[1]),
        backgroundColor: colorToString(color),
        zIndex: 1
    }" />
</template>