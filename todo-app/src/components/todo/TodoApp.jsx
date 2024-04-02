import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
//import AuthProvider, { useAuth } from './security/AuthContext'
import { AuthContext } from './security';

import './TodoApp.css'
import ListBlogsComponent from './ListBlogsComponent'
import BlogComponent from './BlogComponent'
import { useContext } from 'react'
import AuthProvider from './security/AuthProvider'


function AuthenticatedRoute({children}) {
    //const authContext = useAuth()

    const { user } = useContext( AuthContext );
    
    if(user.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />
                        
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                        } />
                        
                        <Route path='/blogs' element={
                            <AuthenticatedRoute>
                                <ListBlogsComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/blog/:id' element={
                            <AuthenticatedRoute>
                                <BlogComponent /> 
                            </AuthenticatedRoute>
                        } />
  

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent /> 
                            </AuthenticatedRoute>
                        } />
                        
                        <Route path='*' element={<ErrorComponent /> } />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
