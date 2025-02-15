import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { globalData } from "./App";
export default function Login() {
    const {data,setData}=useContext(globalData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(()=>
  {
    console.log(data);
    
  },[data])
  const onSubmit = (data) => {
    console.log("success");
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
      {...register("password",{
        required:"Enter password",
        validate: (value)=> value!==data.password||"Does not Match"
        },)}/>
      <p>{errors.password?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
