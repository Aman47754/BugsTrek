
# 🚀bugsTrek

bugsTrek is a comprehensive competitive programming dashboard that consolidates your profile statistics from LeetCode, Codeforces, and CodeChef, providing an all-in-one platform to visualize and track your coding journey.


## 🌟 Features

- **Profile Integration:** Combine statistics from LeetCode, Codeforces, and CodeChef in one place.
- **Comprehensive Analytics:** View total questions solved across platforms and combined contest participation.
- **Platform-Specific Insights:** Breakdown of platform-wise statistics and achievements.
- **Dynamic Graphs:** Platform-wise contest performance visualization.
- **Heatmap:** A combined coding heatmap across all platforms.
- **User-Friendly Dashboard:** Smooth navigation and data representation.



## 🛠️ Tech Stack

**Frontend:** React + Vite,TailwindCSS

**Backend:** Firebase

**Data Visualization:** react-apexcharts , react-calendar-heatmap.

**APIs:** LeetCode, Codeforces, and CodeChef API integrations


## API Reference

#### Get Codechef Data

```http
  https://codechef-api.vercel.app/handle/${codechefId}
```

#### Get Leetcode Data

- *Leetcode Problem Data :*

```http
  https://leetcode-api-faisalshohag.vercel.app/${leetcodeId}
```

- *Leetcode Contest Data :*

```http
  https://alfa-leetcode-api.onrender.com/${leetcodeId}/contest
```


#### Get Codeforces Data

- *Codeforces Problem Data :*

```http
  https://codeforces.com/api/user.status?handle=${codeforcesId}
```

- *Codeforces Contest Data :*

```http
  https://codeforces.com/api/user.rating?handle=${codeforcesId}
```




## Screenshots

![Login](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/Login.png)
![Register](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/Register.png)
![Profile](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/profile%20handles.png)
![Hero](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/hero.png)
![heatmap](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/heatmap.png)
![piechart](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/piechart.png)
![graph](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/graph.png)
![rating](https://github.com/Aman47754/BugsTrek/blob/main/src/assets/Readables/rating.png)


## Installation
*Prerequisites*
- Node.js installed


To run the project locally do the following

Clone the project

```bash
  git clone https://github.com/Aman47754/BugsTrek.git
```

Go to the project directory

```bash
  cd BugsTrek
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.




## 📄 License

Distributed under the MIT License. See [LICENSE](https://github.com/Aman47754/BugsTrek?tab=MIT-1-ov-file#readme) for more information.

## 📧 Contact

For any queries or suggestions, please contact [amanverma06012004@gmail.com].
