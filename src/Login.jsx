import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { globalData } from "./App";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Login() {
    const { data, setData,user,setUser } = useContext(globalData);
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = () => {
        console.log(data.name);
        setUser(true);
        nav(`/${data.name}`);
    };

    return (
        <form className="form d-flex flex-column container col-4 p-5 mt-5 rounded bg-warning" onSubmit={handleSubmit(onSubmit)}>

            <label>Email:</label>
            <input className="form-control "
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                    },
                })}
            />
            <p>{errors.email?.message}</p>
            <label>Password</label>
            <input className="form-control "
                type="password"
                {...register("password", {
                    required: "Enter password",
                    validate: (value) => value === data.password || "Does not Match"
                },)} />
            <p>{errors.password?.message}</p>
            <button className="p-2 rounded bg-primary mt-4" type="submit">Submit</button>
        </form>
    );
}
