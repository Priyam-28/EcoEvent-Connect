// import React from 'react'

import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

export default function useHandleRequest(eventId, userId) {
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    // const [request,setRequest]=useState();

    // useEffect(() => {
    //     // Function to fetch requests for the event from Firestore
    //     const fetchRequests = async () => {
    //         const requestsRef = collection(firestore, 'requests');
    //         const q = query(requestsRef, where('eventId', '==', eventId));
    //         const querySnapshot = await getDocs(q);
    //         const requestList = [];
    //         querySnapshot.forEach((doc) => {
    //             requestList.push({ id: doc.id, ...doc.data() });
    //         });
    //         setRequest(requestList);
    //     };

    //     fetchRequests(); // Call the function to fetch requests when eventId changes
    // }, [eventId]); // useEffect will re-run whenever eventId changes

    // Function to handle request submission
    const handleRequestContribution = async (to, eventId) => {
        if (isLoading) return;
        setIsLoading(true);
    
        try {
            // Check if the request already exists
            const requestDocRef = collection(firestore, "requests");
            const q = query(requestDocRef, where("from", "==", authUser.uid), where("eventId", "==", eventId));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                showToast("error", "Contribution request already exists for this event", "error");
                setIsLoading(false); // Reset loading state
                return; // Exit function if request already exists
            }
    
            const newRequest = {
                from: authUser.uid,
                to: to,
                eventId: eventId,
                approval: "pending"
            };
    
            await addDoc(collection(firestore, "requests"), newRequest);
            const userDocRef = doc(firestore, "users", authUser.uid);
    
            showToast("success", "Contribution request submitted successfully!", "success");
        } catch (error) {
            console.error('Error submitting contribution request:', error);
            showToast("error", "Error submitting contribution request", "error");
        } finally {
            setIsLoading(false); // Reset loading state in both success and error cases
        }
    };
    

    // Function to handle accepting a request
    const handleAcceptRequest = async (requestId) => {
        try {
            // Update the status of the request to 'accepted' in Firestore
            const requestDocRef = doc(firestore, 'requests', requestId);
            await updateDoc(requestDocRef, { status: 'accepted' });
            // Optionally, perform any other actions (e.g., notify user)
            alert('Request accepted successfully!');
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    // Function to handle rejecting a request
    const handleRejectRequest = async (requestId) => {
        try {
            // Update the status of the request to 'rejected' in Firestore
            const requestDocRef = doc(firestore, 'requests', requestId);
            await updateDoc(requestDocRef, { status: 'rejected' });
            // Optionally, perform any other actions (e.g., notify user)
            alert('Request rejected successfully!');
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };
    return { handleRequestContribution, handleRejectRequest, handleAcceptRequest }
}
