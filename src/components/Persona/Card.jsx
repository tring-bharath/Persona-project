import React, { useContext,useState } from "react";
import { cardsContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Modal,Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
export default function Card() {
    const [showModal,setShowModal]=useState(false);
    const {
        register,
        watch,
        handleSubmit
    } = useForm();
    const { cards, setCards, userName, newCard, setNewCard, index, setIndex } = useContext(cardsContext);
    const nav = useNavigate();
    const handleImage = (e) => {
        const file = e.target.files[0]
        const size = 5242880;
        if (file.size > size) {
            toast.error("File sie Should be less than 5MB");
            return;
        }
        if (!file.type.startsWith("image/")) {
            toast.error("Enter Valid Image Format")
            e.target.value = "";
            return;
        }
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            console.log(imageUrl);
            setNewCard({ ...newCard, image: imageUrl });
        }

    }

    const handleChange = (e) => {
        setNewCard({ ...newCard, [e.target.name]: e.target.value });
        console.log(newCard);

    };
    const handleAddCard = () => {
        if (newCard.quote == "" && newCard.description == "" && newCard.jobs == "" && newCard.attitude == "" && newCard.activities == "" && newCard.points == "") {
            toast.error("Fill the details");
            return;
        }
        if (index === null) {
            setCards([...cards, newCard]);
            setIndex(null);
        }
        else {
            const newCards = [...cards];
            newCards[index] = newCard;
            setCards(newCards);
            setIndex(null);
        }
        nav(`/${userName}`)
    };

    const handleDelete = () => {
        setShowModal(true);
    }

    const modalClose=()=>
    {
        setShowModal(false);
    }

    const modalDelete=()=>{
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
        setIndex(null);
        nav(`/${userName}`)
    }


    const removeImage = () => {
        const temp = { ...newCard };
        console.log(temp);

        temp.image = null;
        setNewCard(temp);
    }

    const closeCard = () => {
        nav(`/${userName}`)
    }
    return (
        <div className="card p-3 d-flex">
            <Modal show={showModal} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete the Image</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure want to Delete the Card</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary text-white" onClick={modalClose}>Cancel</Button>
                    <Button variant="danger text-white" onClick={modalDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
            <div className="image-form">
                <img src={newCard?.image} style={{ width: "100%" }} />
            </div>
            <div className="image-btn d-flex">
                <label htmlFor="image" className="my-3 image-label"><span className="bg-info p-2 m-1 rounded">{newCard?.image ? "Edit Image" : "Insert Image"}</span></label>
                {newCard?.image ? (<button onClick={removeImage} className="remove-btn p-2 m-2 border-0 rounded bg-danger">Remove Image</button>) : ("")}
            </div>
            <input id="image" className=" p-3 " type="file" accept="image/*" multiple={false} onChange={handleImage} style={{ display: "none" }} />
            <div className="row px-3 mb-2">
                <div className="form-container d-flex flex-column col col-4">
                    <label>Notable Quote</label>
                    <textarea required className=" p-3 " type="text" value={newCard?.Quote} placeholder="Enter a quote that identifies the persona" name="Quote" onChange={handleChange} />
                </div>
                <div className="form-container d-flex flex-column col col-4">
                    <label>Description</label>
                    <textarea className=" p-3 " type="text" value={newCard?.description} placeholder="Enter a general description/bio about the persona" name="description" onChange={handleChange} />
                </div>
                <div className="form-container d-flex flex-column col col-4">
                    <label>Attitude/Motivations</label>
                    <textarea className=" p-3 " type="text" value={newCard?.attitude} placeholder="What drives incentives the persona to reach desired goals? what mindset does the persona have?" name="attitude" onChange={handleChange} />
                </div>
            </div>
            {/* <ReactQuill  /> */}
            <div className="row px-3">
                <div className="form-container d-flex flex-column col col-4">
                    <label>Plain Points</label>
                    <ReactQuill className=" p-3 border-0 " type="text" value={newCard?.points} placeholder="What are the biggest challenges that the persona faces in their job?" name="points" onChange={handleChange} />
                </div>

                <div className="form-container d-flex flex-column col col-4">
                    <label>Jobs/Needs</label>
                    <ReactQuill className=" p-3 border-0 " type="text" value={newCard?.jobs} placeholder="What are the persona's functional social and emotional needs to be successful at their jobs" name="jobs" onChange={handleChange} />
                </div>
                <div className="form-container d-flex flex-column col col-4">
                    <label>Activities</label>
                    <ReactQuill className=" p-3 border-0 " type="text" value={newCard?.activities} placeholder="What does the persona like to do in their free time?" name="activities" onChange={handleChange} />
                </div>
            </div>
            <footer className="d-flex justify-content-between mt-5">
                {index !== null ? (<button className=" p-2 rounded ms-3 border-0 h5 text-danger" onClick={handleDelete}>DELETE</button>) : (
                    <p></p>
                )}

                <div className="right-footer mx-3 d-flex">
                    <button onClick={closeCard} className="rounded border-0 p-2 me-4 h5 text-info">CLOSE</button>
                    <button type="submit" onClick={handleAddCard} className="rounded border-0 px-4 me-4 p-2 h5 bg-info text-white">{index === null ? "CREATE PERSONA" : "UPDATE PERSONA"}</button>
                </div>
            </footer>
        </div >
    );
}
