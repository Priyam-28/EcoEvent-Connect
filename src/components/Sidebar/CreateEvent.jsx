import  { useRef, useState } from 'react';
import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useCreateEvent from "../../hooks/useCreateEvent";
import { BsFillImageFill } from "react-icons/bs";

export default function CreateEvent() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const showToast = useShowToast();
    const { isLoading, handleCreateevent } = useCreateEvent();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        from: "",
        to: "",
        cause: "",
    });

    const handleEventCreation = async () => {
        try {
            await handleCreateevent(inputs.title, selectedFile, inputs.description, inputs.from, inputs.to, inputs.cause);
            onClose();
            setSelectedFile(null);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <>
            <Tooltip
                hasArrow
                label={"Create"}
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
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Organise Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input placeholder='Event Name' size='md' value={inputs.title} onChange={(e) => setInputs({ ...inputs, title: e.target.value })} />
                        <br /><br />
                        <Textarea
                            placeholder='Describe your event....'
                            value={inputs.description}
                            size='lg'
                            onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                        />
                        <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />
                        <BsFillImageFill
                            onClick={() => imageRef.current.click()}
                            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                            size={16}
                        />
                        {selectedFile && (
                            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                                <Image src={selectedFile} alt='Selected img' />
                                <CloseButton
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                    onClick={() => {
                                        setSelectedFile(null);
                                    }}
                                />
                            </Flex>
                        )}
                        <Input
                            placeholder='From'
                            size='md'
                            type='date'
                            value={inputs.from}
                            onChange={(e) => setInputs({ ...inputs, from: e.target.value })}
                        />
                        <Input
                            placeholder='To'
                            size='md'
                            type='date'
                            value={inputs.to}
                            onChange={(e) => setInputs({ ...inputs, to: e.target.value })}
                        />
                        <Select
                            placeholder='Select Event Cause'
                            value={inputs.cause}
                            onChange={(e) => setInputs({ ...inputs, cause: e.target.value })}
                        >
                            <option value='Fund Raise'>Fund Raiser</option>
                            <option value='Clean & Green Environment'>Clean & Green Environment</option>
                            <option value='Donations'>Donations</option>
                            <option value='Connecting People'>Connecting People</option>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={handleEventCreation} isLoading={isLoading}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
