let selectedTop = null;
let selectedBottom = null;

/* 🎨 COLOR DATABASE */
const colors = [
  { name: "White", hex: "#FFFFFF", type: "neutral", base: "white" },
  { name: "Off White", hex: "#FAF9F6", type: "neutral", base: "off white" },
  { name: "Cream", hex: "#F5F5DC", type: "neutral", base: "cream" },

  { name: "Black", hex: "#000000", type: "dark", base: "black" },
  { name: "Charcoal Grey", hex: "#2E2E2E", type: "dark", base: "grey" },
  { name: "Grey", hex: "#9E9E9E", type: "neutral", base: "grey" },
  { name: "Light Grey", hex: "#D6D6D6", type: "neutral", base: "light grey" },

  { name: "Light Blue", hex: "#ADD8E6", type: "pastel", base: "light blue" },
  { name: "Blue", hex: "#1E88E5", type: "bright", base: "blue" },
  { name: "Navy", hex: "#0B1C2D", type: "dark", base: "navy" },

  { name: "Denim Blue", hex: "#4A6FA5", type: "denim", base: "denim" },

  { name: "Mint", hex: "#B2DFDB", type: "pastel", base: "mint" },
  { name: "Olive", hex: "#6B8E23", type: "earth", base: "olive" },
  { name: "Forest Green", hex: "#1B5E20", type: "dark", base: "forest green" },

  { name: "Beige", hex: "#D8CFC4", type: "neutral", base: "beige" },
  { name: "Brown", hex: "#5A3A1A", type: "earth", base: "brown" },

  { name: "Red", hex: "#C62828", type: "bright", base: "red" },
  { name: "Maroon", hex: "#4E0707", type: "dark", base: "maroon" },

  { name: "Mustard", hex: "#FBC02D", type: "bright", base: "mustard" },
  { name: "Pink", hex: "#EC407A", type: "bright", base: "pink" },
  { name: "Lavender", hex: "#E6E6FA", type: "pastel", base: "lavender" }
];

/* 👖 SAFE BOTTOM RULES */
function isSafeBottom(color) {
  if (color.base === "denim") return true;
  if (color.type === "bright" || color.type === "pastel") return false;
  return true;
}

/* 🎨 RENDER COLORS */
function renderColors() {
  const topDiv = document.getElementById("topColors");
  const bottomDiv = document.getElementById("bottomColors");

  colors.forEach(color => {
    topDiv.appendChild(createCard(color, "top"));
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

/* 👟 AUTO-SUGGEST FASHION ENGINE */
function checkOutfit() {
  const result = document.getElementById("result");

  if (!selectedTop || !selectedBottom) {
    result.innerHTML = "Please select both top and bottom colors.";
    return;
  }

  const rules = {
    white: ["black", "grey", "denim", "navy", "beige", "brown", "maroon"],
    "off white": ["black", "navy", "brown", "maroon"],
    cream: ["navy", "brown", "black", "grey", "denim"],
    black: ["white"],
    "light grey": ["black", "navy", "brown"],
    "light blue": ["white", "black"],
    blue: ["white", "black"],
    navy: ["white", "off white", "cream", "light grey", "beige", "brown"],
    mint: ["white", "cream", "brown"],
    olive: ["white", "cream", "brown"],
    "forest green": ["white", "cream"],
    beige: ["navy", "denim", "brown", "black"],
    brown: ["white", "cream", "beige"],
    red: ["white", "black"],
    maroon: ["white", "beige", "cream"],
    mustard: ["white", "black"],
    pink: ["white", "black", "denim"],
    lavender: ["white", "black", "brown"],
    denim: ["white", "black", "pink", "cream"]
  };

  const topKey = selectedTop.base;
  const bottomKey = selectedBottom.base;
  const allowedBottoms = rules[topKey];

  if (!allowedBottoms || !allowedBottoms.includes(bottomKey)) {
    const suggestionText = allowedBottoms
      ? allowedBottoms.map(formatName).join(", ")
      : "neutral colors";

    result.innerHTML = `
      ❌ This combination is not clean & versatile.<br><br>
      ✅ Try pairing this top with:<br>
      <strong>${suggestionText}</strong><br><br>
      👟 Footwear:<br>
      White Sneakers<br>
      Black Boots
    `;
    return;
  }

  result.innerHTML = `
    ✅ Clean and versatile outfit.<br><br>
    👟 Best footwear options:<br>
    White Sneakers<br>
    Black Boots
  `;
}

/* 🔤 FORMAT NAMES */
function formatName(base) {
  const map = {
    white: "White",
    black: "Black",
    grey: "Grey",
    "light grey": "Light Grey",
    navy: "Navy Blue",
    beige: "Beige",
    brown: "Brown",
    denim: "Denim Blue",
    maroon: "Maroon",
    cream: "Cream",
    "off white": "Off White"
  };
  return map[base] || base;
}

/* 🚀 INIT */
renderColors();
