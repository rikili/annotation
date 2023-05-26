<script setup lang="ts">
import { reactive, ref, toRefs, onMounted, defineProps } from 'vue';
import { v4 } from 'uuid';

import { type Color } from './MainPage.vue';
import SelectionSquare from './SelectionSquare.vue';

const props = defineProps<{
    activeColor?: Color,
}>();

const { activeColor } = toRefs(props);

const defaultSelection = 'rgba(65,111,240,0.6)'
const colorToString = (color: Color) => {
    console.log('asdfasd');
    return `rgba(${color.red},${color.green},${color.blue},0.5)`;
};

// const convertedActive = (activeColor && !!activeColor.value) ? colorToString(activeColor.value) : 'rgba(0,0,255,1)';

// const stringToColor = (cssColor: string): Color => {
//     const parseColor = cssColor.match(/[0-9]+/g);
//     if (!parseColor) throw Error('Invalid color string inputted');
//     return {
//         red: Number(parseColor[0]),
//         green: Number(parseColor[1]),
//         blue: Number(parseColor[2])
//     };
// };

type Selection = {
    loc: [number, number];
    size: [number, number];
    color: Color;
    id: string;
    key: string;
};

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

const startSelection = (event: MouseEvent) => {
    updateDisplacement();
    state.isDragging = true;
    origin[0] = event.clientX;
    origin[1] = event.clientY;
    if (selectionElement.value) {
        previewElement = document.createElement('div');
        previewElement.className = "selection-preview";
        previewElement.style.backgroundColor = (activeColor && activeColor.value) ? colorToString(activeColor.value) : defaultSelection;
        selectionElement.value.prepend(previewElement);
        previewElement.style.top = String(Math.abs(origin[1] - displace[1])) + "px";
        previewElement.style.left = String(Math.abs(origin[0] - displace[0])) + "px";
    }
};

const dragSelection = (event: MouseEvent) => {
    if (state.isDragging) {
        if (previewElement) {
            const dx = event.clientX - origin[0];
            const dy = event.clientY - origin[1];
            
            if (dx < 0) {
                const newLeft = event.clientX - displace[0];
                previewElement.style.left = String(newLeft) + "px";
                previewElement.style.width = String(origin[0] - newLeft - displace[0]) + "px";
            } else {
                previewElement.style.width = String(event.clientX - origin[0]) + "px";
            }

            if (dy < 0) {
                const newTop = event.clientY - displace[1];
                previewElement.style.top = String(newTop) + "px";
                previewElement.style.height = String(origin[1] - newTop - displace[1]) + "px";
            } else {
                previewElement.style.height = String(event.clientY - origin[1]) + "px";
            }
        }
    } 
};

const resetCoords = () => {
    displace = [];
    origin = [];
};

const makeSelection = (relativeCoords: [number, number], size: [number, number]) => {
    if (!(activeColor && activeColor.value)) return;
    state.selections.push({
        loc: relativeCoords,
        size: size,
        color: activeColor.value, // TODO: fix when color system is added
        id: v4(),
        key: `select-${relativeCoords[0]}${relativeCoords[1]}`
    });
    console.log(state.selections);
};

const extractNumbers = (input: string) => Number(input.match(/[0-9]+/));

const endSelection = (didLeaveComp: boolean = false) => {
    state.isDragging = false;
    if (didLeaveComp) {
        resetCoords();
        return;
    }
    if (!activeColor) return;
    if (previewElement) {
        makeSelection(
            [extractNumbers(previewElement.style.left), extractNumbers(previewElement.style.top)],
            [extractNumbers(previewElement.style.width), extractNumbers(previewElement.style.height)]
        );
        // previewElement.remove();
    }
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
        @mouseup="endSelection()"
        @mouseleave="endSelection(true)">
        <template v-for="selection in state.selections">
            <SelectionSquare 
                :loc="selection.loc"
                :size="selection.size"
                :color="selection.color"
                :id="selection.id"/>
        </template>
        <slot />
    </div>
</template>

<style scoped>
.selection-container {
    position: relative;
    display: inline-block;
}
</style>

<style>
.selection-preview {
    position: absolute;
    z-index: 1;
}
</style>