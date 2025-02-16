import React, { useState } from "react";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, useNavigate,Link } from "react-router-dom";
export default function Home() {
  const nav =useNavigate();
  
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "John Doe",
      profilePhoto: "https://via.placeholder.com/100",
      address: "123 Main St, City",
    },
  ]);

  const addNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      name: `User ${cards.length + 1}`,
      profilePhoto: "https://via.placeholder.com/100",
      address: "New Address",
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">User Cards</h2>
      <button className="btn btn-primary mb-3" onClick={addNewCard}>
        Add New
      </button>
      <div className="row">
        {cards.map((card) => (
          // <Link to={'card'}>
          <div key={card.id} className="col-md-4" onClick={()=>nav('card')}>
            <Card name={card.name} profilePhoto={card.profilePhoto} address={card.address} />
          </div>
          // </Link>
        ))}
        {/* <Outlet/> */}
      </div>
    </div>
  );
}
