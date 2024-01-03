import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPropertyApi } from '../apis/allApi';
import { useNavigate } from 'react-router-dom';
import { addResponseContext } from '../apis/ContextShare';


function AddProperty() {

  //context
  const { setAddUpdate } = useContext(addResponseContext)

  const navigate = useNavigate()

  const [token, setToken] = useState("")

  const [propertyInputs, setPropertyInputs] = useState({
    name: "", description: "", address: "", bedrooms: "", bathrooms: "", price: "", contactNum: "", propertyImg: ""
  })

  const setInputs = (e) => {
    const { value, name } = e.target
    setPropertyInputs({ ...propertyInputs, [name]: value })
  }
  console.log(propertyInputs);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    }
    else {
      setToken("")
    }
  }, [])
  console.log(token);

  const handleAdd = async (e) => {

    e.preventDefault()

    const { name, description, address, bedrooms, bathrooms, price, contactNum, propertyImg } = propertyInputs
    if (!name || !description || !address || !bedrooms || !bathrooms || !price || !contactNum || !propertyImg) {

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
      //header - content type & token
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "user_token": `Bearer ${token}`
      }

      const reqBody = new FormData()
      reqBody.append("name", name)
      reqBody.append("description", description)
      reqBody.append("address", address)
      reqBody.append("bedrooms", bedrooms)
      reqBody.append("bathrooms", bathrooms)
      reqBody.append("price", price)
      reqBody.append("contactNum", contactNum)
      reqBody.append("propertyImg", propertyImg)

      const result = await addPropertyApi(reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {

        //context share
        setAddUpdate(result.data)

        toast.success(`${result.data.name} added!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        
        setPropertyInputs({ ...propertyInputs, name: "", description: "", address: "", bedrooms: "", bathrooms: "", price: "", contactNum: "", propertyImg: "" })
        navigate('/profile')
      }
      else {
        toast.error(result.response.data, {
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
    <div className='mb-5 mt-3 p-3 '>
      <div className='container bg-slate-700'>
        <h3 className='text-white fw-bold text-center p-3' >List Your Properties</h3>
        <div className='container p-3'>

          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control onChange={(e) => setInputs(e)} name='name' type="text" placeholder="Name" />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              onChange={(e) => setInputs(e)}
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
            <Form.Control onChange={(e) => setInputs(e)} name='address' type="text" placeholder="Address" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="No: Bedrooms"
            className="mb-3"
          >
            <Form.Control onChange={(e) => setInputs(e)} name='bedrooms' type="number" placeholder="No: Bedrooms" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="No: Bathrooms"
            className="mb-3"
          >
            <Form.Control onChange={(e) => setInputs(e)} name='bathrooms' type="number" placeholder="No: Bathrooms" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Price"
            className="mb-3"
          >
            <Form.Control onChange={(e) => setInputs(e)} name='price' type="number" placeholder="Price" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Contact Number"
            className="mb-3"
          >
            <Form.Control onChange={(e) => setInputs(e)} name='contactNum' type="number" placeholder="Contact Number" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Image"
            className="mb-3"
          >
            <Form.Control onChange={(e) => setPropertyInputs({ ...propertyInputs, ["propertyImg"]: e.target.files[0] })} type="file" placeholder="Image" />
          </FloatingLabel>

          <div className='text-center p-4'><Button onClick={(e) => handleAdd(e)} variant='outline-warning'>Proceed</Button></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddProperty