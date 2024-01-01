"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignupPage = () => {

  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />

        <label htmlFor="username">Username</label>
        <input
          className="p-4 border-gray-300 rounded-lg mb-4
          focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
          id="username"
          type="text"
          value={user.username}
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

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
          onClick={onSignup}
        >{buttonDisabled ? "Fill the details" : "Sign up"}</button>

        <Link href="/login">
          Visit Login Page
        </Link>

      </div>
    </>
  )
}

export default SignupPage
