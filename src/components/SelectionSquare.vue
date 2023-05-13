<script setup lang="ts">
import { defineProps } from 'vue';

const { loc, color, id } = defineProps<{
    loc: [number, number];
    color: string;
    id: string;
}>();

</script>

<template>
    <div>a</div>
</template>