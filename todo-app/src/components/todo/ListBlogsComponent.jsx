/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { retrieveAllBlogsApi, deleteBlogApi } from "./api/BlogApiService"
import { AuthContext } from './security';
import Datatable, { SortOrder } from "react-data-table-component"

function ListBlogsComponent() {

    //const today = new Date()

    const { user } = useContext( AuthContext );
    
    const token = user.token

    const navigate = useNavigate()
    
    //const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [blogs,setBlogs] = useState([])
    const [filterBlogs,setFilterBlogs] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshBlogs(), [])

    function refreshBlogs() {
        
        retrieveAllBlogsApi(user.token)
        .then( (response) => successfulResponse(response) )
        .catch ( (error) => errorResponse(error) )
    
    }

    function successfulResponse(response) {
        console.log(response)
        setBlogs(response.data)
        setFilterBlogs(response.data)
    }

    function errorResponse(error) {
        console.log(error)
    }


    function addNewBlog() {
        navigate(`/blog/-1`)
    }

    const columns =[
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Content',
            selector: row => row.content,
            sortable: true
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true
        },
        {
            name: 'Publication Data',
            selector: row => row.publicationData,
            sortable: true
        },{
            name: 'Actions',
            cell:row => <div><button className="btn btn-primary" onClick={()=>handleEdit(row.blogid)}>Edit</button>&nbsp;<button className="btn btn-danger" onClick={()=>handleDelete(row.blogid)}>Delete</button> </div>
        }

    ]

    function handleFilter(event){
        const newData = filterBlogs.filter(row => row.title.toLowerCase().includes(event.target.value.toLowerCase()))
        setBlogs(newData)
    }

    function handleEdit(blogId){
        console.log('clicked ' + blogId)
        navigate(`/blog/${blogId}`)
    }
    
    function handleDelete(blogId) {
        console.log('clicked ' + blogId)
        deleteBlogApi(token, blogId)
        .then(

            () => {
                setMessage(`Delete of Blogs with id = ${blogId} successful`)
                refreshBlogs()
            }
            //1: Display message
            //2: Update Todos list
        )
        .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h1>Things You Want Blogs!</h1>
            
            {message && <div className="alert alert-warning">{message}</div>}

            <div className="text-end"><input type="text" onChange={handleFilter}></input></div>
            <Datatable
                columns={columns}
                data={blogs}
                pagination
            ></Datatable>
           {/*
           <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Content</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Publication Data</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        blogs.map(
                            blog => (
                                <tr key={blog.blogid}>
                                    <td>{blog.content}</td>
                                    <td>{blog.title}</td>
                                    <td>{blog.type}</td>
                                    <td>{blog.publicationData}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
                 */}
            
            <div className="btn btn-success m-5" onClick={addNewBlog}>Add New Blog</div>
        </div>
    )
}

export default ListBlogsComponent