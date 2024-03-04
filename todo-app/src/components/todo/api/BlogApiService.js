import { apiBlog } from './ApiBlog'


export const retrieveBlogApi
    = (token, id) => apiBlog.get(`/api/blog/${id}`,
    {
            headers: {
                Authorization: token
            }
    }
)

export const deleteBlogApi
    = (token, id) => apiBlog.delete(`/api/blogs/${id}`,
    {
        headers: {
            Authorization: token
        }
    }
    
    )

export const retrieveAllBlogsApi
    = (token) => apiBlog.get(`/api/blogs`,
        {
            headers: {
                Authorization: token
            }
        }
)

export const updateBlogApi
    = (token, blog) => apiBlog.put(`/api/blog`, blog,
        {
            headers: {
                Authorization: token
            }
        }
    )

export const createBlogApi
    = (token,  blog) => apiBlog.post(`/api/blog`, blog,
        {
            headers: {
                Authorization: token
            }
        }
    )
