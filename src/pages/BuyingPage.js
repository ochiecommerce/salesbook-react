import React from "react";
import { useParams } from "react-router-dom";
import BuyNowForm from "../components/BuyNowForm";

const BuyingPage = ()=>{
    const {id} = useParams()
    return (
        <BuyNowForm id={id}/>
    )
}

export default BuyingPage