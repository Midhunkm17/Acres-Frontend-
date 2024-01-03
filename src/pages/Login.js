import React, { useState } from 'react'
import './Login.css'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, signUpApi } from '../apis/allApi';



function Login({ register }) {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    userName: "", email: "", password: ""
  })

  const [unameValid, setUnameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwValid, setPasswValid] = useState(false)



  //accessing input data
  const setInputs = (e) => {
    const { name, value } = e.target
    if (name == 'userName') {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setUnameValid(false)
      }
      else {
        setUnameValid(true)
      }
    }
    if (name == 'email') {
      if (value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
        setEmailValid(false)
      }
      else {
        setEmailValid(true)
      }
    }
    if (name == 'password') {
      if (value.match(/^[0-9a-zA-Z@]{3,8}$/)) {
        setPasswValid(false)
      }
      else {
        setPasswValid(true)
      }
    }
    setUser({ ...user, [name]: value })
  }
  //console.log(user);

  //signup func
  const handleSignup = async (e) => {
    e.preventDefault()
    const { userName, email, password } = user
    if (!userName || !email || !password) {
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
      const result = await signUpApi(user)
      //console.log(result);
      if (result.status == 200) {
        toast.success(`${result.data.userName} your account created successfully!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUser({ userName: "", email: "", password: "" })
        navigate('/login')
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

  //login

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = user
    if (!email || !password) {
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
      const result = await loginApi(user)
      //console.log(result);
      if (result.status == 200) {


        //storing user data in localstorage
        localStorage.setItem("token",result.data.token)
        localStorage.setItem("currentUser",JSON.stringify(result.data.user))
        localStorage.setItem("userId",result.data.user._id)

        toast.success('Login Successfull', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUser({ email: "", password: "" })
        navigate('/')
        
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




  const isRegisterForm = register ? true : false
  return (
    <div className='mt-52 mb-72'>
      <div className="grid shadow-xl bg-dark">

        <form className="form login">
          {
            isRegisterForm &&
            <>
              <div className='form__field'>
                <label><i class="fa-solid fa-user"></i></label>
                <input value={user.userName} onChange={(e) => setInputs(e)} type="text" name="userName" placeholder="Username" required />
              </div>
              {
                unameValid && <p className='text-red-700 fs-6 mb-0'>Include characters only</p>
              }
            </>
          }


          <div className="form__field">

            <label>
            <i className="fa-solid fa-envelope"></i>
            </label>
            <input value={user.email} onChange={(e) => setInputs(e)} type="text" name="email" placeholder="Email" required />
          </div>
          {
            emailValid&& <p className='text-red-700 fs-6 mb-0 mt-0'>Email is not valid</p>
          }

          <div className="form__field">
            <label for="login__password">
              <i className="fa-solid fa-lock"></i>
            </label>
            <input value={user.password} onChange={(e) => setInputs(e)} type="password" name="password" placeholder="Password" required />
          </div>
      {
        passwValid&& <p className='text-red-700 fs-6 mb-0 mt-0'>Invalid Password</p>
      }
          

          {
            isRegisterForm ?
              <Button onClick={(e) => handleSignup(e)} variant='outline-warning'>Sign Up</Button> :
              <Button onClick={(e) => handleLogin(e)} variant='outline-warning'>Sign In</Button>

          }


        </form>
        {
          isRegisterForm ?
            <p className="text--center text-white mt-2">Have an account? <Link to={'/login'} style={{ textDecoration: 'none', color: 'yellow' }}>Login</Link>
            </p>
            :
            <p className="text--center mt-2 text-white">Don't have an account? <Link to={'/register'} style={{ textDecoration: 'none', color: 'yellow' }}>Sign Up</Link>
            </p>
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login