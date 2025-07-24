import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Firebase";

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    codechef: null,
    leetcode: null,
    leetcodeContestData: null,
    codeforcesContest: null,
    codeforcesProblem: null,
    codeforcesUser: null,
  });

  const fetchUserHandles = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn("User not authenticated.");
        navigate('/login');
        return {};
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const { leetcodeId, codechefId, codeforcesId } = userDoc.data();
        return { leetcodeId, codechefId, codeforcesId };
      } else {
        console.warn("No user data found!");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error.message);
      navigate('/login');
    }
    return {};
  };

  const handleApiError = (error, platform) => {
    if (error.message.includes("429")) {
      // Too many requests (rate limiting)
      alert(`Too many requests for ${platform}. Skipping...`);
    } else {
      // Invalid user ID or other errors
      
      if(platform ==="LeetCode" && error.message==="That user does not exist."){
        navigate('/profile');
        alert(`Invalid ${platform} handle. Please update it in your profile.`);
      }
      else{
       alert(`Error fetching ${platform} data:`, error.message);
      }
        
      
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { leetcodeId, codechefId, codeforcesId } = await fetchUserHandles();

      if (!leetcodeId || !codechefId || !codeforcesId) return;

      const fetchCodechefData = async () => {
        try {
          const response = await fetch(
            `https://codechef-api.vercel.app/handle/${codechefId}`
          );
          if (!response.ok) throw new Error(response.statusText);
          const result = await response.json();
          setData((prevData) => ({ ...prevData, codechef: result }));
        } catch (error) {
          handleApiError(error, "CodeChef");
        }
      };

      const fetchLeetcodeData = async () => {
        try {
          const response = await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${leetcodeId}`
          );
          if (!response.ok) throw new Error(response.statusText);
          const result = await response.json();

           // Check if the result contains "errors" key
          if (result.errors && result.errors.length > 0) {
            throw new Error(result.errors[0].message || "Unknown LeetCode error");
          }

          setData((prevData) => ({ ...prevData, leetcode: result }));
        } catch (error) {
          handleApiError(error, "LeetCode");
        }
      };

      const fetchLeetcodeContestData = async () => {
        try {
          const response = await fetch(
            `https://alfa-leetcode-api.onrender.com/${leetcodeId}/contest`
          );
          if (!response.ok) throw new Error(response.statusText);
          const result = await response.json();
           // Check if the result contains "errors" key
          if (result.errors && result.errors.length > 0) {
            throw new Error(result.errors[0].message || "Unknown LeetCode error");
          }
          console.log(result);
          setData((prevData) => ({ ...prevData, leetcodeContestData: result }));
        } catch (error) {
          handleApiError(error, "LeetCode");
        }
      };

      const fetchCodeforcesProblemsData = async () => {
        try {
          const response = await fetch(
            `https://codeforces.com/api/user.status?handle=${codeforcesId}`
          );
          if (!response.ok) throw new Error(response.statusText);
          const result = await response.json();
          setData((prevData) => ({ ...prevData, codeforcesProblem: result }));
        } catch (error) {
          handleApiError(error, "Codeforces Problems");
        }
      };

      const fetchCodeforcesContestData = async () => {
        try {
          const response = await fetch(
            `https://codeforces.com/api/user.rating?handle=${codeforcesId}`
          );
          if (!response.ok) throw new Error(response.statusText);
          const result = await response.json();
          setData((prevData) => ({ ...prevData, codeforcesContest: result }));
        } catch (error) {
          handleApiError(error, "Codeforces Contest");
        }
      };

      const fetchCodeforcesUserData = async () => {
        try {
          const response = await fetch(
            `https://codeforces.com/api/user.info?handles=${codeforcesId}`
          );
          if (!response.ok) throw new Error(response.statusText);
          const result = await response.json();
          setData((prevData) => ({ ...prevData, codeforcesUser: result }));
        } catch (error) {
          handleApiError(error, "Codeforces User");
        }
      };

      await Promise.all([
        fetchCodeforcesProblemsData(),
        fetchCodeforcesContestData(),
        fetchCodechefData(),
        fetchLeetcodeData(),
        fetchCodeforcesUserData(),
        fetchLeetcodeContestData(),
      ]);
    };

    fetchData();
  }, [navigate]);

  return (
    <ApiContext.Provider value={data}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;