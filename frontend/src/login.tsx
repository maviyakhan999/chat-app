import React, { useState } from "react";
import { useImmer } from "use-immer";
import { useStoreState, store } from "./store";

const Login = () => {
  const storeState = useStoreState(state=> state.ecommerceState)
  const [formData, setFormData] = useImmer({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((draft) => {
      // @ts-ignore
      draft[name] = value;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "fail") {
        return alert(data.message);
      } 

      store.getActions().ecommerceState.login({
        isLoggedIn: true,
        authToken: data.token,
        email: formData.email
      })
      
    } catch (error) {
      // Handle error
    }
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-3 p-10">
      <h1>SignIn</h1>
      <input
        className="border border-black text-black rounded-lg w-[50%]"
        placeholder="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        className="border border-black text-black rounded-lg w-[50%]"
        placeholder="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
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

export default Login;
