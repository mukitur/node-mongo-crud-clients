import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
    },[])

    //Delete an User
    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                });
        }
    }

    return (
        <div>
            <h2>Show All Users</h2>
            <h3>Total user: {users.length}</h3>
            <div>
                    {
                        users.map(user=><p 
                        key={user._id}>
                                Name: {user.name} ::: Email {user.email} 
                                 <Link to = {`/users/update/${user._id}`}>
                                    <button>Update</button>
                                 </Link>
                                <button onClick= {()=>handleDeleteUser(user._id)}>Delete</button>
                        </p>)
                        
                    }
            </div>
            
        </div>
    );
};

export default Users;