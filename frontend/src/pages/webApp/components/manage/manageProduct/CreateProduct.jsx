import React, { useState } from "react";
import ProductService from "../../../../../services/product.service";

const Phinzu = () => {
  const initProductCreate = {
    user_id: null,
    name: "",
    costs: "",
  };

  const [productCreate, setProductCreate] = useState(initProductCreate);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCreateProductInput = (event) => {
    const { name, value } = event.target;
    setProductCreate({ ...productCreate, [name]: value });
  };

  const createProduct = () => {
    var data = {
      name: productCreate.name,
      costs: productCreate.costs,
    };

    if (data.name === "" && data.costs === "") {
      setMessage("Keine Daten");
      return;
    }

    ProductService.create(data)
      .then((response) => {
        setSubmitted(true);
        setMessage("Das Produkt wurde erfolgreich angelegt!");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // newUser();
  };

  const saveNewProduct = () => {
    setProductCreate(initProductCreate);
    setMessage("");
    setSubmitted(false);
    window.location.reload(false);
  };
  return (
    <div className="mhinzu-container">
      <div className=" text-zinc-50 text-2xl text-center ">
        PRODUKTE HINZUFÜGEN
      </div>
      <div className="submit-form">
        {message && <div className="mh-massage">{message}</div>}
        {submitted ? (
          <div className="flex justify-center">
            <button className="mh-button" onClick={saveNewProduct}>
              OK
            </button>
          </div>
        ) : (
          <div className="mh-input-container">
            <input
              className="mh-input"
              type="text"
              placeholder=" Produktname"
              id="name"
              name="name"
              value={productCreate.name}
              onChange={handleCreateProductInput}
              required
            />
            <input
              className="mh-input"
              type="text"
              placeholder=" Preis"
              id="costs"
              name="costs"
              value={productCreate.costs}
              onChange={handleCreateProductInput}
              required
            />

            <div className="flex justify-center">
              <button onClick={createProduct} className="mh-button ">
                HINZUFÜGEN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Phinzu;
