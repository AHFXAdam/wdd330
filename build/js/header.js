import{getNumberItemsInCart as t}from"./utils.js";export function updateCartNumber(){const e=t();if(console.log(e),e>0)document.querySelector(".num-items-in-cart").innerHTML=e,document.querySelector(".num-items-in-cart").classList.remove("hide");else{document.querySelector(".num-items-in-cart").classList.add("hide");try{document.querySelector(".cart-total").classList.add("hide")}catch(r){return}}}updateCartNumber();
