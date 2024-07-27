import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { getUserDetails, getStudents, getLecturers } from '../services/api/adminService';

const AdminDashboard: React.FC = () => {
    const { user, signOut } = useAuth();
    const [userDetails, setUserDetails] = useState<any>(null);
    const [students, setStudents] = useState<any[]>([]);
    const [lecturers, setLecturers] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await getUserDetails();
                setUserDetails(details);
                const studentsData = await getStudents();
                setStudents(studentsData);
                const lecturersData = await getLecturers();
                setLecturers(lecturersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {user && (
                <div>
                    <p>Welcome, {user.Username}!</p>
                    <button onClick={signOut}>Logout</button>
                </div>
            )}
            {userDetails && (
                <div>
                    <h3>User Details</h3>
                    <pre>{JSON.stringify(userDetails, null, 2)}</pre>
                </div>
            )}
            <div>
                <h3>Students</h3>
                <ul>
                    {students.map((student) => (
                        <li key={student.username}>{student.username}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Lecturers</h3>
                <ul>
                    {lecturers.map((lecturer) => (
                        <li key={lecturer.username}>{lecturer.username}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
