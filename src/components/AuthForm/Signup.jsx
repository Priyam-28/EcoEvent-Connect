import { useState } from "react";
import { Alert, AlertIcon, Button, Checkbox, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        interests: [],
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error, signup } = useSignUpWithEmailAndPassword();

    const handleInterestChange = (interest) => {
        if (inputs.interests.includes(interest)) {
            setInputs((prevInputs) => ({
                ...prevInputs,
                interests: prevInputs.interests.filter((item) => item !== interest),
            }));
        } else {
            setInputs((prevInputs) => ({
                ...prevInputs,
                interests: [...prevInputs.interests, interest],
            }));
        }
    };

    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                size='sm'
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <Input
                placeholder='Username'
                fontSize={14}
                type='text'
                size='sm'
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
            <Input
                placeholder='Full Name'
                fontSize={14}
                type='text'
                size='sm'
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
            <InputGroup>
                <Input
                    placeholder='Password'
                    fontSize={14}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    size='sm'
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <InputRightElement h='full'>
                    <Button variant='ghost' size='sm' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {/* Checkboxes for Interests */}
            <Checkbox
                isChecked={inputs.interests.includes("plantingTrees")}
                onChange={() => handleInterestChange("plantingTrees")}
            >
                Planting Trees
            </Checkbox>
            <Checkbox
                isChecked={inputs.interests.includes("beachCleaning")}
                onChange={() => handleInterestChange("beachCleaning")}
            >
                Beach Cleaning
            </Checkbox>
            <Checkbox
                isChecked={inputs.interests.includes("recycling")}
                onChange={() => handleInterestChange("recycling")}
            >
                Recycling
            </Checkbox>
            <Checkbox isChecked={inputs.interests.includes("donation")} onChange={() => handleInterestChange("donation")}>
                Donation
            </Checkbox>

            {error && (
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            <Button
                w='full'
                colorScheme='blue'
                size='sm'
                fontSize={14}
                isLoading={loading}
                onClick={() => signup(inputs)}
            >
                Sign Up
            </Button>
        </>
    );
};

export default Signup;
