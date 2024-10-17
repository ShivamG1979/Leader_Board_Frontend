import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../api/api';
import styles from './styles/ClaimHistory.module.css';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10; 

  useEffect(() => {
    fetchHistory().then((response) => setHistory(response.data));
  }, []);

  
  const totalPages = Math.ceil(history.length / entriesPerPage);

  
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = history.slice(startIndex, startIndex + entriesPerPage);


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
    <div className={styles.claimHistory}>
      <h2>Claim History</h2>
      <div style={{ overflowX: 'auto' }}> 
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Points</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={entry._id}>
                <td>{startIndex + index + 1}</td> 
                <td>{entry.userId.name}</td>
                <td>{entry.points}</td>
                <td>{new Date(entry.date).toLocaleString()}</td>
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

export default ClaimHistory;
