import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ConversationScreen from "../../components/ConversationScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../config/firebase";
import { Conversation, IMessage } from "../../types";
import {
    generateQueryGetMessages,
    transformMessage,
} from "../../utils/getMessagesInConversation";

interface Props {
    conversation: Conversation;
    messages: IMessage[];
}

const StyleContainer = styled.div`
    display: flex;
`;

const StyleConversationContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const Conversation = ({ conversation, messages }: Props) => {
    const [loggedInUser, _loading, _error] = useAuthState(auth);
    return (
        <StyleContainer>
            <Head>
                <title>Conversation with {conversation.users}</title>
            </Head>
            <Sidebar />
            <StyleConversationContainer>
                <ConversationScreen
                    conversation={conversation}
                    messages={messages}
                />
            </StyleConversationContainer>
            {/* {messages.map((message) => (
                <h1 key={message.id}>{message.text}</h1>
            ))} */}
        </StyleContainer>
    );
};

export default Conversation;

// serverside
export const getServerSideProps: GetServerSideProps<
    Props,
    { id: string }
> = async (context) => {
    const conversationId = context.params?.id;

    // get anybody chatting
    const conversationRef = doc(db, "conversations", conversationId as string);
    const conversationSnapshot = await getDoc(conversationRef);

    // get all message between 2 body
    const queryMessages = generateQueryGetMessages(conversationId);

    const messagesSnapshot = await getDocs(queryMessages);
    const messages = messagesSnapshot.docs.map((messageDoc) =>
        transformMessage(messageDoc)
    );

    return {
        props: {
            conversation: conversationSnapshot.data() as Conversation,
            messages,
        },
    };
};
