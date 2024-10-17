import React, { useState } from 'react';
import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import styles from './components/styles/App.module.css';
import "../src/app.css"
 
const App = () => {
  const [latestClaim, setLatestClaim] = useState(null);

  return (
    <div className={styles.app}>
      <h1>Leaderboard System</h1>
      <UserList onClaim={setLatestClaim} />
      {/* <Leaderboard /> */}
      {/* <ClaimHistory /> */}
      {latestClaim && (
        <div className={styles.latestClaim}>
          {latestClaim.user.name} just received {latestClaim.points} points!
        </div>
      )}
    </div>
  );
};

export default App;
