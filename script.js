// ------------------data---------------
const Dummy__data = [
  {
    name: "Coin__one",
    price: "100$",
    image: "image/coin.jfif",
    added_to_cart: false,
  },
  {
    name: "Coin__two",
    price: "200$",
    image: "image/coin-2.jfif",
    added_to_cart: false,
  },
  {
    name: "Coin__three",
    price: "300$",
    image: "image/coin-3.jfif",
    added_to_cart: false,
  },
  {
    name: "Coin__four",
    price: "400$",
    image: "image/coin-4.jfif",
    added_to_cart: false,
  },
  {
    name: "Coin__five",
    price: "500$",
    image: "image/coin-5.jfif",
    added_to_cart: false,
  },
  {
    name: "Coin__Six",
    price: "600$",
    image: "image/coin-6.jfif",
    added_to_cart: false,
  },
];

// ----------------setData-------------
function setData(data) {
  let my_data = JSON.stringify(data);
  localStorage.setItem("data", my_data);
}
// --------------handlingDAta---------------
function handlingDAta() {
  if (localStorage.length === 0) {
    setData(Dummy__data);
  }
  let my_data = JSON.parse(localStorage.getItem("data"));
  return my_data;
}
//----------------------------------------------
let my_data = handlingDAta();

let add_btn;
let badge = document.querySelector(".badge");
let bump = document.querySelector(".bump");
let h3;
let price_div;

//-----------------main--------------------
my_data.forEach((e) => {
  creart_cart_element(e);
  onclick_btn_handler(add_btn, e);
  quick_view_handler(view_btn, e);
});
// -------------create Cart Element -------------------------------
function creart_cart_element(e) {
  //create li
  let li_element = document.createElement("li");
  document.querySelector(".meals").appendChild(li_element);
  li_element.classList.toggle("meal");
  //create image
  let div_imgage = document.createElement("div");
  div_imgage.classList.toggle("image");
  li_element.appendChild(div_imgage);
  let image = document.createElement("img");
  image.src = e.image;
  div_imgage.appendChild(image);
  // creat h3=>name
  let div = document.createElement("div");
  h3 = document.createElement("h3");
  h3.innerHTML = e.name;
  div.appendChild(h3);
  // create price
  price_div = document.createElement("div");
  price_div.classList.toggle("price");
  price_div.innerHTML = e.price;
  div.appendChild(price_div);
  li_element.appendChild(div);
  // create button
  let div_btn = document.createElement("div");
  add_btn = document.createElement("button");
  view_btn = document.createElement("button");
  add_btn.classList.toggle("add-btn");
  add_btn.classList.toggle(`${e.name}`);
  view_btn.classList.toggle("add-btn");
  //change button name
  if (e.added_to_cart === true) {
    add_btn.innerHTML = "Remove";
  } else {
    add_btn.innerHTML = "Add";
  }
  view_btn.innerHTML = "quick view";
  div_btn.appendChild(add_btn);
  div_btn.appendChild(view_btn);
  li_element.appendChild(div_btn);
  //onclick_add_button
  onclick_add_button(e);
}
// -------------add and remove_button function-------------------------------
function onclick_btn_handler(btn, e) {
  btn.onclick = () => {
    let my_btn = [...document.querySelectorAll(".add-btn")].filter(
      (btnn) => btnn.classList[1] === e.name
    );
    if (e.added_to_cart === false) {
      e.added_to_cart = true;
      setData(my_data);
      my_btn[0].innerHTML = "Remove";
      q_btn.innerHTML = "Remove";
      onclick_add_button(e);
    } else {
      e.added_to_cart = false;
      setData(my_data);
      my_btn[0].innerHTML = "Add";
      q_btn.innerHTML = "Add";
      onclick_remove_button(e);
    }
  };
  document.addEventListener("mouseover", () => {
    document.querySelector(".dropdown").classList.remove("bump");
  });
}
function onclick_add_button(e) {
  document.querySelector(".dropdown").classList.add("bump");
  if (e.added_to_cart === true) {
    badge.innerHTML = +badge.innerHTML + 1;
    dropdown_add(e);
  }
}
function onclick_remove_button(e) {
  badge.innerHTML = +badge.innerHTML - 1;
  dropdown_remove(e);
}
// -------------quick_view function-------------------------------------
function quick_view_handler(btn, e) {
  //get
  let backdrop = document.querySelector(".backdrop");
  let close__btn = document.querySelector(".close");
  let img = document.querySelector(".modal img");
  let h3 = document.querySelector(".modal h3");
  let price = document.querySelector(".modal .price");
  q_btn = document.querySelector(".Coin");

  btn.addEventListener("click", () => {
    q_btn.classList.add(`${e.name}`);
    if (e.added_to_cart === true) {
      q_btn.innerHTML = "Remove";
    } else {
      q_btn.innerHTML = "Add";
    }
    backdrop.style.display = "block";
    img.src = e.image;
    h3.innerHTML = e.name;
    price.innerHTML = e.price;
    close__btn.onclick = () => {
      backdrop.style.display = "none";
      q_btn.classList.remove(`${e.name}`);
    };
    onclick_btn_handler(q_btn, e);
  });
}
// --------------------- dropdown__menu-------------------------------
document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});
// ----------------------creat dropdown menu element--------------------------------------------
function dropdown_add(e) {
  let dropdown_menu = document.querySelector(".dropdown-menu");
  let price = document.createElement("div");
  let remove_btn = document.createElement("button");
  let container = document.createElement("div");
  let d_image = document.createElement("img");
  h3 = document.createElement("h3");
  d_image.classList.add("d_image");
  container.classList.add("dropdown_container");
  remove_btn.classList.add("r-btn");
  remove_btn.classList.add("r-btn");
  remove_btn.innerHTML = "Remove";
  let attr = document.createAttribute("data-dropdown");
  remove_btn.setAttributeNode(attr);
  price.classList.add("price");
  h3.innerHTML = e.name;
  price.innerHTML = e.price;
  d_image.src = e.image;
  container.appendChild(d_image);
  container.appendChild(h3);
  container.appendChild(price);
  container.appendChild(remove_btn);
  dropdown_menu.appendChild(container);
  // onclick remove button
  onclick_btn_handler(remove_btn, e);
}
// ----------------------remove dropdown menu element--------------------------------------------
function dropdown_remove(element) {
  let dropdown_name = document.querySelectorAll(".dropdown_container h3");
  dropdown_name.forEach((e) => {
    if (element.name === e.innerHTML) {
      e.closest(".dropdown_container").remove();
    }
  });
}
