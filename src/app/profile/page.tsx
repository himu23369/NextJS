"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'


const ProfilePage = () => {
  const router = useRouter();
  
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push('/login');
    } catch (error: any) {
      console.log("Logout Failed", error.message);
      toast.error(error.message);
    }
  }

  const [data, setData] = useState("nothing")
  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.userData.username);   
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className="text-center">Profile</h1>
      <hr />
      <p>Profile Page</p>

      {/* Nice h2 showing user details */}
      <h2 className="text-center bg-blue-500 mt-4 p-10">{data === "nothing" ? "Nothing":<Link href= {`/profile/${data}`} >{data}</Link>}</h2>
  
      {/* Detail button */}
      <button onClick={getUserDetails} className="bg-blue-500 mt-4 p-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
        Get User Details</button>

      {/*Logout button */}
      <button onClick={logout} className="bg-blue-500 mt-4 p-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
        Logout</button>
    </div>

  )
}

export default ProfilePage