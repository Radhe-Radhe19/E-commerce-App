import React from "react";
import SubTotalSidebar from "./SubTotalSideBar";
import CartBody from "./CartBody";

const Home = () => {
  return (
    <div className="flex">
      <CartBody />
      <div>
        <SubTotalSidebar />
      </div>
    </div>
  );
};

export default Home;
