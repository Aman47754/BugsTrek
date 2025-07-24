import React, { useEffect, useState } from 'react'; // Import useState
import '../NavBar/Navbar.css';
import logo from '../../assets/images/favicon_icon.png';
import profileLogo from '../../assets/images/profile_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../Firebase';
import {  useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase";




const Navbar = () => {
  const navigate=useNavigate();
  const [profilebox, setProfilebox] = useState(false); // Move useState inside the component

  const [user,setUser]=useState('');
  const [usermail,setUsermail]=useState('');

  const fetchUserDetails = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn("User not authenticated.");
        return {};
      }
  
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Fetched User Data:', userData); // Log entire user data
        const { username } = userData;
        return { username };
      } else {
        console.warn("No user data found in Firestore!");
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error.message);
    }
    return {};
  };
  
  
  useEffect(()=>{
    const fetchData = async () => {
      const { username, email } = await fetchUserDetails();
      console.log(email);
      setUser(username);
      setUsermail(email);
    }
    
    fetchData();
  },[])

  return (
    <div className="navbar max-w-[100vw] px-[70px] flex items-center justify-between bg-[#ffffff] h-[50px]">
      <div className="left">
        <h2 className="font-[900] text-[25px]">
          Bugs<span className="text-[#ff7a00]">Trek</span>
        </h2>
      </div>
      <div className="right relative">
        <div
          className="login border-[3px] border-[#ff7a00] rounded-[50%] w-[40px] overflow-hidden h-[40px]"
          onMouseEnter={() => setProfilebox(true)} // Show profilebox on hover
          onMouseLeave={() => setProfilebox(false)} // Hide profilebox on hover out
        >
          <img src={profileLogo} alt="Profile Logo" />
        </div>
        <div>
          {profilebox && (
            <div
              className="profilebox w-[230px] h-[280px] absolute border-[3px] right-3 rounded-[10px] bg-[#f5f5f5] overflow-hidden z-1"
              onMouseEnter={() => setProfilebox(true)}
              onMouseLeave={() => setProfilebox(false)}
            >
              <div className="up h-[65%] border-b-2">
                <div className="w-[100px] h-[100px] border rounded-full overflow-hidden mx-auto mt-[10px]">
                  <img src={profileLogo} alt="Profile" />
                </div>
                <h3 className="font-bold mt-[10px] text-center">{user}</h3>
                <p className="text-[12px] text-center">{usermail}</p>
              </div>
              <div className="down pl-[15px] pt-[10px]">
                <div className="flex gap-[10px] items-center my-[5px] hover:cursor-pointer" onClick={()=>{navigate('/profile')}}>
                  <FontAwesomeIcon icon={faUser} />
                  <p>Profile</p>
                </div>
                <div className="flex gap-[10px] items-center hover:cursor-pointer" onClick={()=>{logout()}}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
