import { useEffect, useState, useRef, useContext } from "react";
import Navbar from "../components/NavBar/Navbar";
import HeroCards from "../components/HeroCards/HeroCards";
import Clock from "../components/Clock/Clock";
import Heatmap from "../components/HeatMap/Heatmap";
import PieChart from "../components/PieChart/PieChart";
import ContestGraph from "../components/ContestGraph/ContestGraph";
import leetcodeIcon from "../assets/images/leetcode.svg";
import codechefIcon from "../assets/images/codechef.svg";
import codeforcesIcon from "../assets/images/code-forces.svg";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Firebase"; // Ensure you import auth properly
import { ApiContext } from "../Data/ApiProvider";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";

function Home() {

  const navigate=useNavigate();

  const { codechef, leetcode, leetcodeContestData, codeforcesUser } = useContext(ApiContext);

  // curr rating
  const [CodechefCurrRating, setCodechefCurrRating] = useState("N/A");
  const [LeetcodeCurrRating, setLeetcodeCurrRating] = useState("N/A");
  const [CodeforcesCurrRating, setCodeforcesCurrRating] = useState("N/A");
  // max rating
  const [CodechefMaxRating, setCodechefMaxRating] = useState("N/A");
  const [LeetcodeMaxRating, setLeetcodeMaxRating] = useState("N/A");
  const [CodeforcesMaxRating, setCodeforcesMaxRating] = useState("N/A");

  // Total inactive days
  const [inactiveDays, setInactiveDays] = useState(0);

  const [user, setUser] = useState('');
  const [usermail, setUsermail] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      const { username, email } = await fetchUserDetails();
      console.log(email);
      setUser(username);
      setUsermail(email);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (codechef) {
      setCodechefCurrRating(codechef.currentRating);
      setCodechefMaxRating(codechef.highestRating);
    }
    if (codeforcesUser) {
      setCodeforcesCurrRating(codeforcesUser.result[0].rating);
      setCodeforcesMaxRating(codeforcesUser.result[0].maxRating);
    }
    if (leetcodeContestData) {
      setLeetcodeCurrRating(Math.floor(leetcodeContestData.contestRating));
      let maxRating = 0;
      leetcodeContestData.contestParticipation.map((entry) => {
        maxRating = Math.floor(Math.max(maxRating, entry.rating));
      });
      setLeetcodeMaxRating(maxRating);
    }
    
  }, [codechef, leetcode, codeforcesUser]);

  const heatmapRef = useRef(null);
  const [selectedPlatform, setSelectedPlatform] = useState("Codeforces");

  useEffect(() => {
    const handleHorizontalScroll = (event) => {
      if (heatmapRef.current) {
        event.preventDefault(); // Prevent default vertical scrolling
        heatmapRef.current.scrollLeft += event.deltaY; // Scroll horizontally
      }
    };

    const heatmapElement = heatmapRef.current;
    heatmapElement.addEventListener("wheel", handleHorizontalScroll);
  }, []);

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  return (
    <div className="w-full mx-auto">
      <Navbar />
      {/* Welcome Section */}
      <div className="mt-[30px] max-w-[86vw] mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div>
          <p className="text-[25px] font-semibold">
            Welcome back, <span>{user}</span>
          </p>
          <p className="text-[#939393]">Code.Trek.Achieve</p>
        </div>
        <Clock />
      </div>

      {/* Hero Cards Section */}
      
        <div className="mt-[50px] max-w-[86vw] mx-auto flex flex-wrap sm:justify-between  gap-[20px] sm:flex-row  justify-center">
        <HeroCards category="Total Questions" />
        <HeroCards category="Active Days" />
        <HeroCards category="Total Contests" />
        <HeroCards category="Total Inactive Days This Year" inactive={inactiveDays} />
      
      
      </div>
        

      

      {/* Submission Tracker Section */}
      <div className="max-w-[86%] mx-auto px-[15px] bg-white mt-[40px] rounded-[12px] border border-gray-300 shadow-lg">
        <div className="mx-[10px] mt-[20px] text-[24px] font-semibold text-[#333]">
          Submission Tracker
        </div>
        <div ref={heatmapRef} className="heatmap border w-full overflow-x-auto overflow-y-hidden mt-4 rounded-[10px] p-2 mb-[10px]">
          <Heatmap start="2024-12-31" end="2025-12-31" />
        </div>
      </div>

      {/* Pie Chart Section with Heading */}
      <div className="max-w-[86%] mx-auto mt-[30px] rounded-[12px] min-h-[360px] mb-[30px] bg-white shadow-md p-6 flex flex-col items-center">
        <div className="text-[24px] font-semibold text-[#333] mb-[30px]">
          Platform-wise Question Distribution
        </div>
        <div className="w-full min-h-[300px] flex justify-evenly items-center mb-[30px] flex-wrap sm:flex-row">
          <div className="pie-chart-container flex flex-col items-center  mb-8 sm:mb-8">
            <PieChart platform="Leetcode" />
            <span className="mt-2 text-lg font-semibold">Leetcode</span>
          </div>
          <div className="pie-chart-container flex flex-col items-center mb-8 sm:mb-8">
            <PieChart platform="Codechef" />
            <span className="mt-2 text-lg font-semibold">Codechef</span>
          </div>
          <div className="pie-chart-container flex flex-col items-center mb-8 sm:mb-8">
            <PieChart platform="Codeforces" />
            <span className="mt-2 text-lg font-semibold">Codeforces</span>
          </div>
        </div>
      </div>

      {/* Contest Graph Section with Platform Buttons */}
      <div className="max-w-[86%] mx-auto mt-6 rounded-lg shadow-md bg-white p-6 mb-[20px]">
        <div className="text-[24px] font-semibold mb-[20px] text-center text-[#333]">
          {selectedPlatform} Contest Graph
        </div>
        <div className="flex justify-center gap-[20px] mb-[30px] flex-wrap">

          <div
            className={`platform-button bg-gray-100 hover:bg-blue-100 text-black font-bold px-6 py-3 rounded-lg text-center cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[102%] shadow-md ${selectedPlatform === "Codeforces" ? "bg-[#74b2ff]" : ""}`}
            onClick={() => handlePlatformChange("Codeforces")}
          >
            <img src={codeforcesIcon} className="w-[24px]" alt="Codeforces Icon" />
            <span className="text-[16px]">Codeforces</span>
          </div>

          <div
            className={`platform-button bg-gray-100 hover:bg-orange-100 text-black font-bold px-6 py-3 rounded-lg text-center cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[102%] shadow-md ${selectedPlatform === "Leetcode" ? "bg-orange-200" : ""}`}
            onClick={() => handlePlatformChange("Leetcode")}
          >
            <img src={leetcodeIcon} className="w-[24px]" alt="Leetcode Icon" />
            <span className="text-[16px]">Leetcode</span>
          </div>
          <div
            className={`platform-button bg-gray-100 hover:bg-yellow-100 text-black font-bold px-6 py-3 rounded-lg text-center cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[102%] shadow-md ${selectedPlatform === "Codechef" ? "bg-yellow-200" : ""}`}
            onClick={() => handlePlatformChange("Codechef")}
          >
            <img src={codechefIcon} className="w-[24px]" alt="Codechef Icon" />
            <span className="text-[16px]">Codechef</span>
          </div>
          
        </div>
        <div className="w-full h-[300px]">
          <ContestGraph platform={selectedPlatform} />
        </div>
      </div>

      {/* Leetcode, Codeforces, Codechef Card Section */}
      <div className="max-w-[86%] flex flex-wrap justify-evenly gap-6 mx-auto pb-[20px] mb-[20px]">
        {[
          { platform: "Leetcode", icon: leetcodeIcon, currRating: LeetcodeCurrRating, maxRating: LeetcodeMaxRating },
          { platform: "Codeforces", icon: codeforcesIcon, currRating: CodeforcesCurrRating, maxRating: CodeforcesMaxRating },
          { platform: "Codechef", icon: codechefIcon, currRating: CodechefCurrRating, maxRating: CodechefMaxRating },
        ].map((platform) => (
          <div
            key={platform.platform}
            className="card border border-gray-200 rounded-lg bg-white flex flex-col items-center shadow-lg transition-all duration-300 hover:scale-105 p-6 w-[280px] sm:w-[220px]"
          >
            <img src={platform.icon} width={60} alt={`${platform.platform} Icon`} />
            <h2 className="text-xl font-extrabold p-2 text-gray-800">{platform.platform}</h2>
            <div className="flex gap-6 text-gray-600">
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium">Max. Rating</p>
                <p className="text-lg font-bold text-gray-800">{platform.maxRating}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium">Current Rating</p>
                <p className="text-lg font-bold text-gray-800">{platform.currRating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
