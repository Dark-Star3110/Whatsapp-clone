import "../styles/globals.css";
import type { AppProps } from "next/app";
import Login from "./login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Loading from "../components/Loading";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    let [loggerInUser, loading, _error] = useAuthState(auth);

    useEffect(() => {
        const setUserInDb = async () => {
            try {
                await setDoc(
                    doc(db, "users", loggerInUser?.email as string),
                    {
                        email: loggerInUser?.email,
                        lastSeen: serverTimestamp(),
                        photoURL: loggerInUser?.photoURL,
                    },
                    { merge: true } // merge voi cung email => ghi de timestamp
                );
            } catch (error) {
                console.log("ERROR SETTING USER IN DB", error);
            }
        };
        if (loggerInUser) {
            setUserInDb();
        }
    }, [loggerInUser]);

    if (loading) {
        return <Loading />;
    }
    if (!loggerInUser) {
        return <Login />;
    }
    return <Component {...pageProps} />;
}

export default MyApp;
