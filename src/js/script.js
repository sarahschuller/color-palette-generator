document.addEventListener("DOMContentLoaded", function () {
  const colorList = document.getElementById("color-list");
  const searchInput = document.getElementById("search-input");
  const refreshBtn = document.getElementById("refresh-btn");

  // Converts a hex color to an rgb color
  const hexToRgb = (hex) => {
    let alpha = false,
      h = hex.slice(hex.startsWith("#") ? 1 : 0);
    if (h.length === 3) h = [...h].map((x) => x + x).join("");
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return (
      "rgb" +
      (alpha ? "a" : "") +
      "(" +
      (h >>> (alpha ? 24 : 16)) +
      ", " +
      ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
      ", " +
      ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
      (alpha ? `, ${h & 0x000000ff}` : "") +
      ")"
    );
  };

  // Converts an rgb color to an hsl color
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

  generateColorList();

  function generateColorList() {
    const maxColors = 6;
    const colorListArray = [];

    for (let i = 0; i < maxColors; i++) {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      colorListArray.push(randomColor);
      console.log(randomColor);
    }
    renderColorList(colorListArray);
  }

  function renderColorList(colorListArray) {
    colorList.innerHTML = "";
    colorListArray.forEach((color) => {
      // Create a wrapper to encapsulate the color and it's values
      const colorWrapper = document.createElement("li");
      colorList.appendChild(colorWrapper);

      // Renders a blank span that will function as a preview of generated color
      const colorPreview = document.createElement("span");
      colorWrapper.appendChild(colorPreview);
      colorPreview.classList.add("color-preview");
      colorPreview.style.backgroundColor = color;

      // Renders a span below the color preview that displays the color's hex value
      const colorHex = document.createElement("span");
      colorHex.classList.add("hex-color");
      colorWrapper.appendChild(colorHex);
      colorHex.innerHTML = color;
      colorHex.addEventListener("click", () => {
        copyToClipboard(color);
      });

      // Renders a span below the colorHex that displays the color's rgb value
      const colorRgb = document.createElement("span");
      colorRgb.classList.add("rgb-color");
      colorWrapper.appendChild(colorRgb);
      colorRgb.innerHTML = hexToRgb(color);
      colorRgb.addEventListener("click", () => {
        copyToClipboard(hexToRgb(color));
      });

      // Renders a span below the colorRgb that displays the color's hsl value
      const colorHsl = document.createElement("span");
      colorHsl.classList.add("hsl-color");
      colorWrapper.appendChild(colorHsl);
      const rgb = hexToRgb(color).match(/\d+/g);
      const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
      // Round the hsl integer value to the nearest whole number
      for (let i = 0; i < hsl.length; i++) {
        hsl[i] = Math.round(hsl[i]);
      }
      colorHsl.innerHTML = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
      colorHsl.addEventListener("click", () => {
        copyToClipboard(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
      });
    });
  }

  function copyToClipboard(color) {
    const el = document.createElement("textarea");
    el.value = color;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    // Come back and remake this as something other than an alert
    alert("Color copied to clipboard: " + color);
  }

  refreshBtn.addEventListener("click", generateColorList);
});
