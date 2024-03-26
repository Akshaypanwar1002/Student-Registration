import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from backend
    axios.get('/api/allCourse')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setErrorMessage('Error fetching courses');
      });
  }, []);

  const handleClick = (name) => {
    navigate(`/course/${name}`); // Use navigate directly here
  };

  return (
    <div className="container mt-4">
      <h2>Courses</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {courses.map(course => (
          <div key={course._id} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">Total Students: {course.totalStudents}</p>
                <button onClick={() => handleClick(course.name)} className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourse;
