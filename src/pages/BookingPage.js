import React from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

const BookingPage = ()=>{
    const {id} = useParams()
    return (
        <BookingForm id={id}/>
    )
}

export default BookingPage