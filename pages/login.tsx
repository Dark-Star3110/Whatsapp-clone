import Button from "@mui/material/Button";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

import WhatsAppLogo from "../assets/img/Whatsapp_logo.png";

const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;
`;

const StyleLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

const StyleImageWrapper = styled.div`
    margin-bottom: 50px;
`;

const Login = () => {
    const [signInWithGoogle, _user, _loading, _error] =
        useSignInWithGoogle(auth);

    const signIn = () => {
        signInWithGoogle();
    };
    return (
        <StyledContainer>
            <Head>
                <title>Login</title>
            </Head>
            <StyleLoginContainer>
                <StyleImageWrapper>
                    <Image
                        src={WhatsAppLogo}
                        alt="Whatsapp Logo"
                        height="200px"
                        width="200px"
                    />
                </StyleImageWrapper>

                <Button variant="outlined" onClick={signIn}>
                    Login with Google
                </Button>
            </StyleLoginContainer>
        </StyledContainer>
    );
};

export default Login;
