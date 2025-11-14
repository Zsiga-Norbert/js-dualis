import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import AddEntryPage from './pages/AddEntryPage.tsx'
import ListEntriesPage from './pages/ListEntriesPage.tsx'
import UserSettingPage from './pages/UserSettingPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/entry' element={<AddEntryPage/>}/>
        <Route path='/entry/list' element={<ListEntriesPage/>}/>
        <Route path='/entry/:id' element={<AddEntryPage/>}/>
        <Route path='/settings' element={<UserSettingPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
