import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react';
import { ApiContext } from '../Data/ApiProvider';

const Profile = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(ApiContext);

  const [username, setUsername] = useState('');
  const [leetcodeId, setLeetcodeId] = useState('');
  const [codechefId, setCodechefId] = useState('');
  const [codeforcesId, setCodeforcesId] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.username || '');
            setLeetcodeId(userData.leetcodeId || '');
            setCodechefId(userData.codechefId || '');
            setCodeforcesId(userData.codeforcesId || '');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const updateFirestore = async (field, value) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { [field]: value });
        console.log(`${field} updated in Firestore`);
      } catch (error) {
        console.error(`Error updating ${field} in Firestore:`, error.message);
      }
    }
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'leetcodeId':
        setLeetcodeId(value);
        break;
      case 'codechefId':
        setCodechefId(value);
        break;
      case 'codeforcesId':
        setCodeforcesId(value);
        break;
      default:
        break;
    }
    updateFirestore(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          username,
          leetcodeId,
          codechefId,
          codeforcesId,
        });

        console.log('Profile updated successfully');
        navigate('/');
      } catch (error) {
        console.error('Error updating profile:', error.message);
        alert('Error updating profile. Please check the console for details.');
      }
    } else {
      alert('User not authenticated. Please log in.');
      navigate('/login');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile-container h-[100vh] w-[100%] flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-[400px] relative'>
        <button
          className='absolute top-4 left-4 text-gray-900 hover:text-black'
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Edit Profile</h1>

        {errorMessage && (
          <div className='text-red-500 text-center mb-4'>{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
        <div className='flex flex-col'>
            <label htmlFor='username' className='text-sm font-medium mb-1 text-gray-700'>
              Username <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='leetcodeId' className='text-sm font-medium mb-1 text-gray-700'>
              LeetCode ID <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='leetcodeId'
              value={leetcodeId}
              onChange={(e) => handleInputChange('leetcodeId', e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='codechefId' className='text-sm font-medium mb-1 text-gray-700'>
              CodeChef ID <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='codechefId'
              value={codechefId}
              onChange={(e) => handleInputChange('codechefId', e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='codeforcesId' className='text-sm font-medium mb-1 text-gray-700'>
              Codeforces ID <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='codeforcesId'
              value={codeforcesId}
              onChange={(e) => handleInputChange('codeforcesId', e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all'
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;