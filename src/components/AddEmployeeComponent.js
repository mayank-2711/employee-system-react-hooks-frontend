import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const history = useNavigate();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {firstName, lastName, emailId};

        // Basic form validation
        if (!firstName || !lastName || !emailId) {
            alert("All fields are mandatory!");
            return;
        }

        if(id){
            EmployeeService.updateEmployee(id, employee).then((response) => {
                history('/employees');
            }).catch(error => {
                console.log(error);
            });

        } else {
            EmployeeService.createEmployee(employee).then((response) => {  
                console.log(response.data);  
                history('/employees');
            }).catch(error => {
                console.log(error);
            });
        }        
    }

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmailId(response.data.emailId);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    const title = () => {
        return id ? <h2 className='text-center'> Update Employee </h2> : <h2 className='text-center'> Add Employee </h2>;
    }

    return (
        <div>
            <br /><br />
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {title()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'> First Name: </label>
                                    <input 
                                        type='text'
                                        placeholder='Enter first name'
                                        name='firstName'
                                        className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required>    
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'> Last Name: </label>
                                    <input 
                                        type='text'
                                        placeholder='Enter last name'
                                        name='lastName'
                                        className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required>    
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'> Email ID: </label>
                                    <input 
                                        type='email'
                                        placeholder='Enter Email ID'
                                        name='emailId'
                                        className='form-control'
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                        required>    
                                    </input>
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}> Submit </button>
                                <span>    </span>
                                <Link to="/employees" className='btn btn-danger'> Cancel </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployeeComponent;
