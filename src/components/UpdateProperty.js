import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePropertyApi } from '../apis/allApi';
import { BASE_URL } from '../apis/baseUrl';
import { editResponseContext } from '../apis/ContextShare';


function UpdateProperty({ property }) {

const {setEditUpdate}=useContext(editResponseContext)

    const [show, setShow] = useState(false);
   
    const handleClose = () => {
        setShow(false);
       

    }
    const handleShow = () => setShow(true);

    const [preview,setPreview]=useState("")

    const [propertyInputs, setPropertyInputs] = useState({
        name: property.name, description: property.description, address: property.address, bedrooms: property.bedrooms, bathrooms: property.bathrooms, price: property.price,contactNum:property.contactNum, propertyImg: ""
    })

    useEffect(() => {

        if (propertyInputs.propertyImg) {


            setPreview(URL.createObjectURL(propertyInputs.propertyImg))

        }
        else {

            setPreview("")

        }


    }, [propertyInputs.propertyImg])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const { name, description, address, bedrooms, bathrooms, price,contactNum, propertyImg } = propertyInputs
        if (!name || !description || !address || !bedrooms || !bathrooms || !price ||!contactNum) {
            toast.error('Please fill all details!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            //api

            //body
            const reqBody = new FormData()
            reqBody.append("name", name)
            reqBody.append("description", description)
            reqBody.append("address", address)
            reqBody.append("bedrooms", bedrooms)
            reqBody.append("bathrooms", bathrooms)
            reqBody.append("price", price)
            reqBody.append("contactNum",contactNum)
            preview ? reqBody.append("propertyImg", propertyImg) :
            reqBody.append("propertyImg", property.propertyImg)

            //header
            const token = localStorage.getItem("token")
            if (preview) {
                var headerConfig = {
                    "Content-Type": "multipart/form-data",
                    "user_token": `Bearer ${token}`
                }
            }
            else {
                var headerConfig = {
                    "Content-Type": "application/json",
                    "user_token": `Bearer ${token}`
                }
            }
            //property id
            const propertyId = property._id

            const result = await updatePropertyApi(reqBody, headerConfig, propertyId)
            //console.log(result);
            if (result.status == 200) {
                toast.success(`${result.data.name} updated! `, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setEditUpdate(result.data)
                handleClose()
            }
            else {
                toast.error('Update failed!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }


return (
    <div>
        <p className=' hover:text-blue-600'><i onClick={handleShow} class="fa-solid fa-pen-to-square fa-lg"></i></p>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Property Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                >
                    <Form.Control onChange={(e) => setPropertyInputs({ ...propertyInputs, ["name"]: e.target.value })} value={propertyInputs.name} name='name' type="text" placeholder="Name" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" label="Description">
                    <Form.Control
                        onChange={(e) => setPropertyInputs({ ...propertyInputs, ["description"]: e.target.value })}
                        value={propertyInputs.description}
                        name='description'
                        as="textarea"
                        placeholder="Description"
                        style={{ height: '100px' }}
                        className='mb-3'
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Address"
                    className="mb-3"
                >
                    <Form.Control onChange={(e) => setPropertyInputs({ ...propertyInputs, ["address"]: e.target.value })} value={propertyInputs.address} name='address' type="text" placeholder="Address" />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="No: Bedrooms"
                    className="mb-3"
                >
                    <Form.Control onChange={(e) => setPropertyInputs({ ...propertyInputs, ["bedrooms"]: e.target.value })} value={propertyInputs.bedrooms} name='bedrooms' type="number" placeholder="No: Bedrooms" />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="No: Bathrooms"
                    className="mb-3"
                >
                    <Form.Control onChange={(e) => setPropertyInputs({ ...propertyInputs, ["bathrooms"]: e.target.value })} value={propertyInputs.bathrooms} name='bathrooms' type="number" placeholder="No: Bathrooms" />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Price"
                    className="mb-3"
                >
                    <Form.Control onChange={(e) => setPropertyInputs({ ...propertyInputs, ["price"]: e.target.value })} value={propertyInputs.price} name='price' type="number" placeholder="Price" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Contact Number"
                    className="mb-3"
                >
                    <Form.Control onChange={(e) => setPropertyInputs({ ...propertyInputs, ["contactNum"]: e.target.value })} value={propertyInputs.contactNum} name='contactNum' type="number" placeholder="Contact Number" />
                </FloatingLabel>

                <label htmlFor='img1' className='text-center' >
                                <input onChange={(e) => setPropertyInputs({ ...propertyInputs, ["propertyImg"]: e.target.files[0] })} id='img1' style={{ display: 'none' }} type="file" />
                                <img className=' w-100 ' src={preview ? preview : `${BASE_URL}/uploadedFiles/${property.propertyImg}`} alt="" />
                                </label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer />
    </div>
)
}

export default UpdateProperty