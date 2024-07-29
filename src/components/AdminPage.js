import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '' });
  const [editingBook, setEditingBook] = useState(null);
  const [members, setMembers] = useState([]);
  const [viewingMember, setViewingMember] = useState([]);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [editingMember, setEditingMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || loggedInUser.role !== 'admin') {
      navigate('/');
    }

    const booksData = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(booksData);
    setFilteredBooks(booksData);

    const membersData = JSON.parse(localStorage.getItem('members')) || [];
    setMembers(membersData);
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddBookClick = () => {
    setShowAddBookForm(true);
    setEditingBook(null);
    setNewBook({ title: '', author: '', genre: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedBooks = editingBook
      ? books.map(book => (book.id === editingBook.id ? { ...book, ...newBook } : book))
      : [{ id: books.length ? books[books.length - 1].id + 1 : 1, ...newBook }, ...books];

    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setShowAddBookForm(false);
    setNewBook({ title: '', author: '', genre: '' });
    setEditingBook(null);
  };

  const handleEditClick = (book) => {
    setNewBook({ title: book.title, author: book.author, genre: book.genre });
    setEditingBook(book);
    setShowAddBookForm(true);
  };

  const handleDeleteClick = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleCancelClick = () => {
    setShowAddBookForm(false);
    setNewBook({ title: '', author: '', genre: '' });
    setEditingBook(null);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    if (value.trim() === '') {
      setFilteredBooks(books);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery) ||
        book.genre.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, books]);

  const handleViewHistoryClick = (member) => {
    const memberHistory = JSON.parse(localStorage.getItem('membersBooks')) || [];
    const memberHistoryData = memberHistory.find(item => item.id === member.id);
    setViewingMember(memberHistoryData ? memberHistoryData.history : []);
  };

  const handleAddMemberClick = () => {
    setShowAddMemberForm(true);
    setEditingMember(null);
    setNewMember({ name: '', email: '' });
  };

  const handleMemberFormChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleMemberFormSubmit = (e) => {
    e.preventDefault();
    const updatedMembers = editingMember
      ? members.map(member => (member.id === editingMember.id ? { ...member, ...newMember } : member))
      : [{ id: members.length ? members[members.length - 1].id + 1 : 1, ...newMember }, ...members];

    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    setShowAddMemberForm(false);
    setNewMember({ name: '', email: '' });
    setEditingMember(null);
  };

  const handleMemberEditClick = (member) => {
    setNewMember({ name: member.name, email: member.email });
    setEditingMember(member);
    setShowAddMemberForm(true);
  };

  const handleMemberDeleteClick = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  const handleMemberCancelClick = () => {
    setShowAddMemberForm(false);
    setNewMember({ name: '', email: '' });
    setEditingMember(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Admin Page</h2>
        <nav>
          <button className={`tab-button ${activeTab === 'books' ? 'active' : ''}`} onClick={() => handleTabClick('books')}>Books</button>
          <button className={`tab-button ${activeTab === 'members' ? 'active' : ''}`} onClick={() => handleTabClick('members')}>Members</button>
        </nav>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      {activeTab === 'books' && (
        <div>
          <button className="admin-button" onClick={handleAddBookClick}>Add Book</button>
          {showAddBookForm && (
            <form className="add-book-form" onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                type="text"
                name="title"
                placeholder="Title"
                value={newBook.title}
                onChange={handleFormChange}
                required
              />
              <input
                className="form-input"
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleFormChange}
                required
              />
              <input
                className="form-input"
                type="text"
                name="genre"
                placeholder="Genre"
                value={newBook.genre}
                onChange={handleFormChange}
                required
              />
              <button className="admin-button" type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
              <button className="cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
          )}
          <div className="search-form">
            <input
              className="form-input"
              type="text"
              name="search"
              placeholder="Search by Title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="admin-button" onClick={handleSearch}>Search</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map(book => (
                <tr key={book.id} className="book-row">
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <button className="admin-button" onClick={() => handleEditClick(book)}>Edit</button>
                    <button className="admin-button" onClick={() => handleDeleteClick(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'members' && (
        <div>
          <button className="admin-button" onClick={handleAddMemberClick}>Add Member</button>
          {showAddMemberForm && (
            <form className="add-member-form" onSubmit={handleMemberFormSubmit}>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                value={newMember.name}
                onChange={handleMemberFormChange}
                required
              />
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={newMember.email}
                onChange={handleMemberFormChange}
                required
              />
              <button className="admin-button" type="submit">{editingMember ? 'Update Member' : 'Add Member'}</button>
              <button className="cancel-button" type="button" onClick={handleMemberCancelClick}>Cancel</button>
            </form>
          )}
          <table className="admin-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="member-row">
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <button className="admin-button" onClick={() => handleMemberEditClick(member)}>Edit</button>
                    <button className="admin-button" onClick={() => handleMemberDeleteClick(member.id)}>Delete</button>
                    <button className="admin-button" onClick={() => handleViewHistoryClick(member)}>View History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {viewingMember && viewingMember.length > 0 && (
            <div>
              <h3>Borrowing History for the member</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Borrowed Date</th>
                    <th>Returned Date</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingMember.map((entry, index) => (
                    <tr key={index} className="history-row">
                      <td>{entry.title}</td>
                      <td>{entry.borrowedDate}</td>
                      <td>{entry.returnedDate || 'Not returned yet'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;

