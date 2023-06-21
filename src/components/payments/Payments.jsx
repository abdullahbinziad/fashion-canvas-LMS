import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckOutForm from "../checkout/CheckOutForm";
import { useLoaderData } from "react-router-dom";

//Todo privide publisheable key
const stripePromise = loadStripe('pk_test_51NH8pVSJ7WKrfIqb6EH4EmYUaKOqoHUc6iYU03GpFkyUpg1cbCsA89ip6FKBj1c9wMeiDbQVAgRfysURyOUDy3Tc00KC53zbyx');

const Payments = () => {
    const loadedData = useLoaderData();

  return (
    <div className=" w-3/4 mx-auto space-y-7 py-40">
      <h1 className="text-2xl text-center font-semibold"> This is Payments option </h1>
      <div className="">
        <Elements stripe={stripePromise}>
          <CheckOutForm theData ={loadedData}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
