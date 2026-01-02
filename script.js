let selectedTop = null;
let selectedBottom = null;

/* 🎨 FULL COLOR + SHADE DATABASE */
const colors = [
  // Neutrals
  { name: "White", hex: "#FFFFFF", type: "neutral", base: "white" },
  { name: "Off White", hex: "#FAF9F6", type: "neutral", base: "white" },
  { name: "Cream", hex: "#F5F5DC", type: "neutral", base: "white" },

  // Black / Grey
  { name: "Black", hex: "#000000", type: "dark", base: "black" },
  { name: "Charcoal Grey", hex: "#2E2E2E", type: "dark", base: "grey" },
  { name: "Grey", hex: "#9E9E9E", type: "neutral", base: "grey" },
  { name: "Light Grey", hex: "#D6D6D6", type: "neutral", base: "grey" },

  // Blues
  { name: "Light Blue", hex: "#ADD8E6", type: "pastel", base: "blue" },
  { name: "Blue", hex: "#1E88E5", type: "bright", base: "blue" },
  { name: "Navy", hex: "#0B1C2D", type: "dark", base: "blue" },

  // Greens
  { name: "Mint", hex: "#B2DFDB", type: "pastel", base: "green" },
  { name: "Olive", hex: "#6B8E23", type: "earth", base: "green" },
  { name: "Forest Green", hex: "#1B5E20", type: "dark", base: "green" },

  // Browns
  { name: "Beige", hex: "#D8CFC4", type: "neutral", base: "brown" },
  { name: "Brown", hex: "#5A3A1A", type: "earth", base: "brown" },
  { name: "Dark Brown", hex: "#3E2723", type: "dark", base: "brown" },

  // Reds
  { name: "Red", hex: "#C62828", type: "bright", base: "red" },
  { name: "Maroon", hex: "#4E0707", type: "dark", base: "red" },

  // Yellow / Orange
  { name: "Mustard", hex: "#FBC02D", type: "bright", base: "yellow" },
  { name: "Orange", hex: "#EF6C00", type: "bright", base: "orange" },

  // Pink / Purple
  { name: "Pink", hex: "#EC407A", type: "bright", base: "pink" },
  { name: "Lavender", hex: "#E6E6FA", type: "pastel", base: "purple" }
];

/* RENDER COLORS */
function renderColors() {
  const topDiv = document.getElementById("topColors");
  const bottomDiv = document.getElementById("bottomColors");

  colors.forEach(color => {
    topDiv.appendChild(createCard(color, "top"));
    bottomDiv.appendChild(createCard(color, "bottom"));
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
    type === "top" ? selectedTop = color : selectedBottom = color;
  };

  return card;
}

/* 👟 STRICT FASHION ENGINE */
function checkOutfit() {
  const result = document.getElementById("result");

  if (!selectedTop || !selectedBottom) {
    result.innerHTML = "Please select both top and bottom colors.";
    return;
  }

  // ❌ SAME COLOR FAMILY BLOCK
  if (selectedTop.base === selectedBottom.base) {
    result.innerHTML = `
      ❌ Same color on top & bottom doesn’t look good.<br>
      Try a neutral or lighter contrast.
    `;
    return;
  }

  // ❌ DARK + DARK BLOCK
  if (selectedTop.type === "dark" && selectedBottom.type === "dark") {
    result.innerHTML = `
      ❌ Dark-on-dark looks too heavy.<br>
      Add a light or neutral shade.
    `;
    return;
  }

  let shoes = [];
  let message = "Good style choice.";

  // ✅ VALID RULES
  if (selectedTop.type === "pastel" || selectedBottom.type === "pastel") {
    shoes = ["White Sneakers", "Beige Sneakers"];
    message = "Soft & aesthetic look.";
  } 
  else if (selectedTop.type === "bright") {
    shoes = ["White Sneakers", "Black Sneakers"];
    message = "Bold color balanced well.";
  } 
  else if (selectedTop.type === "earth" || selectedBottom.type === "earth") {
    shoes = ["Brown Shoes", "Tan Shoes", "White Sneakers"];
    message = "Earth tones look premium.";
  } 
  else {
    shoes = ["White Sneakers", "Black Sneakers"];
    message = "Clean & versatile outfit.";
  }

  result.innerHTML = `
    ✅ ${message}<br><br>
    👟 Best shoes:<br>
    ${shoes.join("<br>")}
  `;
}

/* INIT */
renderColors();
