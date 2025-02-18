import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

function Cart() {
    const APP_URI = "http://localhost:8000"
    const token = localStorage.getItem("token")
    const [cart , setCart ] = useState([])
    const [prices, setPrices] = useState()
    const [loading, setLoading] = useState(false)
    const [purchaseLoading, setPurchaseLoading] = useState(false)

    const fetchCart = useCallback(async () => {
      setLoading(true)
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
              setPrices(data.msg.reduce((accumulator, item) => accumulator + item.price, 0));
            } else {
              setCart([]);
            }
          } catch (error) {
            setCart([]);
          }finally{
            setLoading(false)
          }
    }, [token])

    useEffect(()=>{
        fetchCart()
    }, [fetchCart])

    const handlePurchase = async () => {
          setPurchaseLoading(true)
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
                fetchCart(); 
            } else {
                toast.error(data.msg)
              }
            } catch (error) {
              toast.error("Error in purchasing")
              console.log(error)
            }finally{
              setPurchaseLoading(true)
            }
    }
        }

    const deleteCart = async(courseId) => {
       try{
        const response = await fetch(`${APP_URI}/api/deleteCart/${courseId}`, {
         method : "DELETE", 
         headers : {
           "Authorization" : `Bearer ${token}`, 
           "Content-Type" : "application/json"
       }}); 
         const data = await response.json();
         console.log(data)

         if (response.ok) {
             toast.success(data.msg)
             fetchCart(); 
         } else {
             toast.error(data.msg)
         }
       }catch(error){
        console.log(error)
        toast.error("Error");
       }
    }

    if(loading){
      return (<>
      <Navbar />
      <Loading/>
      </>)
    }
    
  return (
    <>
     <Navbar/>
     
          <Card courses={cart} isCart={true} functions={deleteCart} />
     <center>
     <div className="fixed-bottom my-3">
                    Total Courses {cart.length} 
                <div className="container justify-content-center">
                  <div className="card w-100">
                    <div className="card-body">
                      <h5 className="card-title purchase-footer my-2">
                       Total Price :  
                       {prices ? (
                          purchaseLoading ? (
                            <button className="btn btn-success mx-3" disabled>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              Processing...
                            </button>
                          ) : (
                            <Link to="#" id="totalAmountButton" className="btn btn-success mx-3" onClick={handlePurchase}>
                              {prices}
                            </Link>
                          )
                        ) : (
                          <button className="btn btn-danger mx-3" disabled>
                            Empty Cart
                          </button>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
     </center>
    </>
  )
}

export default Cart
