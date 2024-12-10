import React from 'react';
import '../css/style.css';
import Carousel from './Carousel';
import Trendingproducts from './Trendingproducts';
import Shopbyanime from './Shopbyanime';
import Marquee from './Marquee';
export default function Home() {

    return (
        <>
            <div className="container-fluid px-0">
                    <Carousel/>
                    <Trendingproducts/>
                    <Shopbyanime />
                    {/* <Marquee/> */}
                   
                </div>
               
    </>
            )
}
