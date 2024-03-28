let wood;
let color;
let cloth;
let capacity;

function checkWood() {
  let oak = document.getElementById("oak").checked;
  let maple = document.getElementById("maple").checked;
  let cherry = document.getElementById("cherry").checked;
  let walnut = document.getElementById("walnut").checked;
  let mahogany = document.getElementById("mahogany").checked;

  if (oak) {
    wood = "oak";
  } else if (maple) {
    wood = "maple";
  } else if (cherry) {
    wood = "cherry";
  } else if (walnut) {
    wood = "walnut";
  } else if (mahogany) {
    wood = "mahogany";
  } else {
    alert("SELECT THE WOOD TYPE");
  }
}

function checkColor() {
  let beige = document.getElementById("beige").checked;
  let blue = document.getElementById("blue").checked;
  let burgundy = document.getElementById("burgundy").checked;
  let grey = document.getElementById("grey").checked;
  let teal = document.getElementById("teal").checked;
  if (beige) {
    color = "beige";
  } else if (blue) {
    color = "blue";
  } else if (burgundy) {
    color = "burgundy";
  } else if (grey) {
    color = "grey";
  } else if (teal) {
    color = "teal";
  } else {
    alert("SELECT THE SOFA COLOR");
  }
}
function checkCloth() {
  var cotton = document.getElementById("cotton").checked;
  var linen = document.getElementById("linen").checked;
  var polyester = document.getElementById("polyester").checked;
  var velvet = document.getElementById("velvet").checked;
  var microfiber = document.getElementById("microfiber").checked;
  if (cotton) {
    cloth = "cotton";
  } else if (linen) {
    cloth = "linen";
  } else if (polyester) {
    cloth = "polyester";
  } else if (velvet) {
    cloth = "velvet";
  } else if (microfiber) {
    cloth = "microfiber";
  } else {
    alert("SELECT THE CLOTH TYPE");
  }
}
function checkCapacity() {
  var oneseater = document.getElementById("oneseater").checked;
  var twoseater = document.getElementById("twoseater").checked;
  var threeseater = document.getElementById("threeseater").checked;
  var combo = document.getElementById("combo").checked;
  var corner = document.getElementById("corner").checked;
  if (oneseater) {
    capacity = "oneseater";
  } else if (twoseater) {
    capacity = "twoseater";
  } else if (threeseater) {
    capacity = "threeseater";
  } else if (combo) {
    capacity = "combo";
  } else if (corner) {
    capacity = "corner";
  } else {
    alert("SELECT THE SOFA CAPACITY");
  }
}

function showData() {
  var finalheading2 = document.getElementById("finalheading2");
  finalheading2.innerHTML = "<h2> YOUR COUSTOMIZED SOFA </h2>";
  checkWood();
  var img = document.getElementById("selectedWood");
  img.src = `../images/coustomize/${wood}.jpg`;
  checkColor();
  var img = document.getElementById("selectedColor");
  img.src = `../images/coustomize/${color}.jpg`;
  checkCloth();
  var img = document.getElementById("selectedCloth");
  img.src = `../images/coustomize/${cloth}.jpg`;
  checkCapacity();
  var img = document.getElementById("selectedCapacity");
  img.src = `../images/coustomize/${capacity}.jpg`;
}

const radioButtons = document.querySelectorAll('input[type="radio"]');

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    document
      .querySelectorAll(
        ".wood_items, .sofa_items, .cloth_items, .capacity_items"
      )
      .forEach((item) => {
        item.style.border = "none";
        item.style.borderRadius = "initial";
      });

    let checkedCount = 0;

    radioButtons.forEach((radio) => {
      if (radio.checked) {
        checkedCount++;
        const itemId = radio.getAttribute("id");
        const correspondingItem = document.querySelector(
          `label[for="${itemId}"] .wood_items, label[for="${itemId}"] .sofa_items, label[for="${itemId}"] .cloth_items, label[for="${itemId}"] .capacity_items`
        );
        correspondingItem.style.border = "2px solid #ffcc00";
        correspondingItem.style.borderRadius = "50%";
      }
    });

    if (checkedCount > 4) {
      const lastCheckedRadio = document.querySelector(":checked");
      const lastCheckedItemId = lastCheckedRadio.getAttribute("id");
      const lastCheckedItem = document.querySelector(
        `label[for="${lastCheckedItemId}"] .wood_items, label[for="${lastCheckedItemId}"] .sofa_items, label[for="${lastCheckedItemId}"] .cloth_items, label[for="${lastCheckedItemId}"] .capacity_items`
      );
      lastCheckedItem.style.border = "none";
      lastCheckedItem.style.borderRadius = "initial";
      lastCheckedRadio.checked = false;
    }
  });
});
