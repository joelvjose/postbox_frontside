import React,{ useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom'

import { register } from '../redux/slice'
import Loading from '../components/Loading'


const RegisterPage = () => {

  const dispatch = useDispatch()
  const { registered,loading }= useSelector(state=>state.user);
  const [formData,setFormData] = useState({
    username:'',
    email:'',
    password:'',
    password1:''
  });
  const {email,username,password,password1} = formData;

  const onchange=(e)=>{
    setFormData({ ...formData, [e.target.name] : e.target.value})

  }

  const userRegister = async(e)=>{
    e.preventDefault();
    if(password===password1){
        dispatch(register({username,email,password}));
    }else{
      toast.error("Password mis-match")
    }
  }

  if (registered) return <Navigate to='/login'/>;

  return (
    <HelmetProvider>
    <Helmet>
            <title>'Postbox | login'</title>
            <meta name='description' content='User login' />
    </Helmet>
    {loading ? (
      <Loading />
    ):(
      <div className="flex h-full flex-wrap items-center justify-center lg:justify-between mt-20 px-6 py-12 lg:px-8 ">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto w-auto" src="logo1.jpg" alt="Your Company"/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6"  method="POST" onSubmit={userRegister}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onchange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={onchange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onchange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password1"
                name="password1"
                type="password"
                value={password1}
                onChange={onchange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Our member? 
          <Link
            to={'/'}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
             Login
          </Link>
        </p>
      </div>
    </div>
     )}
     </HelmetProvider>
  )
}

export default RegisterPage
