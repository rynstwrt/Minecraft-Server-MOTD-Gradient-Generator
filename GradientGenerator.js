// get elements
const inputBox = document.getElementById("inputbox");
const settingsSelect = document.getElementById("settings");
const ampersandOption = document.getElementById("ampersandOption");
const sectionSymbolOption = document.getElementById("sectionOption");
const outputBox = document.getElementById("outputbox");
const previewText = document.getElementById("previewtext");

// set up Pickr
const colorInput1 = Pickr.create({
    el: "#colorpicker1",
    theme: "monolith",
    swatches: null,
    default: "#FF6600",
    defaultRepresentation: "HEX",
    position: "bottom-middle",
    components:
    {
        // Main components
        preview: true,
        opacity: false,
        hue: true,
        // Input / output Options
        interaction:
        {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: false,
            save: false
        }
    }
});
colorInput1.setColor("#FF6600");
const colorInput2 = Pickr.create({
    el: "#colorpicker2",
    theme: "monolith",
    swatches: null,
    default: "#FF00FF",
    defaultRepresentation: "HEX",
    position: "bottom-middle",
    components:
    {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction:
        {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true
            // clear: true,
            // save: true
        }
    }
});
colorInput2.setColor("#FF00FF");

// add listeners for elements
colorInput1.on("change", generate);
colorInput1.on("changestop", () => { colorInput1.applyColor(); });
colorInput2.on("change", generate);
colorInput2.on("changestop", () => { colorInput2.applyColor(); });
inputBox.addEventListener("input", generate);
settingsSelect.addEventListener("change", generate);

// main generator function
function generate()
{
    const hex1 = "#" + colorInput1.getColor().toHEXA().join("");
    const hex2 = "#" + colorInput2.getColor().toHEXA().join("");

    const rgbArray1 = hexToRGBArray(hex1);
    const rgbArray2 = hexToRGBArray(hex2);

    const chars = inputBox.value.split("");

    var isBold = false;
    var isItalic = false;
    var isUnderlined = false;
    var useAmpersand = false;
    var useSection = false;

    var newMessage = "";
    for (var i = 0; i < chars.length; ++i)
    {
        const percent = i / chars.length;
        const currentRGBArray = rbgArrayInterpolate(rgbArray1, rgbArray2, percent);
        const currentHex = rgbArrayToHex(currentRGBArray);

        const settings = [hexToMCCode(currentHex)];
        const selectedOptions = settingsSelect.selectedOptions;
        for (var j = 0; j < selectedOptions.length; ++j)
        {
            const selectedText = selectedOptions[j].value;
            if (selectedText == "bold")
            {
                isBold = true;
                settings.push("§l");
            }
            else if (selectedText == "italic")
            {
                isItalic = true;
                settings.push("§o");
            }
            else if (selectedText == "underlined")
            {
                isUnderlined = true;
                settings.push("§n");
            }
            else if (selectedText == "ampersand")
            {
                sectionOption.selected = false;
                useAmpersand = true;
            }
            else if (selectedText == "section")
            {
                ampersandOption.selected = false;
                useSection = true;
            }
        }

        newMessage += settings.join("") + chars[i];
    }

    if (useAmpersand) outputBox.value = newMessage.replaceAll("§", "&");
    else if (useSection) outputBox.value = newMessage;
    else outputBox.value = newMessage.replaceAll("§", "\\u00a7");

    if (isBold && isItalic) previewText.style.fontFamily = "Minecraft Bold Italic";
    else if (isBold) previewText.style.fontFamily = "Minecraft Bold";
    else if (isItalic) previewText.style.fontFamily = "Minecraft Italic";
    else previewText.style.fontFamily = "Minecraft Regular"
    previewText.innerHTML = mcCodesToHTML(newMessage, isUnderlined);
}

// initital function call
generate();
