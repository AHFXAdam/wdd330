let products=[];function convertToJson(t){if(t.ok)return t.json();throw new Error("Bad Response")}function setLocalStorage(t,o){localStorage.setItem(t,JSON.stringify(o))}function getProductsData(){fetch("../json/tents.json").then(convertToJson).then(t=>{products=t})}function addToCart(t){const o=products.find(r=>r.Id===t.target.dataset.id),e=JSON.parse(localStorage.getItem("so-cart"))||[],n=[...e,o];setLocalStorage("so-cart",n)}getProductsData(),document.getElementById("addToCart").addEventListener("click",addToCart);