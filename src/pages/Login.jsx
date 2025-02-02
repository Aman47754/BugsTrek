import React, { useContext, useState } from 'react';
import banner from '../assets/images/login-banner.jpg';
import logo from '../assets/images/logo.png';
import { login, signup } from '../Firebase';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState('Sign-In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user_auth = async (event) => {
    event.preventDefault();

    try {
      if (loginState === 'Sign-Up') {
        // Handle Sign-Up logic
        await signup(name, email, password);
        console.log('Sign-Up data:', { name, email, password });
        
        
        navigate('/profile'); // Navigate to profile for new users
      } else {
        // Handle Sign-In logic
        await login(email, password);
        
       
        console.log('Sign-In data:', { email, password });
        navigate('/'); // Navigate to home for returning users
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message); // Show error message to the user
    }
  };

  return (
    <div className='login-container h-[100vh] w-[100%] flex items-center justify-center px-5'>
      <div className='border w-[800px] mx-auto h-[450px] bg-white flex rounded-lg overflow-hidden'>
        {/* Login Banner */}
        <div className='login-banner border bg-white w-[50%] h-full relative'>
          <img src={banner} alt="Login Banner" className='w-full h-full object-cover' />
        </div>

        {/* Login/Sign-Up Form */}
        <div className='login-details flex flex-col items-center justify-center w-[50%] gap-2'>
          <img src={logo} alt="Logo" className='w-[180px]' />
          <h1 className='text-[30px] font-bold mt-[20px]'>{loginState}</h1>

          <form onSubmit={user_auth} className='mx-auto flex flex-col items-center justify-center w-[100%]'>
            {/* Name Field (Only for Sign-Up) */}
            {loginState === 'Sign-Up' && (
              <input
                type='text'
                placeholder='Your Name...'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-[80%] h-[40px] bg-white text-black my-[10px] mx-0 rounded-[4px] py-[16px] px-[20px] text-[14px] font-[500] border-[1.8px]'
                required
              />
            )}

            {/* Email Field */}
            <input
              type='email'
              placeholder='Your Email...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-[80%] h-[40px] bg-white text-black my-[10px] mx-0 rounded-[4px] py-[16px] px-[20px] text-[14px] font-[500] border-[1.8px]'
              required
            />

            {/* Password Field */}
            <input
              type='password'
              placeholder='Type your Password...'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-[80%] h-[40px] bg-white text-black my-[10px] mx-0 rounded-[4px] py-[16px] px-[20px] text-[14px] font-[500] border-[1.8px]'
              required
            />

            {/* Submit Button */}
            <button
              type='submit'
              className='w-[80%] h-[40px] bg-red-600 text-black mt-[20px] mx-auto rounded-[4px] text-[20px] font-[700] border-[1.8px] hover:bg-red-700 transition-all'
            >
              {loginState}
            </button>
          </form>

          {/* Toggle Between Login and Sign-Up */}
          <div className='form-switch text-[#737373]'>
            {loginState === 'Sign-In' ? (
              <p>
                New to BugsTrek{' '}
                <span
                  onClick={() => setLoginState('Sign-Up')}
                  className='ml-[6px] text-black cursor-pointer hover:underline'
                >
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span
                  onClick={() => setLoginState('Sign-In')}
                  className='ml-[6px] text-black cursor-pointer hover:underline'
                >
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;