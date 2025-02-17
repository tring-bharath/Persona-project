import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { globalData } from "./App";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
    const { users, setData, setUser } = useContext(globalData);
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) => {
        const foundUser = users.find(user => user.email === formData.email && user.password === formData.password);

        if (foundUser) {
            setData(foundUser);
            setUser(true);
            nav(`/${foundUser.name}`);
        } else {
            alert("Invalid credentials! Please check your email and password.");
        }
    };

    return (
        <form className="form d-flex flex-column container col-4 p-5 mt-5 rounded bg-warning" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">Login</h3>
            <label className="mt-3">Email:</label>
            <input
                className="form-control"
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                    },
                })}
            />
            <p className="text-danger">{errors.email?.message}</p>
            <label>Password:</label>
            <input
                className="form-control"
                type="password"
                {...register("password", {
                    required: "Enter password",
                })}
            />
            <p className="text-danger">{errors.password?.message}</p>
            <button className="p-2 rounded bg-primary mt-4 text-white" type="submit">
                Submit
            </button>
        </form>
    );
}
