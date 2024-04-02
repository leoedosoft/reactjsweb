
import { Navigate, Route, Routes } from 'react-router-dom';

import BlogComponent from '../BlogComponent';
import ErrorComponent from '../ErrorComponent';
import ListBlogsComponent from '../ListBlogsComponent';
import LoginComponent from '../LoginComponent';
import LogoutComponent from '../LogoutComponent';
import { useAuth } from '../security/AuthContext';
import WelcomeComponent from '../WelcomeComponent';


function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export const TodosRoutes = () => {
  return (
    <>
     

        <div className="container">
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
        </div>


    </>
  )
}
