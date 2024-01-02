import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className="text-center text-3xl border-spacing-3 p-7">Profile</h1>
            <hr /> 
            <p className='text-4xl'>Profile Page
                <span className='bg-red-600 m-4 p-2 rounded'>
                    {params.id}
                </span>
            </p>
        </div>

    )
}

export default UserProfile