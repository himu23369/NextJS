"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })


  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  },[user]) 

  const onLogin = async () => {
    try{
      const response = await axios.post("/api/users/login",user);
      console.log("Login success", response.data); 
      toast.success("Login Success");
      router.push('/profile');
    }catch(error:any){
       console.log("Login Failed", error.message);  
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing":"Login"}</h1>
        <hr />

        <label htmlFor="email">Email</label>
        <input
          className="p-4 border-gray-300 rounded-lg mb-4
          focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
          id="email"
          type="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          className="p-4 border-gray-300 rounded-lg mb-4
          focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
          id="password"
          type="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          className="bg-white my-4 text-black p-4 rounded-lg"
          onClick={onLogin}
        >Login</button>

        <Link href="/signup">
          Visit Signup Page
        </Link>

      </div>
    </>
  )
}

export default LoginPage
