
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
    axios.defaults.baseURL = 'http://localhost:5000';
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        class_no: '',
        enrollNo: '',
        college: '',
        city: '',
        state: '',
        country: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users', formData);
            setFormData({
                name: '',
                age: '',
                class_no: '',
                enrollNo: '',
                college: '',
                city: '',
                state: '',
                country: '',
                email: '',
                phone: ''
            });
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Users</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="input" />
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required className="input" />
                <input type="text" name="class_no" value={formData.class_no} onChange={handleChange} placeholder="Class" required className="input" />
                <input type="text" name="enrollNo" value={formData.enrollNo} onChange={handleChange} placeholder="Enroll No" required className="input" />
                <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College" required className="input" />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="input" />
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="input" />
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required className="input" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="input" />
                <button type="submit" className="button">Add User</button>
            </form>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user._id} className="user-item">
                        <span className="user-details">
                            {user.name}, {user.age}, {user.class_no}, {user.enrollNo}, {user.college}, {user.city}, {user.state}, {user.country}, {user.email}, {user.phone}
                        </span>
                        <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
