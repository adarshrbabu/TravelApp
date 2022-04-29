import React, { useState,useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../axiosConfig";
import { Helmet } from "react-helmet";
import axios from "axios";
import { userContext } from "../../App";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();
    const {  updateUserdata } = useContext(userContext);

    const handlesubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${BASE_URL}/auth/register/`, {
                email,
                password,
                first_name: name,
            })
            .then((response) => {
                let data = response.data.data;
                let stauscode = response.data.StatusCode;
                if (stauscode === 6000) {
                    localStorage.setItem("user_data", JSON.stringify(data));
                    updateUserdata({ type: "LOGIN", payload: data });
                    history.push("/");
                } else {
                    setMessage(response.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <>
            <Helmet>
                <title>SignUp-page</title>
            </Helmet>
            <Container>
                <LeftContainer>
                    <HeaderContainer>
                        <Logo
                            src={require("../assets/images/logo.svg").default}
                            alt="Image"
                        />
                    </HeaderContainer>
                    <MainHeading>
                        Travel to the best beautiful place
                    </MainHeading>
                </LeftContainer>
                <RightContainer>
                    <LoginContainer>
                        <LoginHeading>Register into Account</LoginHeading>
                        <LoginInfo>
                            Create an account to acccess all the features
                        </LoginInfo>
                        <Form onSubmit={handlesubmit}>
                            <InputContainer>
                                <TextInput
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    value={name}
                                    type="text"
                                    placeholder="Name"
                                />
                            </InputContainer>
                            <InputContainer>
                                <TextInput
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    type="email"
                                    placeholder="Email"
                                />
                            </InputContainer>
                            <InputContainer>
                                <TextInput
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={[password]}
                                    type="password"
                                    placeholder="Password"
                                />
                            </InputContainer>
                            <LoginButton to="/auth/login/">
                                Login Now
                            </LoginButton>
                            {message && <ErrorMessage>{message}</ErrorMessage>}

                            <ButtonContainer>
                                <SubmitButton>Create an Account</SubmitButton>
                            </ButtonContainer>
                        </Form>
                    </LoginContainer>
                </RightContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    padding: 15px;
    @media all and (max-width: 980px) {
        flex-direction: column;
    }
`;
const LeftContainer = styled.div`
    width: 55%;
    padding: 40px 70px 70px;
    @media all and (max-width: 980px) {
        width: 100%;
    }
    @media all and (max-width: 480px){
        padding: 10px 35px

    }
`;
const HeaderContainer = styled.div``;
const Logo = styled.img``;
const MainHeading = styled.h1`
    font-size: 80px;
    color: #090e5e;
    margin-top: 300px;
    line-height: 1.4em;
    @media all and (max-width: 1080px) {
        font-size: 63px;
    }
    @media all and (max-width: 980px) {
        margin-top: 10px;
    }
    @media all and (max-width: 768px) {
        font-size: 52px;
    }
    @media all and (max-width: 480px) {
        font-size:45px ;
        margin-bottom: 10px;

    }
    @media all and (max-width: 360px){
        font-size: 45px;
    }
    @media all and (max-width: 320px){
        font-size: 31px;
    }
`;
const RightContainer = styled.div`
    background: #efefef;
    width: 45%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-radius: 20px;
    padding: 0 70px 70px;
    @media all and (max-width: 980px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        padding: 0px 20px;
    }
    @media all and (max-width: 360px) {
        padding: 0px 20px;
    }
`;
const LoginContainer = styled.div`
    padding-bottom: 70px;
    border-bottom: 1px solid #fff;
    width: 100%;
    @media all and (max-width: 980px) {
        text-align: center;
        margin-top: 10px;
    }
`;
const LoginHeading = styled.h3`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
`;
const LoginInfo = styled.p`
    font-size: 18px;
    margin-bottom: 35px;
    @media all and (max-width: 980px) {
        text-align: center;
    }
`;
const Form = styled.form`
    width: 100%;
    display: block;
`;
const InputContainer = styled.div`
    margin-bottom: 15px;
    position: relative;
`;
const TextInput = styled.input`
    padding: 20px 25px 20px 30px;
    width: 100%;
    display: block;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
`;

const LoginButton = styled(Link)`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 25px;
    color: #046bf6;
    font-size: 20px;
`;
const SubmitButton = styled.button`
    background: #046bf6;
    border: 0;
    outline: 0;
    color: #fff;
    padding: 25px 40px;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    @media all and (max-width: 640px) {
        padding: 21px 60px;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const ErrorMessage = styled.p`
    font-size: 17px;
    color: red;
    margin-bottom: 25px;
    text-align: center;
`;
