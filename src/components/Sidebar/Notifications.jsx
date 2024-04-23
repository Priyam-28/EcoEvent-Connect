import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const Notifications = () => {
    const [requests, setRequests] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useShowToast();

    useEffect(() => {
        if (isOpen) {
            getRequests();
        }
    }, [isOpen]);

    const getEventName = async (eventId) => {
        try {
            const eventDocRef = doc(firestore, "events", eventId); // Reference specific event
            const eventDocSnapshot = await getDoc(eventDocRef);

            if (eventDocSnapshot.exists()) {
                return eventDocSnapshot.data().title;
            } else {
                console.warn("Event not found:", eventId);
                return null; // Or a default value
            }
        } catch (error) {
            console.error('Error fetching event:', error);
            return null;
        }
    };

    const getContriName = async (userId) => {
        try {
            const userDocRef = doc(firestore, "users", userId); // Reference specific user
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                return userDocSnapshot.data().fullName;
            } else {
                console.warn("User not found:", userId);
                return null; // Or a default value
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    const getRequests = async () => {
        try {
            const requestDocRef = collection(firestore, "requests");
            const q = query(requestDocRef, where("to", "==", authUser.uid));
            const querySnapshot = await getDocs(q);

            const requestData = [];
            for (const doc of querySnapshot.docs) {
                const request = doc.data();
                const eventName = await getEventName(request.eventId);
                const userName = await getContriName(request.from);
                requestData.push({ id: doc.id, eventName, userName, ...request });
            }
            setRequests(requestData);
        } catch (error) {
            showToast("error", error.message, "error");
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
                        {requests.map((request) => (
                            <Box key={request.id} mb={4}>
                                <Box fontWeight="bold">{request.eventName}</Box>
                                <Box fontWeight="medium">Request by: {request.userName}</Box>
                                {/* Include other properties of the request as needed */}
                                <Flex gap={"5px"}>
                                    <IoMdCheckmarkCircle size={25} color="green" />
                                    <SlClose size={25} color="red" />
                                </Flex>
                            </Box>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Notifications;
