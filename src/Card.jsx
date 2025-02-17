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
            setNewCard({ ...newCard1, image:imageUrl});
            setImage(imageUrl)
        }
    }
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
        const newCards=cards.filter((_,i)=>i!==index);
        setCards(newCards);
        setIndex(null);
        nav(`/${userName}`)
    }

    const closeCard=()=>
    {
        nav(`/${userName}`)
    }
    return (
        <div className="card shadowp-3 d-flex">
            <div className="image-form" style={{border:"1px solid black"}}>
                 <img src={newCard1?.image} style={{width:"100%"}}/>{/* objectFit:"cover" */}
            </div>
            <label htmlFor="image" className="my-3 "><span className="bg-info p-2 m-1 rounded">Edit Image</span></label>
            <input id="image" className=" p-3 " type="file" accept="image/*" onChange={handleImage} style={{display:"none"}}/>
            <div className="row">
            <div className="form-container d-flex flex-column col col-6">
            <label>Notable Quote</label>
            <input className=" p-3 " type="text" value={newCard1?.Quote} placeholder="Enter a quote that identifies the persona" name="Quote" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-6">
            <label>Description</label>
            <input className=" p-3 " type="text" value={newCard1?.description} placeholder="Enter a general description/bio about the persona" name="description" onChange={handleChange} />
            </div>
            </div>
            <div className="row">
            <div className="form-container d-flex flex-column col col-6">
            <label>Attitude/Motivations</label>
            <input className=" p-3 " type="text" value={newCard1?.attitude} placeholder="What drives incentives the persona to reach desired goals? what mindset does the persona have?" name="attitude" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-6">
            <label>Plain Points</label>
            <input className=" p-3 " type="text" value={newCard1?.points} placeholder="What are the biggest challenges that the persona faces in their job?" name="points" onChange={handleChange} />
            </div>
            </div>
            <div className="row">
            <div className="form-container d-flex flex-column col col-6">
            <label>Jobs/Needs</label>
            <input className=" p-3 " type="text" value={newCard1?.jobs} placeholder="What are the persona's functional social and emotional needs to be successful at their jobs" name="jobs" onChange={handleChange} />
            </div>
            <div className="form-container d-flex flex-column col col-6">
            <label>Activities</label>
            <input className=" p-3 " type="text" value={newCard1?.activities} placeholder="What does the persona like to do in hteir free time?" name="activities" onChange={handleChange} />
            </div>
            </div>
            <footer className="d-flex justify-content-between ms-3">
            <button className="delete text-danger p-3 rounded m-2" onClick={handleDelete}>DELETE</button>
            <div className="right-footer mx-3 d-flex">
            <button onClick={closeCard} className="text-primary p-2 rounded m-1">CLOSE</button>
            <button onClick={handleAddCard} className="bg-primary p-2 rounded m-1">UPDATE PERSONA</button>
            </div>
            </footer>
        </div>
    );
}
