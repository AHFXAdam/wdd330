import{getNumberItemsInCart as t,loadHeaderFooter as r}from"./utils.js";export function updateCartNumber(){const e=t();if(e>0)document.querySelector(".num-items-in-cart").innerHTML=e,document.querySelector(".num-items-in-cart").classList.remove("hide");else{document.querySelector(".num-items-in-cart").classList.add("hide");try{document.querySelector(".cart-total").classList.add("hide")}catch(c){return}}}r(),updateCartNumber();
