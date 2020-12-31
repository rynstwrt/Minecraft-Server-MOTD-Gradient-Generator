// get elements
const color1Input = document.getElementById('color1');
const color1Output = document.getElementById('color1result');
const color2Input = document.getElementById('color2');
const color2Output = document.getElementById('color2result');
const textBox = document.getElementById('converttext');
const outputBox = document.getElementById('outputtext');
const previewText = document.getElementById('previewtext');

// "draw" everything on the screen
function createGradient()
{
    const color1Hex = color1Input.value;
    const color2Hex = color2Input.value;

    color1Output.textContent = "(" + color1Hex + ")";
    color2Output.textContent = "(" + color2Hex + ")";;

    const rgb1 = hextoRGB(color1Hex);
    const rgb2 = hextoRGB(color2Hex);

    const chars = textBox.value.split('');

    var newMessage = "";
    for (var i = 0; i < chars.length; ++i)
    {
        const factor = i / chars.length;
        const currentColor = interpolateRGB(rgb1, rgb2, factor);

        const hex = rgbToHex(currentColor[0], currentColor[1], currentColor[2]);

        newMessage += hexToMCColorCode(hex) + chars[i];
    }

    outputBox.value = sectionToUnicode(newMessage);
    previewText.innerHTML = getPreviewText(newMessage);
}

// initial call
createGradient();

// add listeners for the elements
color1Input.addEventListener("input", createGradient);
color2Input.addEventListener("input", createGradient);
textBox.addEventListener("input", createGradient);

// convert [255, 102, 0] to #FF6600
function hextoRGB(hex)
{
    const based = parseInt(hex.substring(1), 16);
    const r = (based >> 16) & 255;
    const g = (based >> 8) & 255;
    const b = based & 255;

    return [r, g, b];
}

// convert #FF6600 to [255, 102, 0]
function rgbToHex(r, g, b)
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Return an RGB value at point <factor> in the gradient between <rgb1> and <rgb2>
function interpolateRGB(rgb1, rgb2, factor)
{
    const result = rgb1.slice();
    for (var i = 0; i < 3; ++i)
        result[i] = Math.round(result[i] + factor * (rgb2[i] - rgb1[i]));

    return result;
}

// convert #FF6600 to §x§f§f§6§6§0§0
function hexToMCColorCode(hex)
{
    const array = hex.substring(1).split('');

    var colorCode = "§x";
    for (var index in array)
    {
        colorCode += '§' + array[index];
    }

    return colorCode;
}

// convert § to \u00a7
function sectionToUnicode(resultText)
{
    return resultText.replaceAll("§", "\\u00a7");
}

// convert §x§f§f§6§6§0§0A to <span style='color: #FF6600'>A</span>
function getPreviewText(resultText)
{
    const array = resultText.split(/(§x(?:§[\d\w]{1}){6})/g);

    var newMessage = "";
    for (var i = 2; i < array.length; i = i + 2)
    {
        const char = array[i];
        const color = array[i - 1];

        newMessage += "<span style='color: " + mcColorCodeToHex(color) + "'>";
        newMessage += char;
        newMessage += "</span>";
    }

    return newMessage;
}

// convert §x§f§f§6§6§0§0 to #FF6600.
function mcColorCodeToHex(colorCodes)
{
    const array = colorCodes.split(/(§[0-9A-Fa-f]{1})/).filter(x => x);

    var newMessage = "#";
    for (var i = 1; i < array.length; ++i)
    {
        var pair = array[i];
        newMessage += pair.replace("§", "");
    }

    return newMessage;
}
