import React, { useState } from 'react';
import './ColorPicker.css';
import { ICONS } from '../../../Utils/constants';

// Helper function to generate a Color grid with more combinations (20x30 grid)
const generateColorGrid = (rows, cols) => {
    const colors = [];
    const hueStep = 360 / cols; // Spread hues across the columns (360°)
    const saturationStep = 100 / rows; // Spread saturation across rows (0% to 100%)
    const lightnessStep = 50; // Keep lightness at 50% for uniformity

    const minSaturation = 5;  // Set a minimum saturation to avoid gray colors

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const hue = j * hueStep; // Vary the hue across columns
            const saturation = Math.max(i * saturationStep, minSaturation); // Avoid saturation of 0 (gray)
            const lightness = 50; // Uniform lightness (50%)

            const color = hslToHex(hue, saturation, lightness); // Convert HSL to Hex color
            colors.push(color);
        }
    }
    return colors;
};

// Helper function to convert HSL to Hex
const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
        g = 0,
        b = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Function to generate lighter and darker color variants
const generateColorVariants = (color) => {
    const variants = [];
    const hslColor = hexToHsl(color);

    // Lighter and Darker Variants by adjusting the Lightness (50%, 60%, 70%, 80% for lighter, and 40%, 30%, 20%, 10% for darker)
    const lightnessVariants = [10, 20, 30, 40, 50, 60, 70, 80];

    lightnessVariants.forEach(lightness => {
        const newColor = hslToHex(hslColor.hue, hslColor.saturation, lightness);
        variants.push(newColor);
    });

    return variants;
};

// Helper function to convert Hex to HSL
const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // Achromatic case
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }

    return { hue: Math.round(h * 360), saturation: Math.round(s * 100), lightness: Math.round(l * 100) };
};

const ColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [rgb, setRgb] = useState('rgb(255, 255, 255)');
    const [hsl, setHsl] = useState('hsl(0, 0%, 100%)');

    const colorGrid = generateColorGrid(20, 30); // Create a 20x30 grid of colors, spanning the full range

    // Function to handle color selection
    const handleColorSelect = (color) => {
        setSelectedColor(color);
        console.log(`Selected Color: ${color}`);

        // Convert Hex to RGB for displaying
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        setRgb(`rgb(${r}, ${g}, ${b})`);
        setHsl(`hsl(0, 0%, 100%)`); // You can generate HSL based on the selected hex here
    };

    // Function to handle color change from input
    const handleColorChange = (e) => {
        const color = e.target.value;
        setSelectedColor(color);
        console.log(`Selected Color: ${color}`);

        // Convert Hex to RGB for displaying
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        setRgb(`rgb(${r}, ${g}, ${b})`);
        setHsl(`hsl(0, 0%, 100%)`); // You can generate HSL based on the selected hex here
    };

    // Generate variants for the selected color
    const colorVariants = generateColorVariants(selectedColor);

    const copyText = async (value) => {
        try {
            console.log(`Copying text: ${value}`);
            await navigator.clipboard.writeText(value,);
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
    };

    return (
        <div className="color-picker-container">
            <div className="color-grid-panel">
                <div className='grid-container'>
                    <b className='color-code'>Color Grid</b>
                    <div className="color-grid">
                        {colorGrid.map((color, index) => (
                            <div
                                key={index}
                                className="color-swatch"
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                            ></div>
                        ))}
                    </div>
                    <div className="color-codes">

                        <b className='color-code'>Color Codes</b>
                        <div className="color-code">
                            <span>HEX: </span>
                            <span onClick={(e) => copyText(e.target.innerText)}>{selectedColor}</span>
                        </div>
                        <div className="color-code">
                            <span>RGB: </span>
                            <span onClick={(e) => copyText(e.target.innerText)}>{rgb}</span>
                        </div>
                        <div className="color-code">
                            <span>HSL: </span>
                            <span onClick={(e) => copyText(e.target.innerText)}>{hsl}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="color-info-panel">
                <div>
                    <div><b>Edit</b>
                        <span onClick={(e) => copyText(selectedColor)}><img className='copy-button' src={ICONS.COPY} alt="copy" /></span>
                    </div>
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={handleColorChange}
                        className="color-input"
                    />
                </div>
                <div>
                    <b>Color Variants</b>
                    <div className="color-variants">
                        {colorVariants.map((color, index) => (
                            <div
                                key={index}
                                className="color-variant-swatch"
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                            >
                                {color}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
