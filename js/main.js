"use strict";

// Selectors
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let mood = "create";
let tmp;

// Get total
function getTotal() {
  if (price.value !== "") {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;

    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// Create
let dataProduct;

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
  showProducts();
} else {
  dataProduct = [];
}

submit.addEventListener("click", function () {
  const newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (
    title.value !== "" &&
    price.value !== "" &&
    category.value !== "" &&
    newProduct.count <= 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));

  showProducts();
});

// Clean Data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read
function showProducts() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  const deleteAllDiv = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    deleteAllDiv.innerHTML = `<button onclick="deleteAll()">delete All (${dataProduct.length})</button>`;
  } else {
    deleteAllDiv.innerHTML = "";
  }
}

// Delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showProducts();
}

// Delete All
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showProducts();
}

// Update
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;

  getTotal();
  category.value = dataProduct[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search

let searchMood = "title";

function getSearchMood(id) {
  const search = document.getElementById("search");

  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }

  search.focus();
  search.value = "";
  showProducts();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood === "title") {
      if (dataProduct[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
      }
    } else {
      if (dataProduct[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
