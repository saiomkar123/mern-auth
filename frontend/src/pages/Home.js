import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedinUser'))
    }, []);
    useEffect(() => {
        fetchProducts()
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedinUser');
        handleSuccess('User loggedout successfully');
        setTimeout(() => {
            navigate('/login')
        }, 500);
    }

    const fetchProducts = async () => {
        try {
            const url = 'http://localhost:8080/products/list';
            const headers = {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            const { message, success } = await response.json();
            if (success) {
                setProducts(message);
            } else {
                handleError(message)
            }
            console.log(message, success, products);
        } catch (e) {
            handleError(e)
        }
    }

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products.map((item, index) => (
                        <ul key={index}>
                            <li>
                                <span>{item.name} : {item.price}</span>
                            </li>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
};

export default Home;