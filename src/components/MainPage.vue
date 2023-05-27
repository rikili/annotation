<script setup lang="ts">
import { v4 as uuid } from 'uuid';

import type CategoryData from '../types/CategoryData';

import { useColorStore } from '../stores/color';

import RenderCanvas from './RenderCanvas.vue';
import Toolbar from './Toolbar.vue';

const colorStore = useColorStore();
const categories: [CategoryData?] = [];

const doesNameExist = (name: string) => {
    if (categories.length === 0) return false;
    return !!categories.filter((catData) => {
        if (!catData) return false;
        return (catData.name === name);
    }).length;
}

const createCategory = (name: string) => {
    if (doesNameExist(name)) {
        throw Error('Name already exists.');
    }

    categories.push({
        id: uuid(),
        name: name,
        color: colorStore.color,
    });
}

</script>

<template>
    <div id="render-comp">
        <RenderCanvas />
        <Toolbar />

    </div>
</template>

<style scoped>
#render-comp {
    display: flex;
    flex-flow: row nowrap;
}
</style>
