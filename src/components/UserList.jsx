import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, claimPoints } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/UserList.module.css';
import defaultProfilePic from '../assets/defaultProfilePic.png';
import Leaderboard from './Leaderboard';
import ClaimHistory from './ClaimHistory';

const UserList = ({ onClaim }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUser, setNewUser] = useState('');
  const [currentView, setCurrentView] = useState('userList');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10; 

  useEffect(() => {
    fetchUsers().then((response) => setUsers(response.data));
  }, []);

  const generateRandomProfilePic = () => {
    return `https://i.pravatar.cc/150?u=${Math.random()}`;
  };

  const handleAddUser = () => {
    if (!newUser.trim()) {
      toast.error('User name cannot be empty');
      return;
    }

    addUser(newUser)
      .then(() => {
        setNewUser('');
        toast.success('User added successfully');
        refreshUsers(); 
      })
      .catch(() => toast.error('Failed to add user'));
  };

  const handleClaim = () => {
    if (selectedUser) {
      claimPoints(selectedUser)
        .then(({ data }) => {
          onClaim(data);
          toast.success('Points claimed successfully');
          refreshUsers(); 
        })
        .catch(() => toast.error('Failed to claim points'));
    } else {
      toast.error('Please select a user to claim points');
    }
  };

  
  const refreshUsers = () => {
    fetchUsers().then((response) => {
      const updatedUsers = response.data.map(user => ({
        ...user,
        profilePic: user.profilePic || generateRandomProfilePic(),
      }));
      setUsers(updatedUsers);
    });
  };

  const topUsers = [...users].sort((a, b) => b.points - a.points).slice(0, 3);

  
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
    <div className={styles.userList}>
      <ToastContainer />
      <div className={styles.controls}>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Add new user"
        />
        <button onClick={handleAddUser}>Add User</button>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="" disabled>Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleClaim} disabled={!selectedUser}>Claim</button>
      </div>

      <div className={styles.navigation}>
        <button onClick={() => setCurrentView('userList')}>Users</button>
        <button onClick={() => setCurrentView('leaderboard')}>Leaderboard</button>
        <button onClick={() => setCurrentView('claimHistory')}>Claim History</button>
      </div>
      
      <h2 style={{color:"white"}}>Top 3 Rankers</h2>
      <div className={styles.rankList}>
        {topUsers.map((user, index) => (
          <div key={user._id} className={styles.rankCircle}>
            <div className={styles.rankBadge}>{index + 1}</div>
            <img
              src={user.profilePic || defaultProfilePic}
              alt={`${user.name}'s profile`}
              className={styles.profileImage}
            />
            <div className={styles.rankText}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userPoints}>{user.points} points</div>
            </div>
          </div>
        ))}
      </div>

      {currentView === 'userList' && (
        <div>
          <h2 style={{color:"white"}}>User List</h2>
          <div className={styles.rankList}>
            {currentUsers.map((user) => (
              <div key={user._id} className={styles.rankCircle}>
                <img
                  src={user.profilePic || defaultProfilePic}
                  alt={`${user.name}'s profile`}
                  className={styles.profileImage}
                />
                <div className={styles.rankText}>
                  <div className={styles.userName}>{user.name}</div>
                  <div className={styles.userPoints}>{user.points} points</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.pagination}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
              &lt; 
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
              &gt; 
            </button>
          </div>
        </div>
      )}
      {currentView === 'leaderboard' && <Leaderboard />}
      {currentView === 'claimHistory' && <ClaimHistory />}
    </div>
  );
};

export default UserList;
