/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { retrieveBlogApi, updateBlogApi, createBlogApi } from './api/BlogApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'

export default function BlogComponent() {
    
    const {id} = useParams()
    
    const[title, setTitle] = useState('')
    const[content, setContent] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()
    
    const token = authContext.token
    
    useEffect(
        () => retrieveTodos(),[id])

    function retrieveTodos(){
        if(id !== '-1') {
            retrieveBlogApi(token, id)
            .then(response => {
                setTitle(response.data.title)
                setContent(response.data.content)
                setTargetDate(response.data.publicationData)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        
        const blog = {
            blogid: id,
            title: values.title,
            content: values.content,
            publicationData: values.targetDate,
        }

        console.log(blog)

        if(id==='-1') {
            createBlogApi(token, blog)
            .then(response => {
                navigate('/blogs')
            })
            .catch(error => console.log(error))
    
        } else {
            updateBlogApi(token, blog)
            .then(response => {
                navigate('/blogs')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.title.length<5) {
            errors.title = 'Enter atleast 5 characters'
        }

        if(values.content.length<5) {
            errors.content = 'Enter atleast 5 characters'
        }

        if(values.targetDate == null || values.targetDate==='' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Blog Details </h1>
            <div>
                <Formik initialValues={ { title, content,targetDate } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="title"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>Title</label>
                                <Field type="text" className="form-control" name="title" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Content</label>
                                <Field type="text" className="form-control" name="content" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Publication Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>

        </div>
    )
}