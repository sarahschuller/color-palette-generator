document.addEventListener("DOMContentLoaded", function () {
  const colorList = document.getElementById("color-list");
  const searchInput = document.getElementById("search-input");
  const refreshBtn = document.getElementById("refresh-btn");
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
      colorWrapper.appendChild(colorHex);
      colorHex.innerHTML = color;
      colorHex.addEventListener("click", () => {
        copyToClipboard(color);
      });

      // Renders a span below the color hex that displays the color's rgb value
      const colorRgb = document.createElement("span");
      colorWrapper.appendChild(colorRgb);
      colorRgb.innerHTML = hexToRgb(color);
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
