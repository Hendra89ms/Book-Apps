import React from 'react';

export default function Spinner() {

    return (
        <>
            <div className='w-screen min-h-screen flex justify-center items-center'>
                <div className="w-12 h-12 border-4 border-blue-300 rounded-full loader"></div>
            </div>

        </>
    );
}
