import {useParams, Link} from 'react-router-dom'
import { useContext, useState } from 'react'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { AuthContext } from './security';
//import { useAuth } from './security/AuthContext'



function WelcomeComponent() {

    const {username } = useParams()

    const { user } = useContext( AuthContext );


    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){
        console.log('called')

        
              
        retrieveHelloWorldPathVariable('admin@test.com', user.token)
            .then( (response) => successfulResponse(response) )
            .catch ( (error) => errorResponse(error) )
            .finally ( () => console.log('cleanup') )

    }

    function successfulResponse(response) {
        console.log(response)
        //setMessage(response.data)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}

export default WelcomeComponent