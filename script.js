let selectedTop = null;
let selectedBottom = null;

/* 🎨 COLOR DATABASE */
const colors = [
  { name: "White", hex: "#FFFFFF", type: "neutral", base: "white" },
  { name: "Off White", hex: "#FAF9F6", type: "neutral", base: "white" },
  { name: "Cream", hex: "#F5F5DC", type: "neutral", base: "white" },

  { name: "Black", hex: "#000000", type: "dark", base: "black" },
  { name: "Charcoal Grey", hex: "#2E2E2E", type: "dark", base: "grey" },
  { name: "Grey", hex: "#9E9E9E", type: "neutral", base: "grey" },
  { name: "Light Grey", hex: "#D6D6D6", type: "neutral", base: "grey" },

  { name: "Light Blue", hex: "#ADD8E6", type: "pastel", base: "blue" },
  { name: "Blue", hex: "#1E88E5", type: "bright", base: "blue" },
  { name: "Navy", hex: "#0B1C2D", type: "dark", base: "blue" },

  { name: "Mint", hex: "#B2DFDB", type: "pastel", base: "green" },
  { name: "Olive", hex: "#6B8E23", type: "earth", base: "green" },
  { name: "Forest Green", hex: "#1B5E20", type: "dark", base: "green" },

  { name: "Beige", hex: "#D8CFC4", type: "neutral", base: "brown" },
  { name: "Brown", hex: "#5A3A1A", type: "earth", base: "brown" },

  { name: "Red", hex: "#C62828", type: "bright", base: "red" },
  { name: "Maroon", hex: "#4E0707", type: "dark", base: "red" },

  { name: "Mustard", hex: "#FBC02D", type: "bright", base: "yellow" },

  { name: "Pink", hex: "#EC407A", type: "bright", base: "pink" },
  { name: "Lavender", hex: "#E6E6FA", type: "pastel", base: "purple" }
];

/* 👖 SAFE BOTTOM RULES */
function isSafeBottom(color) {
  // Only Navy allowed from blue family
  if (color.base === "blue" && color.name !== "Navy") return false;

  // Block bright & pastel pants
  if (color.type === "bright" || color.type === "pastel") return false;

  return true;
}

/* 🎨 RENDER COLORS */
function renderColors() {
  const topDiv = document.getElementById("topColors");
  const bottomDiv = document.getElementById("bottomColors");

  colors.forEach(color => {
    // Tops → all colors
    topDiv.appendChild(createCard(color, "top"));

    // Bottoms → safe only
    if (isSafeBottom(color)) {
      bottomDiv.appendChild(createCard(color, "bottom"));
    }
  });
}

function createCard(color, type) {
  const card = document.createElement("div");
  card.className = "color-card";
  card.innerHTML = `
    <div class="color-box" style="background:${color.hex}"></div>
    <div>${color.name}</div>
  `;

  card.onclick = () => {
    document
      .querySelectorAll(`#${type}Colors .color-card`)
      .forEach(c => c.classList.remove("selected"));

    card.classList.add("selected");

    if (type === "top") selectedTop = color;
    else selectedBottom = color;
  };

  return card;
}

/* 👟 FASHION ENGINE (STRICT & SIMPLE) */
function checkOutfit() {
  const result = document.getElementById("result");

  if (!selectedTop || !selectedBottom) {
    result.innerHTML = "Please select both top and bottom colors.";
    return;
  }

  // 🚫 Same color family
  if (selectedTop.base === selectedBottom.base) {
    result.innerHTML = `
      ❌ Same color family doesn’t work.<br><br>
      Try a neutral or contrast shade.
    `;
    return;
  }

  // 🚫 Dark + Dark
  if (selectedTop.type === "dark" && selectedBottom.type === "dark") {
    result.innerHTML = `
      ❌ Too dark overall.<br><br>
      Add a lighter top or neutral bottom.
    `;
    return;
  }

  // 👟 Only black & white sneakers
  const shoes = ["White Sneakers", "Black Sneakers"];

  result.innerHTML = `
    ✅ Clean, balanced outfit. Easy to wear.<br><br>
    👟 Best shoe options:<br>
    ${shoes.join("<br>")}
  `;
}

/* 🚀 INIT */
renderColors();


  
 
