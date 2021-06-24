
import Axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";

let sellersData = [
  {
    email: "seller1@test.org",
    name: "seller1",
    frequency: 43,
    id: 36,
    sold: false,
  },
  {
    email: "seller2@test.org",
    name: "seller2",
    frequency: 73,
    id: 37,
    sold: false,
  },
  {
    email: "seller3@test.org",
    name: "seller3",
    frequency: 23,
    id: 38,
    sold: false,
  },
];

const buyerData = [
  {
    category: ["Living", "Toys"],
    email: "buyer1@test.org",
    name: "buyer1",
    id: 1750,
    phone: "352-8533-3160",
  },
  {
    category: ["Accessories"],
    email: "buyer2@test.org",
    name: "buyer2",
    id: 1751,
    phone: "352-8543-3160",
  },
  {
    category: ["Collectibles", "Crafts"],
    email: "buyer3@test.org",
    name: "buyer3",
    id: 1753,
    phone: "352-8553-3160",
  },
];

// 3rd call
// give back Array of properties that are under buyers max_price and in the desired cities
const merchData = [
  { id: 1, price: "$123", description: "purse", category: "Accessories" },
  { id: 2, price: "$3456", description: "couch", category: "Living" },
  { id: 3, price: "$123", description: "50in TV", category: "Entertainment" },
  { id: 4, price: "$12", description: "Pokemon Cards", category: "Collectibles" },
  { id: 5, price: "$345", description: "Sewing Machine", category: "Crafts" },
  { id: 6, price: "$13", description: "Toy Truck", category: "Toys" },
];

export default () => {
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [buyersMerches, setBuyersMerches] = useState([]);
  useEffect(() => {
    getSellers();
  }, []);

  const getSellers = async () => {
      try {
      let res = await Axios.get("/api/sellers");
      setSellers(res.data);
    } catch (err) {
      setSellers(sellersData);
    }
  };
  const getBuyersMerches = async (id) => {
    try {
      let res = await Axios.get(`/api/buyers/${id}`);
      setBuyersMerches(res.data);
    } catch (err) {
      setBuyersMerches(merchData);
    }
  };
  const getBuyers = async (id) => {
    console.log(id);
    try {
      let res = await Axios.get(`/api/sellers/${id}`);
      setBuyers(res.data);
    } catch (err) {
      setBuyers(buyerData);
    }
  };
  const renderBuyers = () => {
    if (buyers.length === 0) {
      return <h1>select an seller</h1>;
    }
    return (
      <Form.Select
        onChange={(e, { value }) => {
          getBuyersMerches(value);
        }}
        options={buyers.map((b) => {
          return {
            key: `buyer-${b.id}`,
            value: b.id,
            text: `${b.name}`,
          };
        })}
      />
    );
  };
  const renderMerchData = () => {
    if (getBuyersMerches.length === 0) return null;
    return buyersMerches.map((bp) => {
      return (
        <div>
          <p>Price: {bp.price}</p>
          <p>
            Category: {bp.category}, description: {bp.description}
          </p>
          <hr />
        </div>
      );
    });
  };
  return (
    <>
      <h1>Find Merchandise</h1>
      <Form.Select
        onChange={(e, { value }) => {
          getBuyers(value);
        }}
        options={sellers.map((s) => {
          return {
            key: `seller-${s.id}`,
            value: s.id,
            text: `${s.name}`,
          };
        })}
      />
      {renderBuyers()}
      {renderMerchData()}
    </>
  );
};