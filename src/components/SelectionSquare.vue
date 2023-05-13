<script setup lang="ts">
import { defineProps } from 'vue';

const { locX, locY, color, id } = defineProps<{
    locX: number;
    locY: number;
    color: string;
    id: string;
}>();

</script>

<template>
    <div>a</div>
</template>