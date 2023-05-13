<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue';

const props = defineProps<{
    currentPage: Number,
    maxPage: Number
}>();

const { currentPage, maxPage } = toRefs(props);

const backDisabled = computed(() => currentPage.value === 1);
const forwardDisabled = computed(() => currentPage.value === maxPage.value);
</script>

<template>
    <div class="pdf-controls">
        <button :disabled="backDisabled" @click="$emit('page-update', -1)">Back</button>
        <div>
            {{ `${currentPage} / ${maxPage}` }}
        </div>
        <button :disabled="forwardDisabled" @click="$emit('page-update', 1)">Forward</button>
    </div>
</template>

<style scoped>
.pdf-controls {
    display: flex;
    flex-flow: row nowrap;
    background-color: rgba(80, 80, 80, 0.7);
    margin: auto;
}

</style>