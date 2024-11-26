import React, { useEffect } from 'react'
import Header from '../../header/Header'
import imgSrc from '../../../assets/sales_img.png'
import { useNavigate } from 'react-router';
import useProductStore from '../../store/ProductStore';

const Sales = () => {
  const navigate = useNavigate();

  const { userRole } = useProductStore();

  useEffect(() => {
 
    if(userRole === null){
      navigate("/")
    }
    
  }, [userRole]);
  return (
    <div>
      <Header />
      <div className="mt-20 xl:mt-40 text-center">
        {/* Image */}
        <img 
          src={imgSrc} 
          alt="Sales Image" 
          className="w-64 h-64 mx-auto sm:w-80 sm:h-80 md:w-96 md:h-96" 
        />
        {/* Text */}
        <p className="mt-6 text-2xl sm:text-3xl md:text-4xl font-extralight text-black italic">
          No sales have been made so far... Let's watch keen!
        </p>
      </div>
    </div>
  )
}

export default Sales
