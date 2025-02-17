import React, { useContext, useEffect, useState } from "react";
import { cardsContext } from "./App";
import { useNavigate, useParams } from "react-router-dom";
export default function Card({ id }) {
    const { cards, setCards,userName,newCard1,setNewCard,index,setIndex } = useContext(cardsContext);
    const [image,setImage]=useState();
    const nav=useNavigate();
    const handleImage=(e)=>{
        console.log("log from image");
        
        const file=e.target.files[0]
        if(file){
            const imageUrl=URL.createObjectURL(file)
            console.log(imageUrl);
            setNewCard({ ...newCard1, image:imageUrl});
            setImage(imageUrl)
        }
    }
    useEffect(()=>
    {
        console.log("cards:card",newCard1);
        
    },[])
    //{id:"",Quote:"",description:"",attitude:"",points:"",jobs:"",activities:""}

    const handleChange = (e) => {
        setNewCard({ ...newCard1, [e.target.name]: e.target.value });
        console.log(newCard1);
        
      };
    const handleAddCard = () => {
        if(index===null)
        {
        setCards([...cards, newCard1]);
        setIndex(null);
        }
        else
        {
            const newCards=[...cards];
            newCards[index]=newCard1;
            setCards(newCards);
            setIndex(null);
        }
        nav(`/${userName}`)
    };

    const handleDelete=()=>{
        const newCards=cards.filter((card,i)=>i!==index);
        setCards(newCards);
        nav(`/${userName}`)
    }

    const closeCard=()=>
    {
        nav(`/${userName}`)
    }
    return (
        <div className="card shadowp-3 d-flex">
            <input className=" p-3 " type="file" accept="image/*" onChange={handleImage}/>
            <div className="form-container d-flex flex-column col col-5">
            <label>Notable Quote</label>
            <input className=" p-3 " type="text" value={newCard1?.Quote} placeholder="Enter a quote that identifies the persona" name="Quote" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-5">
            <label>Description</label>
            <input className=" p-3 " type="text" value={newCard1?.description} placeholder="Enter a general description/bio about the persona" name="description" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-5">
            <label>Attitude/Motivations</label>
            <input className=" p-3 " type="text" value={newCard1?.attitude} placeholder="What drives incentives the persona to reach desired goals? what mindset does the persona have?" name="attitude" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-5">
            <label>Plain Points</label>
            <input className=" p-3 " type="text" value={newCard1?.points} placeholder="What are the biggest challenges that the persona faces in their job?" name="points" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-5">
            <label>Jobs/Needs</label>
            <input className=" p-3 " type="text" value={newCard1?.jobs} placeholder="What are the persona's functional social and emotional needs to be successful at their jobs" name="jobs" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-5">
            <label>Activities</label>
            <input className=" p-3 " type="text" value={newCard1?.activities} placeholder="What does the persona like to do in hteir free time?" name="activities" onChange={handleChange} />
            </div>
            <footer className="d-flex justify-content-between ms-3">
            <button className="delete text-danger" onClick={handleDelete}>DELETE</button>
            <div className="right-footer mx-3 d-flex">
            <button onClick={closeCard} className="text-primary">CLOSE</button>
            <button onClick={handleAddCard} className="bg-primary">UPDATE PERSONA</button>
            </div>
            </footer>
        </div>
    );
}
