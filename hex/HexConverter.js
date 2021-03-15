const checkboxBold = document.getElementById("bold");
const checkboxItalic = document.getElementById("italic");
const checkboxUnderline = document.getElementById("underline");
const output = document.getElementById("output");
const previewElem = document.getElementById("preview");

function calculate()
{
    // get the hex from the color picker
    const hex = colorInput.getColor().toHEXA().toString().substr(1, 6);
    let formatted = "&x&" + hex.split("").join("&");

    // set the text color
    previewElem.style.color = "#" + hex;

    /* update the color code text and preview if bold, italic, or underline is selected. */

    // handle bold and italic combinations
    if (checkboxBold.checked && checkboxItalic.checked)
    {
        formatted += "&l&o";
        previewElem.style.fontFamily = "Minecraft Bold Italic, sans-serif";
    }
    else if (checkboxBold.checked)
    {
        formatted += "&l";
        previewElem.style.fontFamily = "Minecraft Bold, sans-serif";
    }
    else if (checkboxItalic.checked)
    {
        formatted += "&o";
        previewElem.style.fontFamily = "Minecraft Italic, sans-serif";
    }
    else
    {
        previewElem.style.fontFamily = "Minecraft Regular, sans-serif";
    }

    // handle underline
    if (checkboxUnderline.checked)
    {
        formatted += "&n";
        previewElem.style.textDecoration = "underline";
    }
    else
    {
        previewElem.style.textDecoration = "none";
    }

    // set the output text value
    output.value = formatted;
}

// set up Pickr
const colorInput = Pickr.create({
    el: "#color-picker",
    theme: "monolith",
    swatches: null,
    default: "#6CD6FF",
    defaultRepresentation: "HEX",
    position: "bottom-middle",
    comparison: false,
    components:
        {
            // Main components
            preview: false,
            opacity: false,
            hue: true,
            // Input / output Options
            interaction:
                {
                    hex: true,
                    rgba: false,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: false,
                    save: false
                }
        }
});

// initial call and events
colorInput.setColor("#6CD6FF");
calculate();
colorInput.on("change", () =>
{
    colorInput.applyColor(true);
    calculate();
});
checkboxBold.addEventListener("input", calculate)
checkboxItalic.addEventListener("input", calculate)
checkboxUnderline.addEventListener("input", calculate)


