let cart = JSON.parse(window.localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    let content = document.querySelector("content");
    content.innerHTML = "No Items In Cart";
    content.style.cssText = `font-size:30px;
    font-weight:bold;`;
    let cardItems = document.getElementById("cardItems");
    cardItems.innerHTML = `${0}`;
  } else {
    let cardItems = document.getElementById("cardItems");
    let totalQuantity = cart.reduce((a, e, i) => {
      return parseInt(a) + parseInt(e.quantity);
    }, 0);
    cardItems.innerHTML = `${totalQuantity}`;
    let container = document.querySelector("#container");
    container.innerHTML = "";
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += parseInt(cart[i].quantity) * parseInt(cart[i].price);
      container.innerHTML += `<div class="elements" id='${cart[i].id}' >
      <div>
        <h5>${cart[i].name}</h5>
      </div>
      <div>
        <span>${cart[i].quantity} * ${cart[i].price}$</span>
        <span>${parseInt(cart[i].quantity) * parseInt(cart[i].price)}$</span>
        <button class="deleteButtun btn" onclick='deleteItem(${i})'>X</button>
      </div>
    </div>`;
    }
    container.innerHTML += `<div class="details">
    <h4>Total: ${total === 0 ? 0 : total}$</h4>
    <button class="clear btn" onclick='reset()'>Clear All</button>
  </div>   `;
  }
}
function deleteItem(i) {
  cart = cart.filter((e, ind) => {
    return ind !== i;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function reset() {
  cart = [];
  window.localStorage.removeItem("cart");
  renderCart();
}
renderCart();
