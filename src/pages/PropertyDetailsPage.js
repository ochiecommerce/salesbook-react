import React from "react";
import { useParams } from "react-router-dom";
import PropertyDetails from "../components/PropertyDetails";

export default function PropertyDetailsPage() {
    const {id} = useParams();
    return <PropertyDetails id={id} />;
    }