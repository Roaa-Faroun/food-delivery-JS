const ITEMS = [
  {
    name: "Caramel Donuts",
    price: 8,
    image: "https://foodish-api.herokuapp.com/images/dessert/dessert19.jpg",
  },
  {
    name: "Shrimps Rice",
    price: 12,
    image: "https://foodish-api.herokuapp.com/images/rice/rice33.jpg",
  },
  {
    name: "Vegetable Pizza",
    price: 17,
    image: "https://foodish-api.herokuapp.com/images/pizza/pizza8.jpg",
  },
  {
    name: "Cheese Burger",
    price: 35,
    image: "https://foodish-api.herokuapp.com/images/burger/burger3.jpg",
  },
  {
    name: "Italian Pasta",
    price: 23,
    image: "https://foodish-api.herokuapp.com/images/pasta/pasta2.jpg",
  },
  {
    name: "Beef Samosa",
    price: 14,
    image: "https://foodish-api.herokuapp.com/images/samosa/samosa20.jpg",
  },
];
let theStatus = ["", "", "", "", "", ""];
let cart = JSON.parse(window.localStorage.getItem("cart")) || [];

function renderingMeals(i, arr) {
  if (cart.length !== 0) {
    for (let i = 0; i < cart.length; i++) {
      theStatus[cart[i].id] = "in card";
    }
    theStatus = theStatus.map((e) => {
      if (e !== "in card") {
        return "not in cart";
      }
      return e;
    });
  } else {
    theStatus = theStatus.map((e) => {
      return "not in cart";
    });
  }
  let content = document.querySelector("content");
  content.innerHTML += `
  <div class="ele ${
    theStatus[i] === "not in cart" ? "" : "redBoxShadow"
  }" id='${i}' onclick='addToCart(${i});'>
  <div>
  <img
  src=${arr.image}
  alt=""
  />
  </div>
  <div class="info">
  <h4>${arr.name}</h4>
  <span>${arr.price} $</span>
  </div>
  </div>
  `;
}

function show() {
  let content = document.querySelector("content");
  content.innerHTML = ``;
  let cardItems = document.getElementById("cardItems");
  let totalQuantity = cart.reduce((a, e, i) => {
    return parseInt(a) + parseInt(e.quantity);
  }, 0);
  cardItems.innerHTML = `${totalQuantity}`;
  for (let i = 0; i < ITEMS.length; i++) {
    renderingMeals(i, ITEMS[i]);
  }
}

function addToCart(id) {
  let thisProduct = document.getElementById(`${id}`);
  thisProduct.style.cssText = " box-shadow: 0px 0px 10px 2px rgb(255, 0, 0);";
  let quantity = window.prompt(`How much ${ITEMS[id].name} do you want?`);
  let price = ITEMS[id].price;
  let name = ITEMS[id].name;
  if (quantity > 0 && cart.length > 0) {
    if (theStatus[id] === "not in cart") {
      cart = [...cart, { id, quantity, price, name }];
      theStatus[id] = "in cart";
    } else {
      cart.forEach((e) => {
        if (e.id === id) {
          e.quantity = parseInt(e.quantity) + parseInt(quantity);
        }
      });
    }
  } else if (cart.length === 0) {
    cart = [{ id, quantity, price, name }];
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
  show();
}

show();
