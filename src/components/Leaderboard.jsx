import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/api';
import styles from './styles/Leaderboard.module.css';
import defaultProfilePic from '../assets/defaultProfilePic.png';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10; 

  useEffect(() => {
    fetchUsers().then((response) => setUsers(response.data));
  }, []);

  
  const totalPages = Math.ceil(users.length / entriesPerPage);

  
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentUsers = users.slice(startIndex, startIndex + entriesPerPage);

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.leaderboard}>
      <h2>Leaderboard</h2>
      <div style={{ overflowX: 'auto' }}> 
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{startIndex + index + 1}</td> 
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={user.profilePic || defaultProfilePic}
                      alt={`${user.name}'s profile`}
                      className={styles.profilePic}
                    />
                    {user.name}
                  </div>
                </td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          &lt; {/* Previous button */}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1} 
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          &gt; {/* Next button */}
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
