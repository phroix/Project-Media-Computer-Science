import React, { useState, useEffect } from "react";
import ProductService from "../../../../../services/product.service";

const Psuchen = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [editSubmit, setEditSubmit] = useState(true);
  const [productUpdateSubmit, setProductUpdateSubmit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProductsList();
  }, []);

  const initProductUpdate = {
    user_id: null,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    is_admin: false,
  };

  const [productUpdate, setProductUpdate] = useState(initProductUpdate);

  const handleUpdateProductInput = (event) => {
    const { name, value } = event.target;
    setProductUpdate({ ...productUpdate, [name]: value });
  };

  const handleUpdateProductSubmit = () => {
    setProductUpdateSubmit(true);
  };

  const handleBackToProductSubmit = () => {
    setProductUpdateSubmit(false);
    getProductsList();
  };

  const onChangeSearchName = (event) => {
    const searchName = event.target.value;
    setSearchName(searchName);

    if (searchName === "") getProductsList();
  };

  const refreshActiveProduct = () => {
    setCurrentProduct(null);
    setEditSubmit(true);
  };

  const setActiveProduct = (product) => {
    setCurrentProduct(product);
    setProducts([product]);
    setMessage("");
    setSearchName("");
    setEditSubmit(false);
  };

  const getProductsList = () => {
    ProductService.getProductsList()
      .then((response) => {
        if (response.data !== 0) setMessage("Wähle ein Produkt aus!");
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    refreshActiveProduct();
  };

  const getProductByName = () => {
    if (searchName) setMessage("Wähle ein Produkt aus!");
    ProductService.getProductByName(searchName)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    refreshActiveProduct();
    setEditSubmit(true);
  };

  const deleteProduct = () => {
    ProductService.deleteProduct(currentProduct.product_id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    getProductsList();
    refreshActiveProduct();
    window.location.reload(false);
  };

  const updateProduct = () => {
    var data = {
      name: productUpdate.name,
      costs: productUpdate.costs,
    };

    // if (data.name === "" && data.costs === "") {
    //   setMessage(`Keine Veränderungen an ${currentProduct.name} vorgenommen!`);
    //   return;
    // }

    for (let key in data) {
      if (data[key] === "") {
        data[key] = productUpdate.key;
      }
    }

    ProductService.updateProduct(currentProduct.product_id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    getProductsList();
    refreshActiveProduct();
    setProductUpdate(initProductUpdate);
    setProductUpdateSubmit(false);
    window.location.reload(false);
  };

  return (
    <div className="msuchen-container">
      <div className="text-zinc-50 text-2xl text-center ">PRODUKTE SUCHEN</div>

      <div className="ms-input-container">
        <input
          className="ms-input"
          type="text"
          id="name"
          name="name"
          placeholder="Produkt eingeben..."
          value={searchName}
          onChange={onChangeSearchName}
          required
        />
        <button className="mh-button" onClick={getProductByName}>
          Suchen
        </button>
        {message && <div className="text-message">{message}</div>}
        <table className="ttable-first">
          <thead>
            <tr>
              <th>Produktname</th>
              <th>Kosten</th>
              {editSubmit && <th>Bearbeiten</th>}
            </tr>
          </thead>
          {products &&
            products.map((product) => (
              <tbody>
                <tr>
                  <td>{product.name}</td>
                  <td>{product.costs.toFixed(2)} €</td>
                  {editSubmit && (
                    <td>
                      <span onClick={() => setActiveProduct(product)}>
                        <i className="far fa-edit action mr-2"></i>
                      </span>
                    </td>
                  )}
                </tr>
              </tbody>
            ))}
        </table>
        <div>
          {currentProduct && productUpdateSubmit && (
            <div className="ms-text-container">
              <div>
                <input
                  className="ms-input-update"
                  placeholder="Produktname"
                  name="name"
                  id="name"
                  required
                  value={productUpdate.name}
                  onChange={handleUpdateProductInput}
                />
              </div>
              <div>
                <input
                  className="ms-input-update"
                  placeholder="Kosten"
                  name="costs"
                  id="costs"
                  required
                  value={productUpdate.costs}
                  onChange={handleUpdateProductInput}
                />
              </div>
              <button className="mh-button" onClick={updateProduct}>
                OK
              </button>
            </div>
          )}
          {!editSubmit && !productUpdateSubmit && (
            <div className="ms-button-container">
              <button className="mh-button" onClick={handleUpdateProductSubmit}>
                Bearbeiten
              </button>
              <button className="mh-button" onClick={deleteProduct}>
                Löschen
              </button>

              {!editSubmit && (
                <button
                  className="mh-button"
                  onClick={handleBackToProductSubmit}
                >
                  Zurück
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Psuchen;
