import { useReducer } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "./types";


const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );
    return {
      user: user,
    }
  }

//2: Share the created context with other components
export default function AuthProvider({ children }) {

    const [ authState, dispatch ] = useReducer( authReducer, {}, init );


    //3: Put some state in the context
    //const [isAuthenticated, setAuthenticated] = useState(false)

    //const [username, setUsername] = useState(null)

    //const [token, setToken] = useState(null)

    // function login(username, password) {
    //     if(username==='in28minutes' && password==='dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true            
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }        
    // }

    async function login(username, password) {

        try {

            const response = await executeJwtAuthenticationService(username, password)

            if(response.status===200){

                const jwtToken = 'Bearer ' + response.data.token

                //setAuthenticated(true)
                //setUsername(response.data.username)
                //setToken(jwtToken)
                const user = { isAuthenticated: true, username: response.data.username, token: jwtToken }

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken 
                        return config
                    }
                )

                
                const action = { type: types.login, payload: user }
            
                localStorage.setItem('user', JSON.stringify( user ) );
            
                dispatch(action);
                
                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }


    function logout() {
        //setAuthenticated(false)
        //setToken(null)
        //setUsername(null)
        localStorage.removeItem('user');
        const user = { isAuthenticated: false, username: null, token: null }
        const action = { type: types.logout, payload: user };
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={ { ...authState, login, logout }  }>
            {children}
        </AuthContext.Provider>
    )
} 