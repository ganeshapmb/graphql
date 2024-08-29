'use client'
import React from 'react'
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/lib/convertToSubcurrency'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


const Payment = () => {
    const amount = 40.52
  return (
    <>
        <Elements stripe={stripePromise} options={{mode:"payment", 
            amount:convertToSubcurrency(amount), //cents
             currency:"usd"}}>
            <CheckoutPage amount={amount}/>
        </Elements>
    </>
  )
}

export default Payment