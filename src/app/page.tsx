"use client"
import Navbar from "./Home/Navbar";
import Topbar from './Home/Topbar';
import { Banner } from "./Home/Banner";
import { FeaturedCategory } from "./Home/FeaturedCategory";
import FeaturedCard from "./Home/FeaturedCard";
import Footer from "./Home/Footer";
import LatestProduct from "./Home/LatestProduct";


export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Banner />
      <FeaturedCard></FeaturedCard>
      <FeaturedCategory/>
      
   <LatestProduct></LatestProduct>
   <Footer></Footer>
    </>
  );
}
