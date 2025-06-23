
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY';
const PEXELS_USER_ID = '255079711';

const Photography = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://api.pexels.com/v1/users/${PEXELS_USER_ID}/photos`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    })
      .then(response => response.json())
      .then(data => setPhotos(data.photos))
      .catch(error => console.error('Error fetching photos:', error));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1>Photography</h1>
      <div className="gallery">
        {photos.map(photo => (
          <img key={photo.id} src={photo.src.medium} alt={photo.photographer} />
        ))}
      </div>
      <a href="https://www.pexels.com/@abhishek-chouhan-255079711/" target="_blank" rel="noopener noreferrer">
        View More
      </a>
    </motion.div>
  );
};

export default Photography;