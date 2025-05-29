import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Card, CardBody, CardText, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../page/Header';

export default function Apitest() {
    let [api, setApi] = useState([]);
    let [filterApi, setFilterApi] = useState([]);
    let [search, setSearch] = useState('');

    function loadData() {
        fetch('https://dummyjson.com/recipes')
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                setApi(data.recipes);
                setFilterApi(data.recipes);
            });
    }

    useEffect(() => {
        loadData();

    }, []);

    function searchInput(event) {
        setSearch(event.target.value);
        let filterd = api.filter(function (value) {
            return value.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilterApi(filterd);
    }

    return (
        <div className='ApiRecipes'>

            <Header />
            <div className='title-backg d-flex justify-content-evenly'>
                <div className='rec-title-img1'><img src="https://m.media-amazon.com/images/I/61puwQ4QrYL._AC_UF1000,1000_QL80_.jpg" /></div>
                <div>
                    <div className='recipes-title'>
                        <h2>Our Recipes</h2>
                    </div>
                    <div className='searchInput'>
                        <input type="text" onChange={searchInput} placeholder='Search your next meal' />
                    </div>
                </div>
                <div className='rec-title-img2'><img src="https://m.media-amazon.com/images/I/61puwQ4QrYL._AC_UF1000,1000_QL80_.jpg" /></div>
            </div>



            <div className='d-flex flex-wrap justify-content-evenly'>
                {filterApi.map(value => {

                    return (
                        <Link className='cardd col-6 col-md-3' to={`/ApiInfo/${value.id}`}>
                            <div className='meal-img'>
                                <img src={value.image} alt="" />
                            </div>
                            <div className='d-flex flex-column'>
                                <h6>{value.name}</h6>
                            </div>
                        </Link>
                    )
                })}
            </div>


        </div>

    )
}
