
const name= localStorage.getItem("uname");
const email=localStorage.getItem("uemail")

const DashBoard=()=>{
    return(
        <>
          <h1> Welcome User: {name}</h1>
          <h3> Email : {email}</h3>
        
        </>
    )
}

export default DashBoard;