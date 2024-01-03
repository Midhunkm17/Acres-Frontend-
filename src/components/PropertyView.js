import React, { useContext, useEffect, useState } from 'react'
import { viewResponseContext } from '../apis/ContextShare'
import { BASE_URL } from '../apis/baseUrl'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from './Header'



function PropertyView() {

    const navigate=useNavigate()

    const [showTextarea,setShowTextarea]=useState(false)

    const { viewData } = useContext(viewResponseContext)
    // console.log(viewData);
    const shareUrl = "http://localhost:3000/view-property"

    useEffect(()=>{
        if(localStorage.getItem("token")){
            const token=localStorage.getItem("token")
        }
        else{
            alert("Please login first!")
            navigate('/')
        }
    })

    const handletext=()=>{
        setShowTextarea(true)
    }
    return (
        <div>
            <Header> </Header>
        <div className='bg-dark p-4 m-3'>
           
            <div className='container bg-black p-3 mt-5 mb-4 rounded-2xl border shadow-sm shadow-white'>
                <img style={{ width: '100%', height: '500px' }} src={`${BASE_URL}/uploadedFiles/${viewData.propertyImg}`} alt="" />

                <h2 className=' mt-4 text-warning font-semibold'>{viewData.name}</h2>
                <h4 className='text-white mt-4 fs-5 font-semibold'><i class="fa-solid fa-location-dot fa-lg text-primary me-1"></i>{viewData.address}</h4>
                <p className='fs-5 text-white mt-4 font-semibold'><i class="fa-solid fa-tag fa-lg text-success me-1"></i>{viewData.description}</p>
                <div className='flex mt-4'>
                    <p className='font-semibold'><i class="fa-solid fa-bed fa-lg text-danger"></i> <span className='text-white ms-1'>{viewData.bedrooms}</span></p>  <p className='mx-3'> <i class="fa-solid fa-bath fa-lg text-danger"></i> <span className='text-white ms-1'> {viewData.bathrooms}</span></p>
                </div>
                <p className='fs-3 mt-3 font-semibold text-white'><i class="fa-solid fa-indian-rupee-sign fa-lg text-warning"></i> {viewData.price}</p>
                <p className='fs-5 mt-3 font-semibold text-white' ><i class="fa-solid fa-phone "></i> Contact Owner : {viewData.contactNum}</p>
                <WhatsappShareButton
                    url={shareUrl}

                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <FacebookShareButton
                    url={shareUrl}
                    className='ms-2'
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <div>
                <Button onClick={handletext} className='mt-3' variant='outline-warning'>Connect To Acres Team for more details.. </Button><br />
                { showTextarea&&
                <div className="Demo__some-network p-4">
                <EmailShareButton
                  url={shareUrl}
                  subject={viewData.name}
                  body="body"
                  className="Demo__some-network__share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
}
                </div>
            </div>
        </div>
        </div>
    )
}

export default PropertyView