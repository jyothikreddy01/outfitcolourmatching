function checkOutfit() {
  const result = document.getElementById("result");

  if (!selectedTop || !selectedBottom) {
    result.innerHTML = "Please select both top and bottom colors.";
    return;
  }

  const topBase = selectedTop.base;
  const bottomBase = selectedBottom.base;
  const topName = selectedTop.name;

  /* 🎯 AUTO-SUGGEST RULE MAP */
  const rules = {
    white: ["black", "grey", "denim", "blue", "brown", "red", "maroon"],
    "off white": ["black", "blue", "brown", "maroon"],
    cream: ["blue", "brown", "black", "grey"],
    black: ["white"],
    "light grey": ["black", "blue", "brown"],
    "light blue": ["white", "black"],
    blue: ["white", "black"],
    navy: ["white", "off white", "cream", "light grey", "beige", "brown"],
    mint: ["white", "cream", "brown"],
    olive: ["white", "cream", "brown"],
    "forest green": ["white", "cream"],
    beige: ["blue", "denim", "brown", "black"],
    brown: ["white", "cream", "beige"],
    red: ["white", "black"],
    maroon: ["white", "beige", "cream"],
    mustard: ["white", "black"],
    pink: ["white", "black", "denim"],
    lavender: ["white", "black", "brown"],
    denim: ["white", "black", "pink", "cream"]
  };

  /* 🔑 Normalize top key */
  const topKey =
    topName === "Off White" ? "off white" :
    topName === "Light Grey" ? "light grey" :
    topName === "Light Blue" ? "light blue" :
    topName === "Forest Green" ? "forest green" :
    topBase;

  const allowedBottoms = rules[topKey];

  /* 🚫 NOT CLEAN & VERSATILE → AUTO SUGGEST */
  if (!allowedBottoms || !allowedBottoms.includes(bottomBase)) {
    const suggestions = allowedBottoms
      ? allowedBottoms.map(b => capitalizeBottom(b)).join(", ")
      : "neutral colors";

    result.innerHTML = `
      ❌ This combination is not clean & versatile.<br><br>
      ✅ Try pairing this top with:<br>
      <strong>${suggestions}</strong><br><br>
      👟 Footwear:<br>
      White Sneakers<br>
      Black Boots
    `;
    return;
  }

  /* ✅ CLEAN & VERSATILE */
  result.innerHTML = `
    ✅ Clean and versatile outfit.<br><br>
    👟 Best footwear options:<br>
    White Sneakers<br>
    Black Boots
  `;
}

/* 🔤 Helper for readable names */
function capitalizeBottom(base) {
  const map = {
    white: "White",
    black: "Black",
    grey: "Grey",
    blue: "Navy Blue",
    brown: "Brown",
    beige: "Beige",
    denim: "Denim Blue",
    red: "Maroon"
  };
  return map[base] || base;
}

  
