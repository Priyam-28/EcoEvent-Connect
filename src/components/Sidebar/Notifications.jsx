import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const Notifications = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);

    useEffect(() => {
        if (isOpen) {
            getRequests();
        }
    }, [isOpen]);

    const getRequests = async () => {
        try {
            const requestDocRef = collection(firestore, "requests");
            const q = query(requestDocRef, where("from", "==", authUser.uid));
            const querySnapshot = await getDocs(q);
            
            const requestData = [];
            for (const doc of querySnapshot.docs) {
                const request = doc.data();
                const event = await getEvent(request.eventId);
                requestData.push({ id: doc.id, eventName: event.name, ...request });
            }
            setRequests(requestData);
        } catch (error) {
            showToast("error", error.message, "error");
        }
    };

    const getEvent = async (eventId) => {
        try {
            const eventDocRef = doc(firestore, "events", eventId);
            const eventDocSnapshot = await getDoc(eventDocRef);
            return eventDocSnapshot.data();
        } catch (error) {
            console.error('Error fetching event:', error);
            return null;
        }
    };

    return (
        <>
            <Tooltip
                hasArrow
                label={"Notifications"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    onClick={onOpen}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                >
                    <NotificationsLogo />
                    <Box display={{ base: "none", md: "block" }}>Notifications</Box>
                </Flex>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Your Requests</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {requests.map(request => (
                            <Box key={request.id} mb={4}>
                                <Box fontWeight="bold">{request.eventName}</Box>
                                <Box>Status: {request.approval}</Box>
                            </Box>
                        ))}
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Notifications;
