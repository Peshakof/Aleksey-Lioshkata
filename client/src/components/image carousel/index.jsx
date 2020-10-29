import React, {useState, useEffect} from 'react';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import { Link } from 'react-router-dom';
import imageService from '../../services/image-service';
import FontAwesome from 'react-fontawesome';
import './style.scss'

const Carousel = () => {

  const [index, setIndex] = useState(0);
  const [imgArr, setImgArr] = useState({}); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (index === 8) {
        setIndex(0);
      } else {
        setIndex(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const images = [
    {
      category: 'Pets',
      link: 'dashboard/pet',
      src: "https://images.unsplash.com/photo-1512873897628-eea05c840147?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Places',
      link: 'dashboard/places',
      src: "https://images.unsplash.com/photo-1584011958148-eeba80e718e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Cars',
      link: 'dashboard/cars',
      src: "https://images.unsplash.com/photo-1514867644123-6385d58d3cd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Landscapes',
      link: 'dashboard/landscape',
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Houses',
      link: 'dashboard/houses',
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    {
      category: 'Sport',
      link: 'dashboard/sport',
      src: "https://images.unsplash.com/photo-1519119012096-c145def61801?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'People',
      link: 'dashboard/people',
      src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Nature',
      link: 'dashboard/nature',
      src: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Technology',
      link: 'dashboard/high-tech',
      src: "https://images.unsplash.com/photo-1561883088-039e53143d73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    }
    
  ];

  const x = () => (
    imageService.getAll()
      .then(res => {
        setImgArr(res.data);
        console.log(imgArr)
      })
  );

  return (
    <div className="carousel">
      <header>
        <h2>Choose a topic</h2>
      </header>
      <Gallery
        className="carousel-content"
        index={index}
        enableControls={true}
        enableIndicators={true}
        onRequestChange={i => {
          setIndex(i);
        }}
      >
        {images.map(image => (
          <React.Fragment key={image.src}>
            <GalleryImage objectFit="contain"  src={image.src} className="gallery-image"/>
            <Link to={image.link} onClick={x} className="topic-link">
              {image.category} <FontAwesome name="pointer" className="fas fa-mouse-pointer"/>
            </Link>
          </React.Fragment>
        ))}
      </Gallery>
    </div>
  )
}

export default Carousel