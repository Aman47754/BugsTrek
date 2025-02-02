import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-semibold">About Code.Trek.Achieve</h3>
            <p className="text-sm text-gray-400 mt-2">
              Code.Trek.Achieve is your personal coding tracker. Here you can monitor your performance across multiple competitive programming platforms like Leetcode, Codechef, and Codeforces.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Track your ratings, solve problems, and engage with contests to enhance your coding journey.
            </p>

            <p>Disclaimer : This Website don't show problem count of Codechef ,because it is not publically available & Leetcode Contest data has limitations to fetch API </p>
          </div>

          {/* Right Section (Social or Contact Info) */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold">Contact & Info</h3>
            <ul className="text-sm text-gray-400 mt-2 space-y-2">
              <li>
                <a href="amanverma06012004@gmail.com" className="hover:text-orange-400">Email: amanverma06012004@gmail.com</a>
              </li>
              <li>
                <a href="https://github.com/aman47754" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
                  GitHub: aman47754
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/aman-kumar-verma-1a8a80241/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
                  LinkedIn: Aman Kumar Verma
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section (Footer Note) */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>&copy; 2025 Code.Trek.Achieve. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
