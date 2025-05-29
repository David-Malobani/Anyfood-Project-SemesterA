import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../page/Header';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Nav from '../page/Nav';
export default function ApiInfo() {
    let { id } = useParams();
    let [api, setApi] = useState([]);
    let [filterApi, setFilterApi] = useState([]);

    async function getApi() {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        setApi(data.recipes);
        setFilterApi(data.recipes);
    }

    useEffect(() => {
        getApi();
    }, []);

    useEffect(() => {
        let filtered = api.filter(value => value.id === parseInt(id));
        setFilterApi(filtered);
    }, [id, api]);

    return (
        <div className='info'>
            <Header />
            <div className='info-container'>
                {filterApi.map((value) => (
                    <div key={value} className='info2 d-flex'>
                        <div className='info-image'>
                            <img src={value.image} alt="" />
                        </div>
                        <div className='info-text'>
                            <h2>{value.name}</h2>
                            <h4>{value.cuisine}</h4>
                            <p>{value.ingredients}</p>
                            <p>{value.instructions}</p>
                        </div>

                    </div>
                ))}
                <div className='go-back-button'>
                    <Link to='/ApiRecipes'>Go Back</Link>
                </div>


            </div>
        </div>
    );
}