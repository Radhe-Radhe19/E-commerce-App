// File: ./pages/productDetails/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../../context/cartContext/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { state: { products }, dispatch } = useCartContext();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const fetchedProduct = products.find((p) => p.id === id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setSelectedImage(fetchedProduct.image);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity }
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-600 mb-6">
        <span className="text-blue-600 cursor-pointer">Home</span> &gt; 
        <span className="text-blue-600 cursor-pointer"> Category</span> &gt; 
        <span className="text-gray-300"> {product.productName}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-2/3">
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {[product.image, ...(product.additionalImages || [])].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover border rounded cursor-pointer ${selectedImage === img ? 'border-orange-200 border-2' : 'border-gray-800'}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          
          <div className="flex-1 flex items-center justify-center border border-gray-500 rounded-lg p-4 order-1 md:order-2">
            <img 
              src={selectedImage} 
              alt={product.productName} 
              className="max-h-96 object-contain"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/3 space-y-4">
          <h1 className="text-2xl font-medium text-gray-300">{product.productName}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-300'}>
                  {i < product.ratings ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-blue-600 text-sm">{product.ratingCount || 124} ratings</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 text-sm">{product.questionsAnswered || 23} answered questions</span>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="mb-2">
              <span className="text-xl text-red-500 font-semibold">₹ {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 ml-2">
                    {Math.round((1 - product.price/product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
              <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            <div className="bg-gray-800 p-3 rounded">
              <h3 className="font-medium mb-2">Available offers</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-orange-700 text-white text-xs px-1.5 py-0.5 rounded mr-2">Bank Offer</span>
                  5% Cashback on Axis Bank Card
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-700 text-white text-xs px-1.5 py-0.5 rounded mr-2">Special Price</span>
                  Get extra 10% off (price inclusive of discount)
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-700 text-white text-xs px-1.5 py-0.5 rounded mr-2">Partner Offer</span>
                  Sign up for Pay Later and get Gift Card
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Delivery Options</h3>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Enter Delivery Pincode" 
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button className="bg-blue-500 border border-l-0 text-white border-gray-300 rounded-r px-4 text-sm font-medium hover:bg-blue-800">
                Check
              </button>
            </div>
            <p className="text-sm">
              {product.fastDelivery 
                ? "Get it by tomorrow"
                : "Usually delivered in 5-7 days"
              }
            </p>
            <p className={`text-sm ${product.inStock > 0 ? 'text-green-700' : 'text-red-700'}`}>
              {product.inStock > 0 ? 'In Stock' : 'Currently Unavailable'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm">Quantity:</label>
            <select 
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[...Array(Math.min(10, product.inStock))].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={handleAddToCart}
              className="bg-red-600 hover:bg-red-800 text-gray-900 font-medium py-2 px-4 rounded shadow-sm transition-colors"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-blue-400 hover:bg-blue-500 text-gray-900 font-medium py-2 px-4 rounded shadow-sm transition-colors"
            >
              Buy Now
            </button>
          </div>

          <div className="text-sm text-gray-600 space-y-1 pt-2">
            <p>Sold by <span className="text-blue-600 cursor-pointer">{product.seller || 'RetailNet'}</span></p>
            <p>7 days replacement policy</p>
            <p>GST invoice available</p>
          </div>
        </div>

        <div className="w-full lg:w-64 border border-gray-200 rounded-lg p-4 h-fit">
          <h3 className="font-medium mb-3">Delivery Options</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center">
              <span className="text-lg mr-2">🚚</span> Free delivery
            </p>
            <p>Delivery by {product.fastDelivery ? 'Tomorrow' : '5-7 working days'}</p>
            <p>Pay on Delivery available</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-medium border-b border-gray-200 pb-2 mb-4">Product Description</h2>
        <p className="text-gray-400 mb-6">{product.productDescription}</p>
        
        <h3 className="text-lg font-medium mb-3">Specifications</h3>
        <table className="w-full border-collapse">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-4 bg-gray-700 font-medium w-1/3">Brand</td>
              <td className="py-2 px-4">{product.brand || 'Generic'}</td>
            </tr>
            <tr>
              <td className="py-2 px-4  bg-gray-700 font-medium">Model</td>
              <td className="py-2 px-4">{product.model || product.productName}</td>
            </tr>
            <tr>
              <td className="py-2 px-4  bg-gray-700 font-medium">Warranty</td>
              <td className="py-2 px-4">{product.warranty || '1 year manufacturer warranty'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;