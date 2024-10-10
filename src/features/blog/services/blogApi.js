import authBaseApi from '../../../common/api/authBaseApi';
import endpoints from '../../../common/api/endpoints';

export const blogApi = authBaseApi.injectEndpoints({
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => ({...endpoints.getBlogs}),
            providesTags: ['Blogs']
        }),
        postBlog: builder.mutation({
            query: data => ({
                ...endpoints.postBlog,
                data
            }),
            invalidatesTags: ['Blogs']
        }),
        updateBlog: builder.mutation({
            query: data => ({
                ...endpoints.updateBlog,
                data
            }),
            invalidatesTags: ['Blogs']
        }),
        deleteBlog: builder.mutation({
            query: id => ({
                ...endpoints.deleteBlog(id)
            }),
            invalidatesTags: ['Blogs']
        })
    })
});

// export const blogApi = createApi({
//     reducerPath: 'blogApi',
//     baseQuery: axiosBaseQuery({baseUrl: ''}),
//     endpoints: builder => ({
//         getBlogs: builder.query({
//             query: () => ({...endpoints.getBlogs})
//         })
//     })
// });

export const { useGetBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;