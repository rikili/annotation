<script setup lang="ts">
import ColorPicker from './ColorPicker.vue';
</script>

<template>
    <div id="toolbar-container">
        <ColorPicker @change-color="(color) => $emit('change-color', color)"/>
    </div>
</template>

<style scoped>
    #toolbar-container {
        display: flex;
        flex-flow: column nowrap;
        background-color: darkgrey;
        padding: 0.5em;
    }
</style>