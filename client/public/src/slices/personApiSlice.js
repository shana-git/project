import apiSlice from "./apiSlice";


const personApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getpersons:build.query({
            query:()=>({
                url:"/api/persons",
                method:"get",
            }),
            providesTags:["Persons"]
        }),
        createPerson:build.mutation({
            query:(person)=>({
                url:"/api/persons",
                method:"post",
                body:person
            }),
            invalidatesTags:["Persons"]
        }),
        updatePerson:build.mutation({
            query:(person)=>({
                url:"/api/persons",
                method:"PUT",
                body:person
            }),
            invalidatesTags:["Persons"]
        }),
        // deletePerson:build.mutation({
        //     query:(id)=>({
        //         url:"/api/persons/"+id,
        //         method:"delete",
               
        //     })
        // })
        
    })
})
export default apiSlice
export const {useCreatePersonMutation,useGetpersonsQuery,useUpdatePersonMutation}=personApiSlice