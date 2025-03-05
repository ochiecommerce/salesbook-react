import React from "react";
import { useParams } from "react-router-dom";
import RatingFeedbackForm from "../components/FeedbackForm";

const FeedbackPage = ()=>{
    const {id} = useParams()
    return (
        <RatingFeedbackForm id={id}/>
    )
}

export default FeedbackPage