import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'

function Cart() {
    const APP_URI = "http://localhost:8000"
    const token = localStorage.getItem("token")
    const [cart , setCart ] = useState([])

    const fetchCart = async () => {
        try {
            const response = await fetch(`${APP_URI}/api/fetchcart`, {
              method: "GET",
              headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
      
            const data = await response.json();
            console.log(data)
            if (response.ok) {
              setCart(data.msg); 
            } else {
                setCart([]);
            }
        } catch (error) {
            setCart([]);
        }
    
    }

    useEffect(()=>{
        fetchCart()
    }, [token])

    const handlePurchase = async () => {
          const courseIds = []; 

          if(cart.length > 0){
            cart.map((item) => {
             return courseIds.push(item._id)
            })
          }

          if(courseIds.length > 0){

              try {
                  const response = await fetch(
                      `${APP_URI}/api/purchasecourse`,
                      {
                method: "POST",
                headers: {
                "Authorization" : `Bearer ${token}`,  
                "Content-Type": "application/json"
                },
                body : JSON.stringify(courseIds)
              }
            );
        
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                toast.success(data.msg)
            } else {
                toast.error(data.msg)
            }
        } catch (error) {
            toast.error("Error in purchasing")
            console.log(error)
        }
    }
        }

  return (
    <>
     <Navbar/>
     {cart.map(items => <div key={items._id}>
          <p> {items.title} </p>
     </div>
      )}

      <button className='btn btn-success' onClick={handlePurchase}> Purchase course </button>
    </>
  )
}

export default Cart
