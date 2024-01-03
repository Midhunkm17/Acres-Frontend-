import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../apis/baseUrl'
import './PropertyCard.css'
import { specifiedPropertyApi } from '../apis/allApi';
import { useNavigate } from 'react-router-dom';
import { viewResponseContext } from '../apis/ContextShare';
import { Button } from 'react-bootstrap';


function PropertyCard({ property }) {

  const { setViewData } = useContext(viewResponseContext)

  const navigate = useNavigate()

  const handleView = async (e, id) => {
    e.preventDefault()

    //header
    if(localStorage.getItem("token")){
    const token = localStorage.getItem("token")

    const reqHeader = {
      "Content-Type": "application/json",
      "user_token": `Bearer ${token}`
    }
    const response = await specifiedPropertyApi(reqHeader, id)
   // console.log(response.data);
    setViewData(response?.data)
    navigate('/view-property')
  }
  }

  return (
    <div className='p-2'>

      <Card className='mx-3 crd' style={{ width: '18rem', height: '470px' }}>
        <Card.Img className='rounded-xl' style={{ height: '300px' }} variant='top' src={`${BASE_URL}/uploadedFiles/${property.propertyImg}`} />
        <Card.Body>
          <Card.Title>{property.name}</Card.Title>
          <p><i class="fa-solid fa-location-dot fa-sm text-primary me-1"></i> {property.address}</p>

          <Button onClick={(e) => handleView(e, property._id)} variant='outline-dark'>View More Details</Button>
        </Card.Body>

      </Card>

    </div>
  )
}

export default PropertyCard