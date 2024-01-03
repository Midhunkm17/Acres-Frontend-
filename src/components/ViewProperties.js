import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { deletePropertyApi, userPropertyApi } from '../apis/allApi';
import { BASE_URL } from '../apis/baseUrl';
import { Col, Row } from 'react-bootstrap';
import { addResponseContext, editResponseContext } from '../apis/ContextShare';
import UpdateProperty from './UpdateProperty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewProperties.css'

function ViewProperties() {
    const {editUpdate}=useContext(editResponseContext)
    const {addUpdate}=useContext(addResponseContext)

    const [userProperties,setUserProperties]=useState([])

    const getUserProperty = async () => {
        //id
        if (localStorage.getItem("userId")) {
            const id = localStorage.getItem("userId")
            //header-token
            const token = localStorage.getItem("token")

            const reqHeader = {
                "Content-Type": "application/json",
                "user_token": `Bearer ${token}`
            }
            //console.log(reqHeader);
            const result = await userPropertyApi(reqHeader, id)
            //console.log(result);
            if(result.status==200){
                setUserProperties(result.data)
            }
        }
      //console.log(userProperties);
    }
   useEffect(()=>{
    getUserProperty()
   },[addUpdate,editUpdate])


   const handleDelete=async(e,id)=>{
e.preventDefault()
    //header
    const token = localStorage.getItem("token")
    const reqHeader = {
        "Content-Type": "application/json",
        "user_token": `Bearer ${token}`
    }
    const response=await deletePropertyApi(reqHeader,id)
    toast.success(`${response.data}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    getUserProperty()
   }


    return (
        <div className=' p-3'>
            <Row>
              {  
              userProperties?.length>0?
              userProperties.map(i=>(
              <Col lg={4} md={12} className='p-3'>
            <Card className='mx-3 crd' style={{ width: '18rem', height:'650px'}}>
                <Card.Img style={{height:'300px'}} variant='top' src={`${BASE_URL}/uploadedFiles/${i.propertyImg}`} />
                <Card.Body>
                    <Card.Title>{i.name}</Card.Title>
                    <Card.Text>
                       {i.description} <br />
                       <p className='text-warning mt-2'>{i.address}</p>
                    </Card.Text>
                    <div className='flex'>
                   <p><i class="fa-solid fa-bed fa-lg"></i> <span>{i.bedrooms}</span></p>  <p className='mx-3'> <i class="fa-solid fa-bath fa-lg"></i> <span>{i.bathrooms}</span></p> 
                   </div>
                   <h5 className='font-semibold mt-2'>Rs {i.price}</h5>
                   <p className='fs-6 font-semibold'><i class="fa-solid fa-phone "></i> {i.contactNum}</p>
                   <div className='flex justify-center p-3'>
                   <UpdateProperty property={i}></UpdateProperty> <p className='ms-4  hover:text-red-600'><i onClick={(e)=>handleDelete(e,i._id)} class="fa-solid fa-trash fa-lg"></i></p>
                   </div>
                </Card.Body>
            </Card>
            </Col>  
            ))
            :
          <p className='fs-4 text-warning'>No Properties Listed</p>
             
             }
             </Row>
             <ToastContainer/>
        </div>
    )
}

export default ViewProperties