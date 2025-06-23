import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <aside className="about-me">
      <img src="https://images.pexels.com/photos/32269531/pexels-photo-32269531.jpeg" alt="profile" className='profile-pic' />
      <h3>Abhishek Chouhan</h3>
      <p>A Computer Science Engineer</p>
      <h4>Hobbies</h4>
      <ul>
        <li>Programming</li>
        <li>Book Reading</li>
        <li>Gaming</li>
        <li>Badminton</li>
        <li>Photography</li>
      </ul>
    </aside>
  );
}

export default AboutMe;
