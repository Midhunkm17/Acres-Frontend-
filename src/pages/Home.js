import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import './Home.css'
import { homePropertyApi } from '../apis/allApi';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Home() {

    const [homeProperty, setHomeProperty] = useState([])

    const getHomeProperty = async () => {
        const result = await homePropertyApi()
        setHomeProperty(result.data)
        //console.log(result);
    }

    useEffect(() => {
        getHomeProperty()
    }, [])
    return (
        <div>
            <Header />
            <div className='w-100 d2 p-16'>
                <section style={{ backgroundColor: '00FFFFFF' }} className='p-4 w-75 container shadow-lg w-100'>
                    <Row className=' mt-5 text-lg w-100'>
                        <Col className='p-3' lg={6} md={12}>
                            <p className=' text-justify ls-3 p-4 w-100'>

                                Welcome to <span className='fs-3 font-extrabold hdng1'>Acres</span> – Where Your Dream Home Awaits! <br />
                                Discover the perfect blend of luxury and comfort as you embark on a journey to find your ideal home. Our user-friendly real estate website is designed to make your property search a seamless and enjoyable experience.   <br />
                                <img src="" alt="" />
                            </p>
                        </Col>
                        <Col  lg={6} md={12}>
                            <img className='w-100' src="https://i.postimg.cc/Jn3Bsdgp/ACRES.png" alt="" />
                        </Col>
                    </Row>
                </section>
            </div>

            <div className='w-100 bg-dark p-2 mt-5 py-4'>
                <section className='w-100 container mt-20 shadow-2xl mb-5 p-2 bg-yellow-600 border-transparent rounded-lg'>
                    <Carousel variant='dark' className='w-100 border-rounded'  >
                        <Carousel.Item interval={1100}>
                            <img style={{ width: '100%', height: '600px' }} src="https://i.postimg.cc/QtS9Y24G/pexels-binyamin-mellish-106399.jpg" alt="" />
                            <Carousel.Caption>
                                <h3 className='fs-4 text-white fw-bold font-serif'>Acres</h3>
                                <p className='fw-bold fs-6 text-white font-serif'>Find your dream home!!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1100}>
                            <img style={{ width: '100%', height: '600px' }} src="https://i.postimg.cc/pTXGr5hq/pexels-pixabay-210617.jpg" alt="" />
                            <Carousel.Caption>
                                <h3 className='fs-4 text-white fw-bold font-serif'>Acres</h3>
                                <p className='fw-bold fs-6 text-white font-sans'>Build your dream with us!!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1100}>
                            <img style={{ width: '100%', height: '600px' }} src="https://i.postimg.cc/zBgjVwDw/pexels-curtis-adams-3288102.jpg" alt="" />
                            <Carousel.Caption>
                                <h3 className='fs-4 text-white fw-bold font-serif'>Acres</h3>
                                <p className='fw-bold fs-6 text-white font-serif'>Premium at any cost!!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </section>
            </div>

            {/* <div class="commonninja_component pid-7e8851cd-fdf4-4e00-892c-5d2d76803131"></div> */}

            <div className='container mb-4 mt-4 bg-dark text-warning p-4'>
                <h3 className='text-center fw-bold'>Featured Properties</h3>
                <p className='text-center fw-bold text-white'>Handpicked properties by our team.</p>
                <Row>
                    {homeProperty?.length > 0 ? homeProperty.map(i => (
                        <Col lg={4} md={12}>
                            <PropertyCard property={i} />
                        </Col>))
                        :
                        <h4 className='text-center text-warning'><i class="fa-solid fa-spinner fa-spin fa-xl"></i></h4>
                    }
                </Row>
                <div className='mt-4'>
                    <Link to={'/all-properties'} className='text-white' style={{ textDecoration: 'none' }}>  <p className='text-center  fs-5 p-4 font-semibold  hover:text-yellow-500 '>Explore More Properties <i class="fa-solid fa-angles-right fa-beat "></i></p></Link>
                </div>
            </div>
         
         <div id='about' className='container-fluid  p-3 mb-5 text-center'>
            <div className='bg-white abt rounded p-4'>
            <h3 className='fs-2 font-semibold text-yellow-500'>We provide the most suitable and quality real estate.</h3><br />
           <h5><i class="fa-solid fa-map-location-dot fa-2xl "></i> <span className='ms-2'>2715 Ash Dr. San Jose, South Dakota 83475</span></h5> 
           <h5 className='mt-6'><i class="fa-solid fa-phone-volume fa-2xl"></i> <span className='ms-2'>314-555-0123</span> </h5>
           <h5><i class="fa-solid fa-envelope fa-2xl mt-6"></i><span className='ms-2 text-blue-500'>acres@gmail.com</span></h5>
           </div>
         </div>
<div className='bg-dark text-white mb-4 p-3'>
    <h3 className='text-center fs-2 text-warning font-semibold'>Why choose Us</h3>
    <div className='flex justify-center'>
    <Row className='w-100 text-black p-4 text-center r1'>
        <Col className='bg-white rounded-2xl' >
        <div className='flex justify-center p-3'>
        <img width={250} height={250} src="https://i.postimg.cc/wvFJMNKZ/kindpng-4397227.png" alt="" />
        </div>
        <p className='text-center fs-4 font-semibold mt-3'>Trusted By Thousands</p>
        <i className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro mollitia aut iusto nam quidem voluptates ullam labore, quos quod eligendi quisquam voluptatum repellendus nisi, doloremque enim quas iste error.</i>
        </Col>
        <Col className='bg-white ms-4 rounded-2xl'>
        <div className='flex justify-center p-3'>
        <img width={200} height={200} src="https://i.postimg.cc/fTb4VQdr/transparent-real-estate-house-proposal-for-a-bigger-size-icon-609c2b425074f3-5102834616208474263296.png" alt="" />
        </div>
        <p className='text-center fs-4 font-semibold mt-3'>Wide Range Of Properties</p>
        <i className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro mollitia aut iusto nam quidem voluptates ullam labore, quos quod eligendi quisquam voluptatum repellendus nisi, doloremque enim quas iste error.</i>
        </Col>
        <Col className='bg-white ms-4 rounded-2xl'>
        <div className='flex justify-center p-3'>
        <img width={200} height={200} src="https://i.postimg.cc/hv2jRFz7/kindpng-4306305.png" alt="" />
        </div>
        <p className='text-center fs-4 font-semibold mt-3'>Financing Made Easy</p>
        <i className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam porro mollitia aut iusto nam quidem voluptates ullam labore, quos quod eligendi quisquam voluptatum repellendus nisi, doloremque enim quas iste error.</i>
        </Col>
    </Row>
    </div>
</div>
        </div>
    )
}

export default Home