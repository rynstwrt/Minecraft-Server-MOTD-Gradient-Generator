// convert a hex code to an [r, g, b] array.
function hexToRGBArray(hex)
{
    const based = parseInt(hex.substring(1), 16);
    const r = (based >> 16) & 255;
    const g = (based >> 8) & 255;
    const b = based & 255;
    return [r, g, b];
}

// converts an [r, g, b] array into a hex code.
function rgbArrayToHex(rgbArray)
{
    return "#" + ((1 << 24) + (rgbArray[0] << 16) + (rgbArray[1] << 8) + rgbArray[2]).toString(16).slice(1);
}

// return an [r, g, b] array between rgbArray1 and rgbArray2 at point percent between 0 and 1.
function rbgArrayInterpolate(rgbArray1, rgbArray2, percent)
{
    const result = rgbArray1.slice();
    for (var i = 0; i < 3; ++i)
        result[i] = Math.round(result[i] + percent * (rgbArray2[i] - rgbArray1[i]));
    return result;
}

// convert a hex code to Minecraft's version of hex codes.
function hexToMCCode(hex)
{
    const array = hex.substring(1).split("");
    var colorCode = "§x";
    for (var index in array)  colorCode += "§" + array[index];
    return colorCode;
}

// convert a Minecraft color code to a hex code.
function mcCodesToHex(codes)
{
    const array = codes.split(/(§[0-9A-Fa-f]{1})/).filter(x => x);
    var newMessage = "#";
    for (var i = 1; i < array.length; ++i) newMessage += array[i].replace("§", "");
    return newMessage;
}

// convert a string with Minecraft color codes to html.
function mcCodesToHTML(codes, isUnderlined)
{
    codes = codes.replaceAll("§l", "");
    codes = codes.replaceAll("§o", "");
    codes = codes.replaceAll("§n", "");

    const array = codes.split(/(§x(?:§[\d\w]{1}){6})/g);

    var newMessage = "";
    for (var i = 2; i < array.length; i = i + 2)
    {
        const char = array[i];
        const color = array[i - 1];
        const hex = mcCodesToHex(color);
        const spanStyle = (isUnderlined) ? "color: " + hex + "; text-decoration: underline; text-decoration-color: " + hex : "color: " + hex;

        newMessage += "<span style=\"" + spanStyle + "\">";
        newMessage += char;
        newMessage += "</span>";
    }

    return newMessage;
}
