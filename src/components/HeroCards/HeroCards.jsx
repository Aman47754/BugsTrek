import React, { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../../Data/ApiProvider';

const HeroCards = ({ category }) => {
  const { codechef, leetcode, leetcodeContestData, codeforcesContest, codeforcesProblem } =
    useContext(ApiContext);

  const [problemCount, setProblemCount] = useState(0);
  const [totalContestCount, setTotalContestCount] = useState(0);
  const [totalActiveDays, setTotalActiveDays] = useState(0);

  useEffect(() => {
    let problems = leetcode?.totalSolved || 0;

    // Add solved Codeforces problems
    codeforcesProblem?.result.forEach((que) => {
      if (que.verdict === 'OK') {
        problems++;
      }
    });

    // Set problem count, contest count, and active days
    setProblemCount(problems);

    const contestCount =
      (codechef?.ratingData?.length || 0) +
      (codeforcesContest?.result?.length || 0) +
      (leetcodeContestData?.contestAttend || 0);

    setTotalContestCount(contestCount);

    const activeDays =
      Object.keys(leetcode?.submissionCalendar || {}).length +
      (codechef?.heatMap?.length || 0);

    setTotalActiveDays(activeDays);
  }, [codechef, leetcode, leetcodeContestData, codeforcesContest, codeforcesProblem]);

  // Determine value to display based on category
  const displayValue =
    category === 'Total Questions'
      ? problemCount
      : category === 'Total Contests'
      ? totalContestCount
      : category === 'Active Days'
      ? totalActiveDays
      : 'N/A';

  return (
    <div className="w-[200px] h-[200px] border border-gray-300 rounded-[10px] flex flex-col justify-center items-center bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
      <p className="text-[16px] font-medium text-[#666666] mb-2 text-center">{category}</p>
      <h2 className="text-[50px] font-extrabold text-[#333333]">{displayValue}</h2>
    </div>
  );
};

export default HeroCards;
