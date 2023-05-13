<script setup lang="ts">
import { reactive, ref, onMounted, defineProps } from 'vue';
import { v4 } from 'uuid';

// const props = defineProps<{
//     selectionActive: boolean,
// }>();

type Selection = {
    locX: number;
    locY: number;
    color: string;
    id: string;
    key: string;
}

const state = reactive<{
        selections: Selection[],
        isDragging: boolean,
    }>({
    selections: [],
    isDragging: false,
});
const selectionElement = ref<HTMLDivElement | null>(null);

let previewElement:  HTMLDivElement | undefined;
let displace: number[] = [];
let origin: number[] = [];
let endX: number[] = [];

const startSelection = (event: MouseEvent) => {
    console.log('start selection');
    updateDisplacement();
    state.isDragging = true;
    origin[0] = event.clientX;
    origin[1] = event.clientY;
    if (selectionElement.value) {
        console.log('selection elem exists');
        previewElement = document.createElement('div');
        previewElement.style.backgroundColor = 'rgba(255,0,0,0.5)';
        previewElement.style.position = 'absolute';
        previewElement.style.zIndex = "1";
        previewElement.style.width = "10px";
        previewElement.style.height = "10px";
        selectionElement.value.prepend(previewElement);
        previewElement.style.top = String(Math.abs(origin[1] - displace[1])) + "px";
        previewElement.style.left = String(Math.abs(origin[0] - displace[0])) + "px";
    }
};

const dragSelection = (event: MouseEvent) => {
    if (state.isDragging) {
        console.log('drag selection');
        if (previewElement) {
            const dx = event.clientX - origin[0];
            const dy = event.clientY - origin[1];
            
            if (dx < 0) {
                const newLeft = event.clientX - displace[0];
                previewElement.style.left = String(newLeft) + "px";
                previewElement.style.width = String(origin[0] - newLeft - displace[0]) + "px";
                console.log([newLeft, origin[0], previewElement.style.width]);
            } else {
                previewElement.style.width = String(event.clientX - origin[0]) + "px";
            }

            if (dy < 0) {
                const newTop = event.clientY - displace[1];
                previewElement.style.top = String(newTop) + "px";
                previewElement.style.height = String(origin[1] - newTop - displace[1]) + "px";
                console.log([newTop, origin[1], previewElement.style.height]);
            } else {
                previewElement.style.height = String(event.clientY - origin[1]) + "px";
            }
        }
    } 
};

const endSelection = (event: MouseEvent) => {
    state.isDragging = false;
};

const updateDisplacement = () => {
    if (selectionElement.value) {
        const boundingRect = selectionElement.value.getBoundingClientRect();
        displace[0] = boundingRect.left;
        displace[1] = boundingRect.top;
    }
}

onMounted(() => updateDisplacement());

</script>

<template>
    <div class="selection-container"
        ref="selectionElement"
        @mousedown="startSelection"
        @mousemove="dragSelection"
        @mouseup="endSelection"
        @mouseleave="endSelection">
        <div v-for="selection in state.selections">
            <SelectionSquare 
                :locX="selection.locX"
                :locY="selection.locY"
                :color="selection.color"
                :id="selection.id"/>
        </div>
        <slot />
    </div>
</template>

<style scoped>
.selection-container {
    position: relative;
    display: inline-block;
}
</style>