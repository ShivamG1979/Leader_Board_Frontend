Leaderboard 

Project Overview
* This project is a dynamic leaderboard system where users can claim random points, and rankings are updated based on total points. The backend is built with NodeJS, and the frontend uses ReactJS with a basic UI.

Features Overview

User Selection:
* Display a list of 10 users in the UI, with an option to add more users.
* Added users will be stored in the database.

Claim Button:
* A button that awards random points (1 to 10) to the selected user.
* The awarded points are updated in real-time.

Leaderboard:
* Displays user rankings based on total points.
* Updates dynamically when a user claims points.
* Shows each user’s name, total points, and rank.

Claim Points History:
* A history of all claimed points is stored in a separate collection for tracking.


------------------------------------------------------------------------------------------------------------------------------

Backend (NodeJS)

User Collection:
* Stores user data, including names and total points.

Claim Points Logic:
* When a user clicks the Claim button, the server awards random points (1 to 10) to the user with the provided userId and updates their total points.

Ranking Calculation:
* Sorts users by total points in descending order to assign ranks.

Real-Time Updates:
* Fetches updated rankings after each point claim for real-time display on the frontend.

Claim Points History:
* Every claim action creates a record in the claim points history collection.

----------------------------------------------------------------------------------------------------------------------------------------

Frontend (ReactJS (Vite + React))

User List:
* A dropdown or list component to display users.
* Allows selecting any user from the list.
* Option to add new users, which will be stored in the database.

Claim Button:
* A "Claim" button that triggers a point claim for the selected user.
* The app calls the claim point API, passing the selected user's ID.
* Displays assigned points in real-time.

Leaderboard Component:
* Displays the user rankings.
* Automatically updates when users claim points, reflecting the new rankings.

-----------------------------------------------------------------------------------------------------------------------------------------

Setup Instructions
Clone the Repository:

bash
* for Frontend
git clone <https://github.com/ShivamG1979/Leader_Board_Frontend.git>

* for Backend
git clone <https://github.com/ShivamG1979/Leader_Board_Backend.git>

---------------------------------------------------------------------------------------------------------------------------------------

Backend Setup:

Navigate to the backend folder:
bash

cd Back_End
Install dependencies:

npm install
Start the backend server:
nodemon server.js

------------------------------------------------------------------------------------------------------------------------------------------

Frontend Setup:

Navigate to the frontend folder:
bash

cd ../Front_End
Install dependencies:

npm install
Start the frontend:

npm run dev

----------------------------------------------------------------------------------------------------------------------------------------


Database Setup:

* Ensure MongoDB is installed and running.
* Configure the connection string in the backend .env file.

----------------------------------------------------------------------------------------------------------------------------------------

Visit the App:

* Open your browser and navigate to <https://leader-board-frontend-chi.vercel.app/> to view the app.

-----------------------------------------------------------------------------------------------------------------------------------------

API Endpoints
* GET /users: Fetch all users.
* POST /users: Add a new user.
* POST /claim-points: Award random points to a selected user.
* GET /leaderboard: Get the sorted list of users with their rankings.
* GET /claim-history: Fetch the history of all points claimed.

-------------------------------------------------------------------------------------------------------------------------------------------

Technologies Used
* Frontend: ReactJS ( Vite + React)
* Backend: NodeJS, ExpressJS
* Database: MongoDB

-------------------------------------------------------------------------------------------------------------------------------------------

