import React, { useEffect, useState } from "react";
import { Header, Footer } from './footer';
import axios from 'axios';


function Gallery() {
   const [greeting, setGreeting] = useState("");

    

useEffect(() => {
    axios.get("http://localhost:8080/hello")
        .then(response => {
            setGreeting(response.data);
            
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}, []); 

    return (
        <div>
            <Header />
            <h2>Image Gallery</h2>
            <p>This is where the image gallery will be displayed.</p>
            <p>Greeting from backend: {greeting}</p>

            <Footer />
        </div>
    )
}


export default Gallery;