document.addEventListener("DOMContentLoaded", function () {
  const colorList = document.getElementById("color-list");
  const searchInput = document.getElementById("search-input");
  const refreshBtn = document.getElementById("refresh-btn");

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
      const colorEl = document.createElement("li");
      colorEl.style.backgroundColor = color;
      colorEl.innerHTML = color;
      colorList.appendChild(colorEl);
      colorEl.addEventListener("click", () => {
        copyToClipboard(color);
        colorList.appendChild(colorEl);
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
