import React, { useEffect, useState } from 'react'
import { allPropertyApi } from '../apis/allApi'
import { Button, Col, Row } from 'react-bootstrap'
import PropertyCard from '../components/PropertyCard'
import Form from 'react-bootstrap/Form';
import './AllProperties.css'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function AllProperties() {

    const navigate=useNavigate()

    const [searchData,setSearchData]=useState("")

    const [allProperties, setAllProperties] = useState([])

    const getAllProperties = async () => {
        const result = await allPropertyApi(searchData)
        //console.log(result);
        setAllProperties(result.data)
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
        getAllProperties()
        }
        else{
            alert("Please login first")
           navigate('/') 
        }
    },[searchData])
//console.log(searchData);


    
    return (
        <div className='container-fluid  bg-dark'>
             <Header />
            <h4 className='text-center font-semibold text-warning p-3'>Explore Your Dream Here..!</h4>

            <Row className='border rounded p-3'>
                <div className='flex justify-center p-6 mb-3'>
                    
                        <Row>
                            <Col className='flex' xs="auto">
                                <Form.Control
                                onChange={(e)=>setSearchData(e.target.value)}
                                    type="text"
                                    placeholder="Search by location!"
                                    className="w-100 mr-lg-2 "
                                />
                                <Button className='ms-2' variant='outline-warning' type="submit"><i class="fa-solid fa-magnifying-glass"></i></Button>
                            </Col>

                        </Row>
                    
                </div>
                {allProperties?.length > 0 ? allProperties.map(i => (
                    <Col className='p-3' lg={3} md={12}>
                        <PropertyCard   property={i} />
                    </Col>
                )) :
                    <div className='w-100 bg-dark h-full mb-80 mt-24'>
                        <div class="ring">Acres
                            <span className='s1'></span>
                        </div>
                    </div>
                }
            </Row>
        </div>
    )
}

export default AllProperties