<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';

import RenderCanvas from './RenderCanvas.vue';
import Toolbar from './Toolbar.vue';

export type Color = {
    red: number,
    green: number,
    blue: number,
};

type CategoryData = {
    id: string,
    name: string,
    color: Color
}

// categories are key = category id / value = CategoryData type
const categories: [CategoryData?] = [];
const activeColor = ref<Color>({ red: 255, green: 255, blue: 0 });

const doesNameExist = (name: string) => {
    if (categories.length === 0) return false;
    return !!categories.filter((catData) => {
        if (!catData) return false;
        return (catData.name === name);
    }).length;
}

const createCategory = (name: string, color: Color) => {
    if (doesNameExist(name)) {
        throw Error('Name already exists.');
    }

    categories.push({
        id: uuid(),
        name: name,
        color: color,
    });
}

</script>

<template>
    <div id="render-comp">
        <RenderCanvas :active-color="activeColor" />
        <Toolbar @change-color="(color) => activeColor = color"/>

    </div>
</template>

<style scoped>
#render-comp {
    display: flex;
    flex-flow: row nowrap;
}
</style>
