import React from "react";
import CreateProduct from "./CreateProduct";
import SearchProduct from "./SearchProduct";

function ManageProduct() {
  return (
    <div className="mverwalten-container">
      <h1 className="h1-mverwalten">VERWALTEN - PRODUKTE </h1>
      <div className="component-container">
        <CreateProduct className="mhinzu"></CreateProduct>
        <SearchProduct className="msuchen"></SearchProduct>
      </div>
    </div>
  );
}

export default ManageProduct;
