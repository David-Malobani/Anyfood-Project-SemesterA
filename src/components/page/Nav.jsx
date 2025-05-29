import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function Nav() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <>

                <img className='menu-icon' variant="primary" onClick={handleShow} src='https://static-00.iconduck.com/assets.00/menu-button-icon-512x512-x86bgpt9.png' alt="" />


                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul className='nav-bar d-flex flex-column '>
                            <li><Link to="/ApiRecipes"> Our Recipes</Link></li>
                            <li><Link to="/UsersRecipes"> Users Recipes</Link></li>
                            <li><Link to="/MyRecipes"> My Recipes</Link></li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        </div>
    )
}



