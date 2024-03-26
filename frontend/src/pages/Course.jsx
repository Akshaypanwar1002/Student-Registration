import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Course = ({ courseId }) => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Adjust as needed
  const [errorMessage, setErrorMessage] = useState('');
  const [editingStudentId, setEditingStudentId] = useState(null); // Track which student is being edited

  const { name } = useParams();
  useEffect(() => {
    // Fetch students enrolled in the course from backend
    axios.get(`/api/courseStudents/${name}`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setErrorMessage('Error fetching students');
      });
  }, [name, currentPage, studentsPerPage]); // Update dependency array

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditCourse = (studentId, newCourseName) => {
    // Send updated course name to the API
    axios.post(`/api/updateCourseStudent/${studentId}`, { course: newCourseName })
      .then(response => {
        // Handle successful response, if needed
        console.log(`Course for student with ID ${studentId} updated successfully.`);
      })
      .catch(error => {
        // Handle error
        console.error('Error updating course:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Students Enrolled</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phoneNumber}</td>
              <td>
                {/* Render input field conditionally based on whether it's being edited */}
                {editingStudentId === student._id ? (
                  <input
                    type="text"
                    value={student.course}
                    onChange={(e) => setStudents(students.map(s => s._id === student._id ? { ...s, course: e.target.value } : s))}
                  />
                ) : (
                  student.course
                )}
              </td>
              <td>
                {editingStudentId === student._id ? (
                  // Save button when editing
                  <button className="btn btn-primary" onClick={() => {
                    handleEditCourse(student._id, student.course);
                    setEditingStudentId(null); // Reset editing state
                  }}>Save</button>
                ) : (
                  // Edit button when not editing
                  <button className="btn btn-primary" onClick={() => setEditingStudentId(student._id)}>Edit Course</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Course;
