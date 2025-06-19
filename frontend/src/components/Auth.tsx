import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import type {SignupInput} from "@tushar16/mediumblog-common";
import axios from "axios";
import {BACKEND_URL} from "../../config";
const Auth = ({type}: {type: "signup" | "signin"}) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  })

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch(e) {
      console.log(e);
      alert("Something wrong happens"); 
    }
  }

  
  return (
    <div className="h-screen bg-white flex flex-col justify-center items-center">
      {/* {JSON.stringify(postInputs)} */}
      <div className="mb-5">
        <h1 className="font-bold text-3xl">
          Create an account
        </h1>
        <h3 className="text-slate-400 text-center mt-1">Already have an account? 
           <Link to={type === "signin" ? "/signup" : "/signin"} className="ml-1 underline">
              {type === "signin" ? "Sign up" : "Sign in"}
           </Link>
        </h3>
      </div>
      <div>
        {type === "signup" ? (
        <LableInput
          label="Name"
          placeholder="Tushar Sachdeva"
          onchange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value,
            });
          }}
        />
      ) : null}


        <LableInput label="Email" placeholder="tush@gmail.com"
         onchange={(e) => {
          setPostInputs({
            ...postInputs,
            username: e.target.value
          })
        }} />

        <LableInput label="Password" type={"password"} placeholder="Enter your Password"
         onchange={(e) => {
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }} />
      </div>
      <button onClick={sendRequest} className="bg-black text-white mt-4 w-sm p-2.5 rounded-lg cursor-pointer">
        {type === 'signin' ? "Login" : "Sign up"}
      </button>
    </div>
  )
}

interface LableInputType {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void; 
  type?: string; 
}

function LableInput({label, placeholder, onchange, type}: LableInputType) {
  return (
    <div>
    <label className="block mb-1 text-sm font-medium text-black">{label}</label>
    <input onChange={onchange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-sm p-2.5 " placeholder={placeholder} required />
    </div>
  )
}

export default Auth