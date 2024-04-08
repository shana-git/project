import apiSlice from "./apiSlice";


const authApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        login:build.mutation({
            query:(loginData)=>({
                url:"/api/auth/login",
                method:"post",
                body:loginData
            })
        }),
        register:build.mutation({
            query:(registerUser)=>({
                url:"/api/auth/register",
                method:"post",
                body:registerUser
            })
        })
    })
})

export const {useLoginMutation,useRegisterMutation}=authApiSlice