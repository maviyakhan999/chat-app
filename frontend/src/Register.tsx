import React, { useState } from "react";
import { useImmer } from "use-immer";

const Register = () => {
  const [formData, setFormData] = useImmer({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      if(data.status !== "success"){
        alert("invalid username or passwod")

      }

    } catch (error) {
      // Handle error
    }
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-3 p-10">
      <h1>Register</h1>
      <input
        className="border border-black text-black rounded-lg w-[50%]"
        placeholder="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => {
          setFormData((data) => {
            data.email = e.target.value;
          });
        }}
      />
      <input
        className="border border-black text-black rounded-lg w-[50%]"
        placeholder="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => {
          setFormData((data) => {
            data.password = e.target.value;
          });
        }}
      />
      <input
        className="border border-black text-black rounded-lg w-[50%]"
        placeholder="Name"
        type="Name"
        name="Name"
        value={formData.name}
        onChange={(e) => {
          setFormData((data) => {
            data.name = e.target.value;
          });
        }}
      />

      <button
        className=" bg-gray-600 rounded-md w-[300px] p-5"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Register;
