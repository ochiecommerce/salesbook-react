import React, { useState } from "react";
import { Stack, Button, Modal, Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InquiryForm from './InquiryForm'

function ComponentModal({ isOpen, children, onClose }) {
    return (
        <Modal open={isOpen}>
            <Box>
                <Button onClick={onClose}>Close</Button>
                {children}
            </Box>
        </Modal>
    )
}

class PageOrModal{
    constructor(){
        this.components = {}
    }
    addComponent(key,component,path){
        this.components[key] = {component,path}
    }
    open(key){
        this.components[key].path()
    }
    close(key){
        this.components[key].path()
    }
    getComponent(key){
        return this.components[key].component
    }
    getModals(){
        return Object.keys(this.components).map(key=>{
            return <ComponentModal isOpen={false} onClose={()=>this.close(key)}>{this.getComponent(key)}</ComponentModal>
        })
    }
}

export default function QuickActions({ id }) {
    const isLargeDevice = useMediaQuery('(min-width:768px)')
    const [openInquiry,setOpenInquiry]=useState(false)
    const navigate = useNavigate()
    const onCloseInquire=()=>{
        setOpenInquiry(false)
    }
    const handleInquire = () => {
        if(isLargeDevice){
            setOpenInquiry(true)
        }else{
            navigate('/inquiries/' + id)
        }
    }
    const handleBook = () => {
        navigate('/booking/' + id)
    }
    const handleFeedback = () => {
        navigate('/feedback/' + id)
    }
    return (
        <Stack direction='column'>
            <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
            <Button onClick={handleInquire} variant="contained" color="primary">Inquire</Button>
            <Button onClick={handleBook} variant="contained" color="secondary">Book</Button>
            <Button variant="contained" color="success">Buy Now</Button>
            <Button onClick={handleFeedback} variant="outlined" color="warning">Rate</Button>
            <Button variant="outlined" color="info">Feedback</Button>
        </Stack>
        <ComponentModal onClose={onCloseInquire} isOpen={openInquiry}>
            <InquiryForm/>
        </ComponentModal>
        </Stack>
        
    )
}