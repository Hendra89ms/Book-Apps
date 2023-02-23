import React, { useState, useEffect } from 'react'
import { Navbar, Footer, Spinner } from '../../components'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Book_Services from '../../service/Book_Service';

export default function ListBook() {

    const [state, setState] = useState({
        showBook: true,
        loading: false,
        error: "",
    })

    const [query, setQuery] = useState('')
    const [bookData, setBookData] = useState([])
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        setState({ ...state, loading: true })

        try {
            const resp = await Book_Services.getAllBook()

            // mapping mereturn object dari firebase
            const books = resp.docs.map((item) => {
                let data = { ...item.data(), id: item.id }

                return data
            });

            setBookData(books)
            setState({
                ...state,
                loading: false
            })

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

                const resp = Book_Services.deleteBook(id)

                fetchData()

            }
        })






    }

    const handleSearch = (e) => {
        let query = e.target.value;

        setQuery(query)
    }

    useEffect(() => {

        fetchData()
    }, [])

    useEffect(() => {
        const filtered = bookData.filter((item) => item.judul.toLowerCase().includes(query.toLowerCase()));

        setFilteredData(filtered)
    }, [bookData, query])

    return (
        <>

            {
                state.loading ? <Spinner /> : (
                    <>
                        <Navbar />
                        <div className='sm:w-[820px] mx-auto w-full mt-[90px]'>
                            <div className='flex gap-2 items-center w-full pl-4  sm:pl-0'>
                                <h1 className='text-md sm:text-xl font-bold '>Add Your Favorite Book</h1>

                                <Link to={'/addBook'} className='bg-green-600 text-white w-[70px] sm:w-[80px] h-[35px] rounded-sm flex justify-center items-center gap-1'>
                                    <Icon icon="material-symbols:add-circle-rounded" className='text-sm sm:text-xl' />
                                    <p className='font-bold text-sm '>Add</p>
                                </Link>
                            </div>

                            <form autoComplete='off' className="flex items-center mt-5 w-full pl-4 sm:pl-0 ">
                                <label htmlFor="voice-search" className="sr-only">Search</label>
                                <div className="relative w-[300px] sm:w-[500px]">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    </div>

                                    <input
                                        value={query}
                                        onChange={handleSearch}
                                        type="text"
                                        id="search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md outline-blue-500  block w-full pl-10 p-2.5 rounded-md "
                                        placeholder="Search your book "
                                    />

                                </div>

                            </form>
                        </div>
                        <div className='w-screen sm:w-[900px] sm:mx-auto min-h-screen mt-[20px] flex flex-col  items-center '>


                            {
                                state.showBook ? <div className='flex flex-wrap gap-5 mt-5  mx-4 rounded-md mb-1'>
                                    {

                                        filteredData.map((book) => {
                                            return (
                                                <div key={book.id} className='flex flex-col gap-2 rounded-md justify-center items-center w-full p-5 h-[430px] border-slate-300 border-[1px] sm:max-w-[400px]'>
                                                    <img src={book.link_gambar} alt={"Tidak ada link buku"} className='w-[150px] h-[180px] object-cover  ' />

                                                    <div className='flex flex-col leading-6'>
                                                        <div className='flex gap-2 ml-auto'>

                                                            <Link to={`/editBook/${book.id}`}>
                                                                <Icon
                                                                    icon="material-symbols:edit-document-outline-sharp" className='cursor-pointer text-[28px] hover:text-blue-500 duration-300' />
                                                            </Link>

                                                            <Icon
                                                                onClick={() => { handleDelete(book.id) }}
                                                                icon="ic:baseline-delete" className='cursor-pointer hover:text-red-500 duration-300 text-[28px]' />
                                                        </div>

                                                        <div className='flex flex-col text-sm sm:text-[16px] '>

                                                            <span>Judul : <span className='lowercase'>{book.judul}</span> </span>
                                                            <hr />
                                                            <span>Pengarang : <span>{book.pengarang}</span> </span>
                                                            <hr />
                                                            <span>Harga : <span>Rp {book.harga}</span> </span>
                                                            <hr />
                                                            <span className='truncate w-[300px]'>Sinopsis : <span >{book.sinopsis}</span> </span>

                                                        </div>
                                                        <Link to={`/detail/${book.id}`} className='mt-3 bg-green-500 h-[35px] rounded-md text-white flex justify-center items-center hover:bg-green-400 duration-300'>Lihat Detail...</Link>
                                                    </div>


                                                </div>

                                            )
                                        })

                                    }

                                </div> :
                                    <div className=' w-screen h-[400px] flex justify-center items-center '>
                                        <p className='text-red-500' >Please... Add Your Data!</p>
                                    </div>
                            }


                        </div>

                        <Footer />
                    </>
                )
            }


        </>
    )
}
