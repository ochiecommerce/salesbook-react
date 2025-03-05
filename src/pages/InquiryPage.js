import React from "react";
import { useParams } from "react-router-dom";
import InquiryForm from "../components/InquiryForm";

export default function InquiryPage(){
    const {id} = useParams()
    return (
        <InquiryForm id={id}/>
    )
}