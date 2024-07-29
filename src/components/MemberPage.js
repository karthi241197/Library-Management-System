import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Member.css';

const MemberPage = () => {
  const [books, setBooks] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || loggedInUser.role !== 'member') {
      navigate('/Library-Management-System');
    }

    const membersBooks = JSON.parse(localStorage.getItem('membersBooks')) || [];
    const userHistoryData = membersBooks.find(user => user.id === loggedInUser.id)?.history || [];
    setUserHistory(userHistoryData);

    const booksData = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(booksData);
  }, [navigate]);

  const handleBuyBook = (book) => {
    const updatedHistory = [...userHistory, { title: book.title, borrowedDate: new Date().toISOString().split('T')[0], returnedDate: null }];
    setUserHistory(updatedHistory);

    const membersBooks = JSON.parse(localStorage.getItem('membersBooks')) || [];
    const updatedMembersBooks = membersBooks.map(user => {
      if (user.id === JSON.parse(localStorage.getItem('loggedInUser')).id) {
        return { ...user, history: updatedHistory };
      }
      return user;
    });
    localStorage.setItem('membersBooks', JSON.stringify(updatedMembersBooks));
  };

  const handleReturnBook = (book) => {
    const updatedHistory = userHistory.map(historyItem => {
      if (historyItem.title === book.title && !historyItem.returnedDate) {
        return { ...historyItem, returnedDate: new Date().toISOString().split('T')[0] };
      }
      return historyItem;
    });
    setUserHistory(updatedHistory);

    const membersBooks = JSON.parse(localStorage.getItem('membersBooks')) || [];
    const updatedMembersBooks = membersBooks.map(user => {
      if (user.id === JSON.parse(localStorage.getItem('loggedInUser')).id) {
        return { ...user, history: updatedHistory };
      }
      return user;
    });
    localStorage.setItem('membersBooks', JSON.stringify(updatedMembersBooks));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/Library-Management-System');
  };

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="member-container">
      <div className="header">
        <h2>Member Page</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <input
        type="text"
        placeholder="Search by Title, Author, Genre..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => {
            const hasBorrowed = userHistory.some(historyItem => historyItem.title === book.title && !historyItem.returnedDate);
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  {hasBorrowed ? (
                    <button onClick={() => handleReturnBook(book)}>Return</button>
                  ) : (
                    <button onClick={() => handleBuyBook(book)}>Buy</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberPage;
