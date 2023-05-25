<script setup lang="ts">
import { defineProps } from 'vue';

const { loc, size, color, id } = defineProps<{
    loc: [number, number];
    size: [number, number];
    color: string;
    id: string;
}>();

const toUnitString = (value: number) => `${value}px`;

</script>

<template>
    <div class="selection-square" :style="{
        position: 'absolute',
        width: toUnitString(size[0]),
        height: toUnitString(size[1]),
        left: toUnitString(loc[0]),
        top: toUnitString(loc[1]),
        backgroundColor: color,
        zIndex: 1
    }" />
</template>