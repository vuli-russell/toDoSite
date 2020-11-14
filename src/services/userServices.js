import firebase, { providers } from "../services/firebase";

export const signIn = () => {
    firebase.auth().signInWithRedirect(providers.google)
}

export const signOut = () => {
    firebase.auth().signOut()
}
