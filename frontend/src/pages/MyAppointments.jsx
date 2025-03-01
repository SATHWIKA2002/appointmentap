import { useContext ,useEffect,useState} from "react" 
import axios from 'axios'
import {AppContext} from '../context/AppContext'
import {toast} from 'react-toastify'
//import {useNavigate} from 'react-router-dom'
const MyAppointments = () => {
  const {backendUrl,token,getDoctorsData}=useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const months =[" ","Jan","Feb","Mar","Apr","May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  //const navigate=useNavigate()
  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+ months[Number(dateArray[1])]+ " " + dateArray[2]
  }
  const getUserAppointments = async ()=>{
    try {
      const {data}= await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
     if (data.success){
         setAppointments(data.appointments.reverse())
         console.log(data.appointments)
     }
    }
    catch(error){

      console.log(error)
      toast.error(error.message)
    }
  }
//cancel appointment 
const cancelAppointment =async (appointmentId)=>{
  try{
 const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
if(data.success){
  toast.success(data.message)
  getUserAppointments()
  getDoctorsData()
}
else{
  toast.error(data.message)
}


  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
} 
// const  initPay=(order)=>{
//   const options  ={
//     key : import.meta.env.VITE_RAZORPAY_KEY_ID,
//     amount: order.amount,
//     currency :order.currency,
//     name:"Appointment Payment",
//     description : "Appointment Payment",
//     order_id :order.id,
//     receipt :order.receipt ,
//     handler :async(response)=>{
//       console.log(response)
// try{
// const {data}= await axios.post(backend+'/api/user/verifyRazorpay',response,{headers:{token}})
// if (data.success){
//   getUserAppointments()
//   navigate('/my-appointments')

// }
// }
// catch(error){
//   console.log(error)
//   toast.error(error,message)

// }

//     }
//   }
//   const rzp=new window.Razorpay(options)
//   rzp.open()

// }
// const appointmentRazorpay=async(appointmentId)=>{
//   try{
//     const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
//     if (data.success){
//     initPay(data.order)
//     }
//   }catch(error){

//   }


// }

  useEffect(()=>{
if(token){
getUserAppointments()
}
  },[token])
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointments.map((item,index)=>(
          <div className='grid grid-cols-[1fr{2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <div>
          <img className="w-32 bg-indigo-50" src={item.docData.image} alt=''/>
          </div>
          <div className="flex-1 text-sm text-zinc-600">
          <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
          <p>{item.docData.speciality}</p>
          <p className="text-zinc-700 font-medium mt-1">Address</p>
          <p className="text-xs"> {item.docData.address.line1}</p>
          <p className="text-xs">{item.docData.address.line2}</p>
          <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
          </div>
          <div>   </div>
          <div className="flex flex-col gap-2 justify-end">
       {/* {!item.cancelled && item.payment && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>} 
       {!item.cancelled && !item.isCompleted  && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">Pay Online</button>}    
        !item.cancelled && !item.payment  onClick={()=>appointmentRazorpay(item._id)}  to be added above  */}
          {!item.cancelled &&    !item.isCompleted  && <button onClick={()=>cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel Appointment</button>} 
          {item.cancelled &&  !item.isCompleted  &&  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500 ">Appointment Cancelled
          </button>}
          {
            item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
          }
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments




// import { useContext, useEffect, useState } from "react";
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import { toast } from 'react-toastify';
// // import { useNavigate } from 'react-router-dom';

// const MyAppointments = () => {
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);
//   const [appointments, setAppointments] = useState([]);
//   const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   // const navigate = useNavigate();

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split('_');
//     return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
//   };

//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//         console.log(data.appointments);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Cancel appointment
//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//         getDoctorsData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Stripe payment initialization
//   const initStripePayment = (paymentIntentId, clientSecret) => {
//     const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
//     stripe.confirmCardPayment(clientSecret).then((result) => {
//       if (result.error) {
//         toast.error(result.error.message);
//       } else {
//         toast.success("Payment successful");
//         getUserAppointments();
//         // navigate('/my-appointments');
//       }
//     });
//   };

//   // Handle Stripe payment for appointment
//   const appointmentStripe = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } });
//       if (data.success) {
//         initStripePayment(data.paymentIntent.id, data.paymentIntent.client_secret);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
//       <div>
//         {appointments.map((item, index) => (
//           <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
//             <div>
//               <img className="w-32 bg-indigo-50" src={item.docData.image} alt='' />
//             </div>
//             <div className="flex-1 text-sm text-zinc-600">
//               <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
//               <p>{item.docData.speciality}</p>
//               <p className="text-zinc-700 font-medium mt-1">Address</p>
//               <p className="text-xs"> {item.docData.address.line1}</p>
//               <p className="text-xs">{item.docData.address.line2}</p>
//               <p className="text-xs mt-1">
//                 <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>
//                 {slotDateFormat(item.slotDate)} | {item.slotTime}
//               </p>
//             </div>
//             <div className="flex flex-col gap-2 justify-end">
//               {/* Show "Paid" button if the appointment is not canceled and payment is completed */}
//               {!item.cancelled && item.payment && (
//                 <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
//                   Paid
//                 </button>
//               )}

//               {/* Show "Pay Online" button if the appointment is not canceled, payment is not completed, and the appointment is not marked as completed */}
//               {!item.cancelled && !item.isCompleted && !item.payment && (
//                 <button
//                   onClick={() => appointmentStripe(item._id)}
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
//                 >
//                   Pay Online
//                 </button>
//               )}

//               {/* Show "Cancel Appointment" button if the appointment is not canceled and not marked as completed */}
//               {!item.cancelled && !item.isCompleted && (
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
//                 >
//                   Cancel Appointment
//                 </button>
//               )}

//               {/* Show "Appointment Cancelled" button if the appointment is canceled and not marked as completed */}
//               {item.cancelled && !item.isCompleted && (
//                 <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
//                   Appointment Cancelled
//                 </button>
//               )}

//               {/* Show "Completed" button if the appointment is marked as completed */}
//               {item.isCompleted && (
//                 <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
//                   Completed
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;
