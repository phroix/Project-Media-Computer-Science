import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../../services/product.service";
import UserService from "../../../services/user.service";
import OrderService from "../../../services/order.service";
import AuthService from "../../../services/auth.service";
import "../css/TerminalMain.css";
export default function TMain() {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [products, setProducts] = useState([]);

  const [orderProducts, setOrderProducts] = useState([]);

  const currentUserLogedIn = AuthService.getCurrentUser();

  const [currentUserId, setCurrentUserId] = useState(
    currentUserLogedIn.user_id
  );

  const [count, setCount] = useState({});

  const [currentUserCredit, setCurrentUserCredit] = useState(0);

  const initUserUpdate = { credits: "" };

  const [userUpdate, setUserUpdate] = useState(initUserUpdate);

  const orderProductsInit = {
    product_id: null,
    product_name: "",
    product_costs: 0,
    quantity: 0,
  };

  useEffect(() => {
    getProductsList();
    getUserById();
  }, []);

  const fillNull = (d) => {
    d.map((item, i) => {
      count[i] = 0;
      data[i] = 0;
    });
  };

  const getProductsList = () => {
    ProductService.getProductsList()
      .then((response) => {
        setProducts(response.data);
        fillNull(response.data);
        console.log(response.data);
        setOrderProductsInit(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUserById = () => {
    UserService.getUserById(currentUserId)
      .then((response) => {
        setCurrentUserCredit(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setOrderProductsInit = (data) => {
    data.forEach((p) => {
      const data = {
        product_id: p.product_id,
        product_name: p.name,
        product_costs: p.costs,
        quantity: orderProductsInit.quantity,
      };
      orderProducts.push(data);
    });
  };

  const InkrementCount = (index) => (e) => {
    const newArray = data.map((item, i) => {
      if (index === i) {
        {
          products.map((product, indexx) => {
            if (index === indexx) {
              setAmount(amount + product.costs);
            }
          });
        }

        count[index] += 1;
        return { ...item, [e.target.countt]: e.target.countt };
      } else {
        return item;
      }
    });
    setData(newArray);
  };

  const DekrementCount = (index) => (e) => {
    const newArray = data.map((item, i) => {
      if (index === i && count[index] > 0) {
        {
          products.map((product, indexx) => {
            if (index === indexx) {
              setAmount(amount - product.costs);
            }
          });
        }

        count[index] -= 1;
        return { ...item, [e.target.countt]: e.target.countt };
      } else {
        return item;
      }
    });

    setData(newArray);
  };

  const sendOrder = () => {
    var finalOrders = [];

    for (let i = 0; i < orderProducts.length; i++) {
      orderProducts[i].quantity = count[i];
      if (orderProducts[i].quantity !== 0) finalOrders.push(orderProducts[i]);
    }

    var data = {
      credits: currentUserCredit.credits - amount,
    };

    for (let key in data) {
      if (data[key] == "") {
        data[key] = userUpdate.key;
      }
    }

    OrderService.createOrder(currentUserId, finalOrders)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    UserService.updateUserCredit(currentUserId, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    AuthService.logout();
    window.open("/loginRasp", "_self");
  };

  const logout = () => {
    AuthService.logout();
    window.open("/loginRasp", "_self");
  };

  return (
    <div className="terminal-container">
      <div className="terminal-menubar">
        <Link onClick={logout} className="terminal-logout">
          <button className="terminal-label" type="text">
            Logout
          </button>
        </Link>
        <label className="terminal-kontostand">
          Dein Kontostand: {currentUserCredit.credits} Euro
        </label>

        <Link
          onClick={sendOrder}
          className="terminal-bestaetigen"
          to="/rfidscan"
        >
          <button className="terminal-label" type="text">
            Bestätigen
          </button>
        </Link>
      </div>

      <div className="cols-container">
        {products.map((product, index) => {
          return (
            <div className="terminalinput-container" key={index}>
              <div className="button-style">
                <button onClick={InkrementCount(index)} className="cols-button">
                  <b>{product.name}</b>
                  <b className=""> [ {count[index]} ]</b>
                  <br />
                  {product.costs}
                  <b> €</b>
                  <br />
                </button>

                <div className="terminalbutton-container">
                  <button
                    className="button-terminal1"
                    onClick={DekrementCount(index)}
                  >
                    -
                  </button>
                  <button
                    className="button-terminal2"
                    onClick={InkrementCount(index)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
