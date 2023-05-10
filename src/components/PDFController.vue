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
    <div>
        <button :disabled="backDisabled" @click="$emit('page-update', -1)">Back</button>
        <div>
            {{ `${currentPage} / ${maxPage}` }}
        </div>
        <button :disabled="forwardDisabled" @click="$emit('page-update', 1)">Forward</button>
    </div>
</template>