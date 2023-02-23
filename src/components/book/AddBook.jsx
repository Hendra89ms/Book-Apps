import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from '../spinner/Spinner'
import Book_Services from '../../service/Book_Service';


export default function AddBook() {

    // from sweet alert2
    const alertSuccess = () => {
        const MySwal = withReactContent(Swal)

        return MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil Menambah Data Buku',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const alertGagal = () => {
        const MySwal = withReactContent(Swal)

        return MySwal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Terjadi Kesalahan!'
        })
    }

    const navigate = useNavigate()

    const [state, setState] = useState({
        book: {
            judul: "",
            pengarang: "",
            harga: "",
            penerbit: "",
            link_gambar: "",
            sinopsis: "",
            keterangan: ""
        },
        loading: false,
        error: ""
    })

    const handleChangeInput = (e) => {
        setState({
            ...state,
            book: {
                ...state.book,
                [e.target.name]: e.target.value
            }
        })
    }

    const addBook = async () => {
        try {
            setState({ ...state, loading: true })
            const resp = await Book_Services.addBook(state.book)

            if (resp) {
                alertSuccess()
                navigate('/', { replace: true })
            }

        } catch (error) {
            alertGagal()
            console.log(error)
            navigate('/addBook', { replace: false })
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        let judul = e.target.judul.value.toLowerCase()
        let pengarang = e.target.pengarang.value
        let harga = e.target.harga.value
        let penerbit = e.target.penerbit.value
        let link_gambar = e.target.link_gambar.value
        let sinopsis = e.target.sinopsis.value
        let keterangan = e.target.keterangan.value

        if (!judul || !pengarang || !harga || !penerbit || !sinopsis || !keterangan || !link_gambar) {
            return alertGagal()
        }

        addBook()

    }

    return (
        <>

            {
                state.loading ? <Spinner /> :

                    <form onSubmit={handleSubmit} autoComplete='off' className="w-screen min-h-screen flex flex-col justify-center items-center " >



                        <div className='w-[350px] sm:w-[450px] h-[600px] flex  justify-center items-center rounded-md p-5 bg-white '>



                            <div className=" w-[300px] sm:w-[300px] ">

                                <Link to={'/'}>
                                    <Icon icon="fa6-solid:arrow-left-long" className='cursor-pointer text-gray-400 hover:text-red-500  duration-300 mr-auto ' width={23} style={{ marginBottom: 40 }} />
                                </Link>

                                <h1 className='text-center text-orange-500 text-xl mb-6'>Add Your Book </h1>

                                <div className='flex flex-col gap-3  '>
                                    <input
                                        onChange={handleChangeInput}
                                        type="text"
                                        name="judul"
                                        className="lowercase bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md " placeholder="judul" />

                                    <input
                                        onChange={handleChangeInput}
                                        type="text"
                                        name="pengarang"
                                        className="lowercase bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                        placeholder="pengarang" />

                                    <input
                                        onChange={handleChangeInput}
                                        type="number" name="harga"
                                        className="lowercase bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                        placeholder="harga" />

                                    <input
                                        onChange={handleChangeInput}
                                        type="text"
                                        name="penerbit"
                                        className="lowercase bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                        placeholder="penerbit" />

                                    <input
                                        onChange={handleChangeInput}
                                        type="url"
                                        name="link_gambar"
                                        className="lowercase bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md " placeholder="Link Gambar" />

                                    <textarea
                                        onChange={handleChangeInput}
                                        name="sinopsis"
                                        className='lowercase border-gray-300 border-[1px] pl-3 pt-2 outline-blue-500 h-[80px] rounded-md' placeholder='sinopsis' >
                                    </textarea>

                                    <textarea
                                        onChange={handleChangeInput}
                                        name="keterangan"
                                        className='lowercase border-gray-300 border-[1px] pl-3 pt-2 outline-blue-500 h-[80px] rounded-md' placeholder='keterangan' >
                                    </textarea>

                                    <button type='submit' className='w-full h-[40px] bg-orange-500 text-white rounded-md hover:bg-orange-400 duration-300'>Submit</button>
                                </div>


                            </div>
                        </div>

                    </form>
            }


        </>
    )
}
