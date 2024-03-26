import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [course, setCourse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [coursesList, setCourseList] = useState([]); // Fix here

  useEffect(() => {
    // Fetch courses from backend
    axios.get('/api/allCourse')
      .then(response => {
        setCourseList(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setErrorMessage('Error fetching courses');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/createStudent', {
        name,
        email,
        phoneNumber,
        course
      });
      setSuccessMessage(response.data.message);
      setName('');
      setEmail('');
      setPhoneNumber('');
      setCourse('');
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="container mt-4">
    <Link to="/addCourse"> Add Course</Link>
      <h2>Add Student</h2>
    <Link to="/allCourse">Go To Courses</Link>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">Course</label>
          <select className="form-select" id="course" value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select a course</option>
            {coursesList.map(course => (
              <option key={course._id} value={course.name}>{course.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateStudent;
