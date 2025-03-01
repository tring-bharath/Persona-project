import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { globalData } from "../../App";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from 'yup';
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
export default function Login() {
    const { users, setData, setUser } = useContext(globalData);
    const nav = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    // const onSubmit = (formData) => {
    //     const foundUser = users.find(user => user.email === formData.email && user.password === formData.password);

    //     if (foundUser) {
    //         setData(foundUser);
    //         setUser(true);
    //         toast.success("Login Successful",{autoClose:1000})
    //         nav(`/${foundUser.name}`);
    //     } else {
    //         toast.error("Invalid Email or Password",{autoClose:1000});
    //     }
    // };

    const onSubmit = async (user) => {
        const query = `
            query
{
	login(email:"${user.email}",password:"${user.password}")
  {
    id
    username
    email
  }
}
        `;
        try {
            const response = await axios.get("http://localhost:1000/graphql",  {query} );
            console.log(response.data.data.login);
        } catch (error) {
            // console.log(response.data.data.login);
        }
    };



    return (
        <form className="form d-flex flex-column container col-4 p-5 mt-5 " onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">Login</h3>
            <label className="mt-3">Email:</label>
            <input
                className="form-control border-success"
                type="email"
                {...register("email")}
            />
            <p className="text-danger">{errors.email?.message}</p>
            <label>Password:</label>
            <input
                className="form-control border-success"
                type="password"
                {...register("password")}
            />
            <p className="text-danger">{errors.password?.message}</p>
            <button className="p-2 bg-primary mt-4 text-white" type="submit">
                Submit
            </button>
        </form>
    );
}
