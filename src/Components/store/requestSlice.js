import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const requestSlice = createApi({
    reducerPath : 'requestApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://solenis.localhost/'}),
    endpoints: (builder)=>({
        getCookie : builder.mutation({
            query : (data)=>({
                url:'/login.php',
                method:'POST',
                credentials: 'same-origin',
                body : {"password":"mdp"}
            })
        })
    }),
})

export const { useGetCookieMutation} = requestSlice
