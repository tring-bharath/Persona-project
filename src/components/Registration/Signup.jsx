import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { globalData } from "../../App";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
export default function Signup() {
	const { data, setData,url } = useContext(globalData);
	const nav = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();

	// const onSubmit = async(data) => {
	// 	console.log(data);
		
	// 	toast.success("Registered",{autoClose:1000})
    //     const query = `
    //         mutation {
    //             register(username: "${data.name}", email: "${data.email}", password: "${data.password}")
    //         }
    //     `;
    //     try {
    //         const response = await axios.post("http://localhost:1000/graphql", { query });
    //         setMessage(response.data.data.register);
    //     } catch (error) {
    //         setMessage("Error registering user");
    //     }
	// 	// setData(user);
	// 	nav("/login");
		
	// };

	const onSubmit = async (user) => {
        const query = `
            mutation {
                register(username: "${user.name}", email: "${user.email}", password: "${user.password}")
				{
					id
					username
					email
				}
            }
        `;
        try {
            const response = await axios.post(url, { query });
			
            console.log(response.data.data.register);
			nav("/login");
        } catch (error) {
            console.log("Error registering user");
        }
    };

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form d-flex flex-column container col-4 p-5 mt-5 ">
			<h3 className="text-center">SignUp</h3>
			<label className="mt-3">Name:</label>
			<input className="form-control border-success" {...register("name", { required: "Name is required" })} />
			<p>{errors.name?.message}</p>
			<label>Email:</label>
			<input className="form-control border-success"
				name="email"
				type="email"
				{	...register("email", {
					required: "Email is required",
					pattern: {
						value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
						message: "Invalid email format"
					}
				})
				}
			/>
			<p>{errors.email?.message}</p>
			<label>Password:</label>
			<input className="form-control border-success" type="password" name="password"
			{...register("password", 
			{ 
				required: "Enter password",
				 validate: (value) => value.length > 8 || "Password must be greater than 8 letters" 
			})} />
			<p>{errors.password?.message}</p>
			<label>Confirm Password</label>
			<input className="form-control border-success" type="password" name="confirm-password" 
			{...register("confirmpassword",{ 
				required: "Confirm password", 
				validate: (value) => value === watch("password") || "Passwords do not match" 
			})} />
			<p>{errors.confirmpassword?.message}</p>
			<button className="p-2 rounded bg-primary mt-4" type="submit">Submit</button>
		</form>
	);
}
