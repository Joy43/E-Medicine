import Image from "next/image";
import Navbar from "./Home/Navbar";
import Topbar from './Home/Topbar';
import { Banner } from "./Home/Banner";

export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Banner />
    </>
  );
}
