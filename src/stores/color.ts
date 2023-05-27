import { ref } from 'vue';
import { defineStore } from 'pinia';

import type Color from '../types/Color';

export const useColorStore = defineStore('color', () => {
    const color = ref<Color>({red: 0, green: 0, blue: 200});

    function update(newColor: Color) {
        const colorVal = color.value;
        colorVal.red = newColor.red;
        colorVal.green = newColor.green;
        colorVal.blue = newColor.blue;
    }

    function updateFromHex(hexString: string) {
        const parsedVals = hexString.match(/[0-9a-f][0-9a-f]/g);
        if (!(parsedVals && parsedVals.length === 3)) {
            console.error('Parsing hex color failed. Returning black color');
            return;
        }
        update({
            red: Number(parseInt(parsedVals[0], 16)),
            green: Number(parseInt(parsedVals[1], 16)),
            blue: Number(parseInt(parsedVals[2], 16)),
        });
    }

    return { color, update, updateFromHex };
});