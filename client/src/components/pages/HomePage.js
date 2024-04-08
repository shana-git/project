import Pictures from "../Pictures"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';



const HomePage = () => {
const navigate=useNavigate()

    return (
        <>
            <h1>home page</h1>
            <Button type="submit" icon="pi pi-user " onClick={()=>{navigate('/login')}}>כניסה למערכת</Button>
            <br/>
            <br/>
            <Pictures />
            
            

            {/* <Button><Link to='login'>כניסה</Link></Button> */}
        </>
    )
}

export default HomePage
