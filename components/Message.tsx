import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../config/firebase";
import { IMessage } from "../types";

const StyleMessage = styled.p`
    width: fit-content;
    word-break: break-all;
    max-width: 90%;
    min-width: 30%;
    padding: 15px 15px 30px;
    border-radius: 8px;
    margin: 10px;
    position: relative;
`;

const StyleSenderMessage = styled(StyleMessage)`
    margin-left: auto;
    background-color: #dcf8c6;
`;

const StyleReciveMessage = styled(StyleMessage)`
    background-color: whitesmoke;
`;

const StyleTimestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: x-small;
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
`;

const Message = ({ message }: { message: IMessage }) => {
    const [loggedInUser, _loading, _error] = useAuthState(auth);
    const MessageType =
        loggedInUser?.email === message.user
            ? StyleSenderMessage
            : StyleReciveMessage;
    return (
        <MessageType>
            {message.text}
            <StyleTimestamp>{message.sent_at}</StyleTimestamp>
        </MessageType>
    );
};

export default Message;
