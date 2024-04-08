import apiSlice from "./apiSlice";


const eventApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getEvents:build.query({
            query:()=>({
                url:"/api/events",
                method:"get",
            }),
            providesTags:["events"]
        }),
        getEventByDate:build.query({
            query:(date)=>({
                url:"/api/events/byDate/"+date,
                method:"get",
            }),
            providesTags:["getEventsByDate"]
        }),
        createEvent:build.mutation({
            query:(event)=>({
                url:"/api/events",
                method:"post",
                body:event
            }),
            invalidatesTags:["events","getEventsByDate"]

        }),
        updateEvent:build.mutation({
            query:(event)=>({
                url:"/api/events",
                method:"put",
                body:event
            }),
            invalidatesTags:["events","getEventsByDate"]

        }),
        deleteEvent:build.mutation({
            query:(id)=>({
                url:"/api/events/"+id,
                method:"delete",
               
            }),
            invalidatesTags:["events","getEventsByDate"]

        })
        
    })
})
export default apiSlice
export const {useCreateEventMutation,useDeleteEventMutation,useGetEventsQuery,useUpdateEventMutation,useGetEventByDateQuery}=eventApiSlice