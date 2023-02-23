import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import arrowBack from '@iconify/icons-material-symbols/arrow-back';
import { Link, useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Book_Services from '../../service/Book_Service';

export default function EditBook() {

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

    const alertSuccess = () => {
        const MySwal = withReactContent(Swal)

        return MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Data di Edit',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const alertGagal = () => {
        const MySwal = withReactContent(Swal)

        return MySwal.fire({
            position: 'center',
            icon: 'error',
            title: 'Terjadi Kesalahan',
            showCloseButton: true,
        })
    }

    // handle perubahan inputan
    const handelChange = (e) => {
        setState({
            ...state,
            book: {
                ...state.book,
                [e.target.name]: e.target.value
            }
        })
    }

    const { id } = useParams()
    const navigate = useNavigate()

    const handleEdit = async () => {

        try {

            setState({ ...state, loading: true })
            const respon = await Book_Services.getBook(id)

            setState({
                ...state,
                loading: false,
                book: {
                    ...state.book,
                    judul: respon.data().judul,
                    pengarang: respon.data().pengarang,
                    penerbit: respon.data().penerbit,
                    harga: respon.data().harga,
                    link_gambar: respon.data().link_gambar,
                    keterangan: respon.data().keterangan,
                    sinopsis: respon.data().sinopsis,

                }
            })

        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        let judul = e.target.judul.value
        let pengarang = e.target.pengarang.value
        let harga = e.target.harga.value
        let penerbit = e.target.penerbit.value
        let link_gambar = e.target.link_gambar.value
        let sinopsis = e.target.sinopsis.value
        let keterangan = e.target.keterangan.value


        if (!judul || !pengarang || !harga || !penerbit || !sinopsis || !keterangan || !link_gambar) {
            return alertGagal()
        }

        try {
            setState({ ...state, loading: true })

            await Book_Services.updateBook(id, state.book).then(res => {
                alertSuccess()
                return navigate('/', { replace: true })
            })


        } catch (error) {
            console.log(error)
            navigate(`/editBook/${id}`, { replace: false })
        }



    }

    useEffect(() => {
        handleEdit()
    }, [])




    return (
        <>
            <div className='w-screen h-screen px-5 pt-5 sm:px-0  sm:w-[600px] sm:mx-auto '>

                <Link to={'/'}>
                    <Icon icon="fa6-solid:arrow-left-long" className='cursor-pointer text-gray-400 hover:text-red-500  duration-300 ' width={23} style={{ marginBottom: 40 }} />
                </Link>


                <form onSubmit={handleSubmit} autoComplete='off' className="flex flex-col justify-center items-center " >



                    <div className='w-[350px] sm:w-[450px] h-[600px] flex flex-col  justify-center items-center rounded-md p-5 bg-white '>



                        <div className=" w-[300px] sm:w-[300px] ">

                            <h1 className='text-center text-orange-500 text-xl mb-6'>Edit Your Book </h1>

                            <div className='flex flex-col gap-3  '>
                                <input
                                    type="text"
                                    onChange={handelChange}
                                    name="judul"
                                    value={state.book.judul}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                    placeholder="judul" />

                                <input
                                    type="text"
                                    onChange={handelChange}
                                    value={state.book.pengarang}
                                    name="pengarang"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                    placeholder="pengarang" />

                                <input
                                    type="number"
                                    onChange={handelChange}
                                    value={state.book.harga}
                                    name="harga"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                    placeholder="harga" />

                                <input
                                    type="url"
                                    onChange={handelChange}
                                    value={state.book.link_gambar}
                                    name="link_gambar"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                    placeholder="Link_Gambar" />



                                <input
                                    type="text"
                                    onChange={handelChange}
                                    value={state.book.penerbit}
                                    name="penerbit"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full 
                        p-2.5 pl-3 rounded-md "
                                    placeholder="penerbit" />

                                <textarea
                                    name="sinopsis"
                                    onChange={handelChange}
                                    value={state.book.sinopsis}
                                    className='border-gray-300 border-[1px] pl-3 pt-2 outline-blue-500 h-[80px] rounded-md' placeholder='sinopsis' >
                                </textarea>

                                <textarea
                                    name="keterangan"
                                    onChange={handelChange}
                                    value={state.book.keterangan}
                                    className='border-gray-300 border-[1px] pl-3 pt-2 outline-blue-500 h-[80px] rounded-md'
                                    placeholder='keterangan' >
                                </textarea>

                                <button
                                    type='submit'
                                    className='w-full h-[40px] bg-orange-500 text-white rounded-md hover:bg-orange-400 duration-300'>Submit</button>
                            </div>


                        </div>
                    </div>

                </form>
            </div>

        </>

    )
}
