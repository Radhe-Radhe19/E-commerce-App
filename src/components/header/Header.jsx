import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import FilterBar from "../../pages/home/filterBar/FilterBar";
import { useCartContext } from "../../context/cartContext/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const {
    state: { cart, unfilteredProducts },
    dispatch,
  } = useCartContext();
  const cartLength = cart.length;
  const subTotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  useEffect(() => {
    if (!searchValue) {
      dispatch({
        type: "SET_PRODUCTS",
        payload: unfilteredProducts,
      });
      return;
    }
    const filteredItems = unfilteredProducts.filter((p) => {
      return p.productName.toLowerCase().includes(searchValue.toLowerCase());
    });
    dispatch({
      type: "SET_PRODUCTS",
      payload: filteredItems,
    });
  }, [searchValue]);

  return (
    <div className="navbar bg-base-100 border-b border-b-white/10 sticky top-0 z-[100]">
      <div className="flex-1">
        <div className="drawer min-[570px]:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content w-4">
            <label
              htmlFor="my-drawer"
              className="btn btn-outline btn-info btn-sm px-2"
            >
              <CiMenuBurger className="text-2xl" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <FilterBar />
            </ul>
          </div>
        </div>

        <Link
  to="/"
  className="text-xl font-medium italic relative group inline-block"
>
  {/* created using chatGPT */}
  {/* Text with animated underline */}
  <span className="relative">
    <span className="block relative z-10">Le Fergusion</span>
    <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
  </span>
  
  {/* Auto-repeating sparkle effect */}
  <span className="absolute -top-1 -right-4 animate-[sparkle_2s_infinite]">
    ✨
  </span>
  
  {/* Second sparkle for staggered effect */}
  <span className="absolute -top-0.5 -right-6 animate-[sparkle_2s_infinite_1s] opacity-0">
    ✨
  </span>
</Link>

<style jsx>{`
  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.2) rotate(20deg);
    }
  }
`}</style>
      </div>

      <div className="flex gap-3">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
   <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartLength}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cartLength} Items</span>
              <span className="text-info">Subtotal: {subTotal} Rs</span>
              <div className="card-actions">
                <button
                  onClick={() => navigate("/cart")}
                  className="btn btn-primary btn-block"
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
