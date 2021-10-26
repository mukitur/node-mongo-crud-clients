import React, { useRef } from 'react';


const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();


    const handleAddUses = e =>{
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name: name, email: email};

    fetch('http://localhost:5000/users', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)  
    })
    .then(res=>res.json())
    .then (data=>{
        if(data.insertedId){
            alert('Successfully added data to DB');
        }
    })
    //clear input field
    nameRef.current.value ='';
    emailRef.current.value = '';

    e.preventDefault();
}
    return (
        <div>
            <h2>Please Add User</h2>
            <form onSubmit={handleAddUses}>
                <input type="text" ref={nameRef} placeholder="Name"/>
                <input type="email" ref={emailRef} placeholder="Name"/>
                <input type="submit" value="Add User"/>

            </form>
        </div> 
    );
};
 
export default AddUser;