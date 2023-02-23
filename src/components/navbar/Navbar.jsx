import React from 'react'
import Logo from '../../assets/books_transparant.png'

export default function Navbar() {

    return (
        <>
            <div className='w-full sm:w-[900px] bg-slate-300 h-[70px] flex fixed sm:left-[180px] top-0 z-[99] sm:rounded-xl'>

                <div className='flex items-center pl-3 sm:pl-4'>
                    <img src={Logo} alt="" className='w-[40px] h-[40px] bg-transparent select-none' />
                    <h1 className='text-xl sm:text-lg select-none'>BookApps</h1>
                </div>
            </div>

        </>
    )
}
