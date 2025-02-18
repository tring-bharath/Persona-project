import React, { useState, useContext } from "react";
import Card from "./Card";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { cardsContext } from "./App";
export default function Home() {

  const nav = useNavigate();
  const { cards, setCards,newCard1,setNewCard,index,setIndex } = useContext(cardsContext);
  
  const addNewCard = () => {
    const id = cards.length;
    setNewCard();//{id:"",Quote:"",description:"",attitude:"",points:"",jobs:"",activities:""}
    nav(`card${id}`);
  };

  const editCard=(i)=>
  {
    setNewCard(cards[i]);
    setIndex(i);
    nav( `card${i}`)
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">User Cards</h2>
      <button className="btn text-primary mb-3" onClick={addNewCard}>
        + Add Persona
      </button>
      <div className="row">
        {cards.map((card,i) => (
          <div key={i} className="cards" onClick={()=>editCard(i)}>
            <img src={card.image} style={{ width: "300px", height: "200px" }} />
            <h5 className="card-title text-center m-2">{card.Quote}</h5>
            <p className="card-text px-2">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
