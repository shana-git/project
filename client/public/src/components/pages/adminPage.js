import AddEventDialog from "../addEventDialog"
import AppBar from "../appBar"


const AdminPage = () => {
    return (
        <>
            <AppBar flag={false}/>  
            <AddEventDialog eventType={"בוקר"}/>  
        </>
    )
}

export default AdminPage