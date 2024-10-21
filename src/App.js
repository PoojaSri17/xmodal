import './App.css';
import React, { useState } from 'react';

const XModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Function to validate form
  const validateForm = () => {
    let errors = {};
    const { username, email, phone, dob } = formData;

    // Check if fields are empty
    if (!username) errors.username = 'Please fill out this field.';
    if (!email) errors.email = 'Please fill out this field.';
    if (!phone) errors.phone = 'Please fill out this field.';
    if (!dob) errors.dob = 'Please fill out this field.';

    // Email validation (simple check for '@')
    if (email && !email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      errors.email = 'Invalid email.';
    }

    // Phone validation (10 digits)
    if (phone && phone.length !== 10) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      errors.phone = 'Invalid phone number.';
    }

    // Date of Birth validation (cannot be a future date)
    if (dob && new Date(dob) > new Date()) {
      alert('Invalid date of birth. Please select a valid date.');
      errors.dob = 'Invalid date of birth.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Reset form and close modal on successful submission
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: ''
      });
      setIsModalOpen(false);
    }
  };

  // Function to close modal when clicking outside of it
  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="app">
      {/* Initial Render - Open Form Button */}
      {!isModalOpen && (
        <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
