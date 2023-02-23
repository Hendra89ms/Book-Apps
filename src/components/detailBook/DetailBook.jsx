import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { Spinner } from '../spinner';
import Book_Services from '../../service/Book_Service';

export default function DetailBook() {

    const { id } = useParams()

    const [state, setState] = useState({
        book: {},
        loading: false,
        error: ""
    })

    const detailBook = async () => {

        try {
            setState({ ...state, loading: true })
            const resp = await Book_Services.getBook(id)

            const data = resp.data()

            setState({ ...state, book: data, loading: false })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        detailBook()
    }, [])

    return (
        <>
            {
                state.loading ? <Spinner /> : (
                    <div className='bg-slate-200 w-screen h-[1050px] mb-10 '>
                        <div className='w-screen h-screen px-5 pt-5 sm:px-0  sm:w-[600px] sm:mx-auto '>

                            <Link to={'/'} className=' cursor-pointer text-gray-400 hover:text-red-500  duration-300 '>
                                <Icon icon="fa6-solid:arrow-left-long" fontSize={20} />
                            </Link>


                            <h2 className='text-[22px] my-8 '>Detail Buku</h2>

                            <div className='flex flex-col bg-white py-4 rounded-md px-5'>
                                <div className=' mt-2 mb-4 flex justify-center items-center '>
                                    <img src={state.book.link_gambar} alt="bebas" className='w-[200px] sm:w-[300px]' />
                                </div>
                                <div className='w-full flex flex-col justify-center   '>
                                    <p>Judul : <span className='font-bold'>{state.book.judul}</span></p>
                                    <hr />
                                    <p>Pengarang : <span className='font-bold'>{state.book.pengarang}</span></p>
                                    <hr />
                                    <p>Penerbit : <span className='font-bold'>{state.book.pengarang}</span></p>
                                    <hr />
                                    <p>Harga : <span className='font-bold'>Rp {state.book.harga}</span></p>
                                    <hr />
                                    <p>Sinopsis : <span className='font-bold'>{state.book.sinopsis}</span></p>
                                    <hr />
                                    <p>Keterangan : <span className='font-bold'>{state.book.keterangan}</span></p>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        </>
    );
}
