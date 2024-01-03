import React, {  useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { profileUpdateApi } from '../apis/allApi';
import { BASE_URL } from '../apis/baseUrl';
import { useNavigate } from 'react-router-dom';
import ViewProperties from '../components/ViewProperties';
import Header from '../components/Header';



function Profile() {



    const navigate = useNavigate()

    const [update, setUpdate] = useState("")

    const [token, setToken] = useState("")

    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    //state for storing profile image url
    const [preview, setPreview] = useState("")

    const [existingImage, setExistingImage] = useState("")

    //state for storing form data
    const [profile, setProfile] = useState({
        user: "", image: "", phoneNum: "", place: ""
    })

    useEffect(() => {
        const userData = (JSON.parse(localStorage.getItem("currentUser")))
        if (userData) {
            setProfile({ ...profile, user: userData.userName, image: "", phoneNum: userData.phoneNum, place: userData.place })
            setExistingImage(userData.profileImage)
        }
        else {
            alert("Please login first!")
            navigate('/')
        }
    }, [update])


    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])



    const setData = (e) => {
        const { value, name } = e.target
        setProfile({ ...profile, [name]: value })
    }
    //console.log(profile);






    useEffect(() => {
        if (profile.image) {
            setPreview(URL.createObjectURL(profile.image))
        }
        else {
            setPreview("")
        }

    }, [profile.image])
    //console.log(preview);

    //update function
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { user, image, phoneNum, place } = profile

        //id
        if (localStorage.getItem("userId")) {
            const id = localStorage.getItem("userId")
            // console.log(id);

            //header
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "user_token": `Bearer ${token}`
            }
            //console.log(reqHeader);

            //body
            const reqBody = new FormData()
            reqBody.append("userName", user)
            reqBody.append("profileImage", image ? image : existingImage)
            reqBody.append("phoneNum", phoneNum)
            reqBody.append("place", place)
            // console.log(reqBody);

            const response = await profileUpdateApi(reqBody, reqHeader, id)
            console.log(response);
            if (response.status == 200) {
                toast.success('Profile Updated!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                //update changed data in localstorage
                localStorage.setItem("currentUser", JSON.stringify(response.data))
                //for resfreshing data in useeffect
                setUpdate(response.data)
                handleClose()
            }
            else {
                toast.error('Profile update failed', {
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

    //logout func
    const logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userId")
        localStorage.removeItem("token")

        navigate('/')

    }

  

    return (

        <div className='mb-4 '>
            <Header />
            <h2 className='text-center mt-3 font-semibold'>Profile</h2>
            <div className=' container py-4'>
                <div className='text-end'><Button onClick={(e) => logOut(e)} variant='dark'>Logout</Button></div>
                <div className='flex w-100 justify-center'>

                    {
                        existingImage != "" ?
                            <img className='rounded-full mt-3' width={150} height={150} src={`${BASE_URL}/uploadedFiles/${existingImage}`} alt="" />
                            :
                            <img className='rounded-full mt-3' width={150} height={150} src={"https://i.postimg.cc/3R3NZTvw/icon-4399701-1280.png"} alt="" />

                    }

                </div>
            
                <div  className='container  bg-transparent shadow-2xl fs-5 text-center p-3 border rounded  mt-3'>

                    <p className='py-3 text-black font-semibold'>Username : {profile?.user}<br /></p>

                    <p className='py-3 text-black font-semibold'>Phone No : {profile?.phoneNum}<br /></p>

                    <p className='py-3 text-black font-semibold'> Place : {profile?.place}</p>


                    <p className='text-danger text-center'> <Button onClick={handleShow} variant='dark'><i class="fa-solid fa-user-pen fa-lg"></i></Button> </p>

                </div>
            </div>
            <hr className='p-4 mt-10' />
            <div className='bg-dark p-3 w-full mt-5'>
                <h3 className='text-center text-warning underline font-semibold'>Your Listed Properties</h3>
                <div className='mt-4'>
                    <ViewProperties></ViewProperties>
                </div>

            </div>



            <Modal show={show}
                onHide={handleClose}
                backdrop='static'
                size='md'

            >
                <Modal.Header className='bg-dark' closeButton>
                    <Modal.Title className='text-white fw-bold'>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>

                    <label htmlFor='img1' className='flex justify-center' >
                        {
                            existingImage != "" ?
                                <img className='mt-3 mb-3  rounded-pill' width={150} height={150} src={preview ? preview : `${BASE_URL}/uploadedFiles/${existingImage}`} alt="" />
                                :
                                <img className='mt-3 mb-3  rounded-pill' width={150} height={150} src={preview ? preview : "https://i.postimg.cc/3R3NZTvw/icon-4399701-1280.png"} alt="" />
                        }
                    </label>
                    <input id='img1' onChange={(e) => setProfile({ ...profile, ["image"]: e.target.files[0] })} style={{ display: 'none' }} type="file" />

                    <p className='text-center text-white'>Click the profile icon to upload image</p>
                    <div className='mt-5'>
                        <input value={profile?.user} onChange={(e) => setData(e)} name='user' className='form-control' type="text" placeholder='Username' />
                    </div>
                    <div className='mt-3'>
                        <input value={profile?.phoneNum} onChange={(e) => setData(e)} name='phoneNum' className='form-control' type="text" placeholder='Phone Num' />
                    </div>
                    <div className='mt-3 mb-5'>
                        <input value={profile?.place} onChange={(e) => setData(e)} name='place' className='form-control' type="text" placeholder='Place' />
                    </div>

                    <div className=' text-center'>
                        <Button variant="outline-danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={(e) => handleUpdate(e)} className='ms-2' variant="outline-warning">
                            Save Changes
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>



            <ToastContainer />
        </div>
    )
}

export default Profile