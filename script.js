let selectedTop = null;
let selectedBottom = null;

/* =========================
   🎨 TOP COLORS (NO DENIM)
   ========================= */
const topColors = [
  { name: "White", hex: "#FFFFFF", base: "white" },
  { name: "Off White", hex: "#FAF9F6", base: "off white" },
  { name: "Cream", hex: "#F5F5DC", base: "cream" },

  { name: "Black", hex: "#000000", base: "black" },
  { name: "Charcoal Grey", hex: "#2E2E2E", base: "grey" },
  { name: "Grey", hex: "#9E9E9E", base: "grey" },
  { name: "Light Grey", hex: "#D6D6D6", base: "light grey" },

  { name: "Light Blue", hex: "#ADD8E6", base: "light blue" },
  { name: "Blue", hex: "#1E88E5", base: "blue" },
  { name: "Navy", hex: "#0B1C2D", base: "navy" },

  { name: "Olive", hex: "#6B8E23", base: "olive" },
  { name: "Forest Green", hex: "#1B5E20", base: "forest green" },

  { name: "Beige", hex: "#D8CFC4", base: "beige" },
  { name: "Brown", hex: "#5A3A1A", base: "brown" },

  { name: "Red", hex: "#C62828", base: "red" },
  { name: "Maroon", hex: "#4E0707", base: "maroon" },

  { name: "Mustard", hex: "#FBC02D", base: "mustard" },
  { name: "Pink", hex: "#EC407A", base: "pink" },
  { name: "Lavender", hex: "#E6E6FA", base: "lavender" }
];

/* =========================
   👖 BOTTOM COLORS (DENIM ONLY HERE)
   ========================= */
const bottomColors = [
  { name: "White", hex: "#FFFFFF", base: "white" },
  { name: "Black", hex: "#000000", base: "black" },
  { name: "Grey", hex: "#9E9E9E", base: "grey" },
  { name: "Light Grey", hex: "#D6D6D6", base: "light grey" },
  { name: "Charcoal Grey", hex: "#2E2E2E", base: "grey" },
  { name: "Beige", hex: "#D8CFC4", base: "beige" },
  { name: "Brown", hex: "#5A3A1A", base: "brown" },
  { name: "Navy Blue", hex: "#0B1C2D", base: "navy" },

  /* ✅ DENIM BLUE — PANT ONLY */
  { name: "Denim Blue", hex: "#4A6FA5", base: "denim" }
];

/* =========================
   🎨 RENDER COLORS
   ========================= */
function renderColors() {
  const topDiv = document.getElementById("topColors");
  const bottomDiv = document.getElementById("bottomColors");

  topDiv.innerHTML = "";
  bottomDiv.innerHTML = "";

  topColors.forEach(color => topDiv.appendChild(createCard(color, "top")));
  bottomColors.forEach(color => bottomDiv.appendChild(createCard(color, "bottom")));
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

/* =========================
   🧠 AUTO-SUGGEST STYLE ENGINE
   ========================= */
function checkOutfit() {
  const result = document.getElementById("result");

  if (!selectedTop || !selectedBottom) {
    result.innerHTML = "Please select both top and bottom colors.";
    return;
  }

  /* 🔒 STYLE RULES */
  const rules = {
    white: ["black", "grey", "denim", "navy", "beige", "brown", "maroon"],
    "off white": ["black", "navy", "brown", "maroon"],
    cream: ["navy", "brown", "black", "grey", "denim"],

    /* 🖤 BLACK TOP — UPDATED AS REQUESTED */
    black: ["white", "cream", "light grey", "brown", "denim"],

    "light grey": ["black", "navy", "brown"],
    "light blue": ["white", "black"],
    blue: ["white", "black"],
    navy: ["white", "off white", "cream", "light grey", "beige", "brown"],

    olive: ["white", "cream", "brown"],
    "forest green": ["white", "cream"],

    beige: ["navy", "denim", "brown", "black"],
    brown: ["white", "cream", "beige"],

    red: ["white", "black"],
    maroon: ["white", "beige", "cream"],
    mustard: ["white", "black"],

    pink: ["white", "black", "denim"],
    lavender: ["white", "black", "brown"],

    /* 👖 DENIM BLUE PANT RULES */
    denim: ["white", "black", "pink", "cream"]
  };

  const topKey = selectedTop.base;
  const bottomKey = selectedBottom.base;
  const allowedBottoms = rules[topKey];

  if (!allowedBottoms || !allowedBottoms.includes(bottomKey)) {
    result.innerHTML = `
      ❌ This combination is not clean & versatile.<br><br>
      Try some other combinations.
    `;
    return;
  }

  result.innerHTML = `
    ✅ Clean and versatile outfit.<br><br>
    👟 Footwear:<br>
    White Sneakers<br>
    Black Boots
  `;
}

/* =========================
   🚀 INIT
   ========================= */
renderColors();


