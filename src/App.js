import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AddBook, ListBook, EditBook, DetailBook, SplashScreen } from './components'

export default function App() {
  const [showScreen, setShowScreen] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    setTimeout(() => {
      setShowScreen(false)
      navigate('/', { replace: true })
    }, 3000)

  }, [])

  return (
    showScreen ? (
      <Routes>
        <Route path='/' element={<SplashScreen />} />
      </Routes>
    )
      :
      <Routes>
        <Route path='/' element={<ListBook />} />

        <Route path='/addBook' element={<AddBook />} />
        <Route path='/editBook/:id' element={<EditBook />} />
        <Route path='/detail/:id' element={<DetailBook />} />
      </Routes>
  );
}
