import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { globalData } from "./App";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const { data, setData } = useContext(globalData);
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = () => {
        console.log(data.name);
        
        nav(`/Home/${data.name}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Email:</label>
            <input
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
            <input
                type="password"
                {...register("password", {
                    required: "Enter password",
                    validate: (value) => value === data.password || "Does not Match"
                },)} />
            <p>{errors.password?.message}</p>
            <button type="submit">Submit</button>
        </form>
    );
}
