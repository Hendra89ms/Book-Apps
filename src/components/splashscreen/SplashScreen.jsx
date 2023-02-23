import React from 'react';
import Photo from '../../assets/books_transparant.png'

export default function SplashScreen() {
    return (
        <div className="w-screen min-h-screen flex justify-center items-center bg-[url('https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center bg-no-repeat bg-transparent">

            <div className='w-full h-screen sm:w-[900px] flex justify-center items-center'>

                <div className='bg-black w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full flex flex-col justify-center items-center '>
                    <h1 className='text-white text-2xl'>Book<span className='text-orange-500'>Apps</span></h1>
                    <img src={Photo} alt="book" className='w-[80px] bg-white rounded-full' />

                    <div className='text-white text-[40px]'>
                        . . . .
                    </div>
                </div>

            </div>
        </div>
    );
}
