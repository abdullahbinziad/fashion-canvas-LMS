import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";


import './CheckoutForm.css'
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useCart from "../../hooks/useCart";


const CheckoutForm = (props) => {


const nevigate = useNavigate();




    const {_id,InstructorEmail,InstructorName,Enrolled,Nowstatus,image,courseTitle,totalSeats,courseOutline,coursePrice,courseDuration,adminMesage} = props.theData;


    let [cart] =useCart();
    console.log(cart);

    if(!props.theData){
     cart = props.theData ;
    }


    const thecartId= cart.find(n=> n.courseId ==_id)
   


    const stripe = useStripe();
    const elements = useElements();
    const { user } = UseAuth();
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

console.log(coursePrice);

    useEffect(() => {
        if (coursePrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: parseInt(coursePrice) })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                    setProcessing(true)

                })
        }
    }, [coursePrice, axiosSecure])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
            // console.log('payment method', paymentMethod)
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('payment intent', paymentIntent)
        setProcessing(false)
        if (paymentIntent?.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                Payamount: parseInt(coursePrice),
                date: new Date(),
               courseId: _id,
               cartId:thecartId._id
             

            }
            axiosSecure.post('/payments-singleEnrolled', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult.insertedId) {
                        // display confirm
                        Swal.fire(
                            `Your Payments ${coursePrice} is Successful `,
                            `TransactionId is : ${paymentIntent.id}`,
                            'success'
                          ).then((res)=> nevigate('/') )
                          //update Enrolled Propertry  and seat Property
axios.put(`https://fashion-canvas-institute-server.vercel.app/students/course/${_id}` , {Enrolled: (Enrolled+1) }).then(res=> {
console.log(res);
})

                    }
                })
        }else{
            Swal.fire(
                `Your Payments ${coursePrice} is Not Successful `,
                ``,
                'error'
              )
        }


    }


    console.log(stripe,clientSecret,processing);
    return (
        <>




<Card className="mt-6 w-[600px] mx-auto">

<h1 className="p-4 mt-5 font-semibold text-xl text-center"> You Have to Pay <span className="text-red-400">${coursePrice}</span> | Please Pay with Valid Cards </h1>

<form className=" m-8 myform" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn mybutton btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret }>
                    Pay
                </button>
            </form>
            
    </Card>
          
        </>
    );
};

export default CheckoutForm;