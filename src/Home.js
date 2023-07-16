import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';

function Home() {
  const token = localStorage.getItem('token');
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div>
      {token && admin ? (
        <div>
          <h2>Hello, {admin.adminName}!</h2>
          <h4>Welcome to Team Allocation Application.</h4>
          <center>
          <Carousel interval={3000} className='tryout'>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          </center>
        </div>
      ) : (
        <div className="text-center">
           <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <span className="navbar-brand">Team Allocation Application</span>
              <div className="d-flex align-items-center">
                <Link to="/login" className="btn btn-primary me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
              </div>
            </div>
          </nav>
          <br></br>
          <center>
          <Carousel interval={3000} className='tryout'>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          </center>
        </div>
      )}
    </div>
  );
}

export default Home;
