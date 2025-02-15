import React, { useEffect, useState,useContext } from "react";
import { useForm } from "react-hook-form";
import { globalData } from "./App";
export default function Signup() {
  const {data,setData}=useContext(globalData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (user) => {
    // console.log(errors.password.message);
    
    setData(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register("name", { required: "Name is required" })} />
      <p>{errors.name?.message}</p>
      <label>Email:</label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format"
          }
        })}
      />
      <p>{errors.email?.message}</p>
        <input type="password" {...register("password",{required:"Enter password",validate: (value)=> value.length>8||"Password must be greater than 8 letters"})}/>
        <p>{errors.password?.message}</p>
        <input type="password" {...register("confirmpassword",{required:"Confirm password",validate: (value) => value === watch("password") || "Passwords do not match"})}/>
        <p>{errors.confirmpassword?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
