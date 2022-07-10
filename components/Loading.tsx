import styled from "styled-components";
import Image from "next/image";
import WhatsAppLogo from "../assets/img/Whatsapp_logo.png";
import CircularProgress from "@mui/material/CircularProgress";

const StyleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const StyleImageWrapper = styled.div`
    margin-bottom: 50px;
`;

const Loading = () => {
    return (
        <StyleContainer>
            <StyleImageWrapper>
                <Image
                    src={WhatsAppLogo}
                    alt="Whatsapp Logo"
                    height="200px"
                    width="200px"
                />
            </StyleImageWrapper>

            <CircularProgress />
        </StyleContainer>
    );
};

export default Loading;
