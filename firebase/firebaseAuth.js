import { app } from '@/firebase/firebaseConfig'
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import  jwt  from 'jsonwebtoken';

const provider = new GithubAuthProvider();
const auth = getAuth(app);

export const firebaseAuth= {

     signInWithGithub : async () => {
        try{
        const response= await signInWithPopup(auth, provider)
                sessionStorage.setItem('Token', response.user.accessToken)
                window.location.reload()
                return (response.user)
        } catch (err){
                alert('You are already loggedin')
     }},
        
    logout : async () => {
        sessionStorage.removeItem('Token')
        },

    decrypt : ( token )=> {
        try {
            const decoded = jwt.decode(token);
            return decoded
          } catch (error) {
            console.error('Error decoding token:', error);
            alert("Somethig went wrong!!")
          }
    },
}