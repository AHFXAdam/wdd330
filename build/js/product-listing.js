import o from"./productData.js";import r from"./productList.js";import{getParams as c}from"./utils.js";const t=c("category"),s=new o(t),a=new r(s,document.querySelector(".product-list"),t);a.init();
