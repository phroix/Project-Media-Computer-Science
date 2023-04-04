import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";
import OrderService from "../../../services/order.service";
import CreditService from "../../../services/credit.service";
import "../css/Orders.css";
import "react-datepicker/dist/react-datepicker.css";

function Kontostand() {
  const [currentUser, setCurrentUser] = useState(null);

  const currentUserLogedIn = AuthService.getCurrentUser();
  const [currentUserId, setCurrentUserId] = useState(
    currentUserLogedIn.user_id
  );

  const [selectedOrderDate, setSelectedOrderDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [productRows, setProductRows] = useState();
  const [orderCostsTotal, setOrderCostsTotal] = useState();

  const [selectedCreditDate, setSelectedCreditDate] = useState(new Date());
  const [credits, setCredits] = useState([]);
  const [creditRows, setCreditRows] = useState();

  useEffect(() => {
    setCurrentUserId(currentUserLogedIn.user_id);
    if (currentUserId) getUserById();
  }, []);

  useEffect(() => {
    getOrderByDate();
    setProductRows();
  }, [selectedOrderDate]);

  useEffect(() => {
    if (orders.length === 0) {
      setProductRows();
    }
    if (orders.length > 0) {
      updateOrderRows();
    }
  }, [orders]);

  const getUserById = () => {
    UserService.getUserById(currentUserId)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getOrderByDate = () => {
    OrderService.getOrderByDate(currentUserId, selectedOrderDate)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateOrderRows = () => {
    let costsTotal = 0;
    const combinedProducts = {};

    orders.forEach((order) => {
      const date = new Date(order.date);
      const dateString =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear();

      order.c.forEach((product) => {
        const name = product.product_name;
        const quantity = product.quantity;
        const costs = product.product_costs;

        if (combinedProducts[dateString]) {
          let foundProduct = false;
          combinedProducts[dateString].forEach((p) => {
            if (p.name === name && costs === p.costs) {
              p.quantity += quantity;
              foundProduct = true;
            }
          });
          if (!foundProduct) {
            combinedProducts[dateString].push({ name, quantity, costs });
          }
        } else {
          combinedProducts[dateString] = [{ name, quantity, costs }];
        }
      });
    });

    const productRows = Object.entries(combinedProducts).map(
      ([date, products]) => {
        return products.map((product) => {
          costsTotal += product.costs * product.quantity;
          return (
            <tr className="table-container" key={product.name}>
              <td className="table-content">{product.name}</td>
              <td className="table-content">{product.quantity}x</td>
              <td className="table-content">
                {(product.costs * product.quantity).toFixed(2)} €
              </td>
              <td className="table-content">{date}</td>
            </tr>
          );
        });
      }
    );
    setOrderCostsTotal(costsTotal);
    setProductRows(productRows);
  };

  const renderOrderTableHead = () => {
    return (
      <thead className="table-header">
        <tr className="table-container">
          <th className="table-content">Name</th>
          <th className="table-content">Menge</th>
          <th className="table-content">Kosten</th>
          <th className="table-content">Datum</th>
        </tr>
      </thead>
    );
  };

  useEffect(() => {
    getCreditByDate();
    setCreditRows();
  }, [selectedCreditDate]);

  useEffect(() => {
    if (credits.length === 0) {
      setCreditRows();
    }
    if (credits.length > 0) {
      updateCreditRows();
    }
  }, [credits]);

  const getCreditByDate = () => {
    CreditService.getCreditByDate(currentUserId, selectedCreditDate)
      .then((response) => {
        setCredits(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCreditRows = () => {
    let creditRows = [];

    credits.forEach((credit) => {
      const date = new Date(credit.date);
      const dateString =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear();
      creditRows.push(
        <tr className="table-container" key={credit.credit_id}>
          <td className="table-content">
            {credit.charged_amount.toFixed(2)} €
          </td>
          <td className="table-content">{credit.old_amount.toFixed(2)} €</td>
          <td className="table-content">{credit.new_amount.toFixed(2)} €</td>
          <td className="table-content">{dateString}</td>
        </tr>
      );
    });

    setCreditRows(creditRows);
  };

  const renderCreditTableHead = () => {
    return (
      <thead className="table-header">
        <tr className="table-container">
          <th className="table-content">Aufgeladener Betrag</th>
          <th className="table-content">Alter Betrag</th>
          <th className="table-content">Neuer Betrag</th>
          <th className="table-content">Datum</th>
        </tr>
      </thead>
    );
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="datepicker-button" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className="credit-container">
      <h1 className="credit-h1">Bestellungen</h1>

      <div className="content-container">
        <div className="uebersicht-container">
          <div className="place">
            <h2 className="credit-h2">KREDIT ÜBERSICHT</h2>
            <h3 className="credit-h3"> Wähle den gewünschten Monat aus</h3>

            <DatePicker
              selected={selectedCreditDate}
              onChange={(date) => setSelectedCreditDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              customInput={<ExampleCustomInput />}
              wrapperClassName="datepicker"
            />
            <div className="content-container1">
              {credits.length > 0 && (
                <table className="orders-table">
                  {renderCreditTableHead()}
                  <tbody>{creditRows}</tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="kontostand-conainer">
          <div className="bestell-container">
            <div className="place">
              <h2 className="credit-h2">BESTELL ÜBERSICHT</h2>
              <h3 className="credit-h3"> Wähle den gewünschten Monat aus</h3>

              <DatePicker
                selected={selectedOrderDate}
                onChange={(date) => setSelectedOrderDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                customInput={<ExampleCustomInput />}
                wrapperClassName="datepicker"
              />
              <div className="content-container1">
                {orders.length > 0 && (
                  <table className="orders-table">
                    {renderOrderTableHead()}
                    <tbody>
                      {productRows}
                      {orderCostsTotal > 0 && (
                        <tr className="table-container">
                          <td className="table-content-end ">
                            {" "}
                            Kosten Gesamt:
                          </td>
                          <td></td>
                          <td className="table-content-end ">
                            {" "}
                            {orderCostsTotal.toFixed(2)} €
                          </td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kontostand;
