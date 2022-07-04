import { initializeApp } from "firebase/app";

const initializeFirebase = () => {
    // const firebaseConfig = {
    //     apiKey: process.env.REACT_APP_API_KEY,
    //     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    //     projectId: process.env.REACT_APP_PROJECT_ID,
    //     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    //     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    //     appId: process.env.REACT_APP_APP_ID,
    // };
    const firebaseConfig = {
        apiKey: "AIzaSyDpxQrDi_PvxR38fwpCCDEYrfKjHiaT4yU",
        authDomain: "bitbrother-task.firebaseapp.com",
        projectId: "bitbrother-task",
        storageBucket: "bitbrother-task.appspot.com",
        messagingSenderId: "255782278849",
        appId: "1:255782278849:web:b7bdd35557de156882e640"
    };


    initializeApp(firebaseConfig);
}

export default initializeFirebase;