import { apiBlog } from './ApiBlog'


export const retrieveBlogApi
    = (id) => apiBlog.get(`/api/blog/${id}`)
