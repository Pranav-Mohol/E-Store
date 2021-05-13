import React,{useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { createCategory } from './helper/adminapicall'


const AddCategory = ()  =>{

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3"  to="/admin/dashboard">
                Admin Panel
            </Link>
        </div>
    )

    const categoryForm = () => {
       return(
        <form>
        <div className="form-group">
            <p className="lead">
                Enter the Category
            </p>
            <input 
                type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="Category Name"
            />
            <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
        </div>
        </form>
       )
    }

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }
        
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id , token, {name})
        .then(data => {
            if(data?.error) {
                setError(true);
            }
            else {
                setError("");
                setSuccess("true");
                setName("");
            }
        })
        .catch(console.log("Error in submit"))
    }
    
    const SuccessM = () => {
        if(success) {
            return (
                <div className="text-success">
                    New Category is Added to th DB
                </div>
            )
        }
    }

    const WarningM = () => {
        if(error) {
            return (
                <div className="text-success">
                    Failed to create Category
                </div>
            )
        }
    }
    return (
        <Base 
            title="Create Category" 
            description="Add a new Category"
            className="container bg-success p-4"
        >
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                {SuccessM()}
                {WarningM()}
                {categoryForm()}
                {goBack()}
            </div>
        </div>
        </Base>
    )
}

export default AddCategory