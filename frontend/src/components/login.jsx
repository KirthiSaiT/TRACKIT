import { useState } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  updateProfile 
} from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBSxyB1FU-YHZ69ZkAowvj5ECzBf1UfEH8",
  authDomain: "track-it-d9793.firebaseapp.com",
  projectId: "track-it-d9793",
  storageBucket: "track-it-d9793.appspot.com",
  messagingSenderId: "504320129720",
  appId: "1:504320129720:web:9e7d4fcf98eabc7a84524d",
  measurementId: "G-XXF0VYQSPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function FirebaseAuth() {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register User
  const registerUser = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: registerName })
          .then(() => alert("Registration Successful!"))
          .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
  };

  // Login User
  const loginUser = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => alert("Login Successful!"))
      .catch((error) => alert(error.message));
  };

  // Google Sign-In
  const signInWithGoogle = () => {
    auth.languageCode = "en";
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then(() => alert("Google Login Successful!"))
      .catch((error) => {
        if (error.code === "auth/unauthorized-domain") {
          alert("Error: Unauthorized domain. Please add your domain to Firebase Authentication settings.");
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">Firebase Authentication</h2>

        {/* Register Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Register</h3>
          <input type="text" placeholder="Full Name" className="input-style" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
          <input type="email" placeholder="Email" className="input-style" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input-style" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <button className="btn-primary" onClick={registerUser}>Register</button>
        </div>

        {/* Login Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Login</h3>
          <input type="email" placeholder="Email" className="input-style" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input-style" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          <button className="btn-primary" onClick={loginUser}>Login</button>
        </div>

        {/* Google Sign-In */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Google Sign-In</h3>
          <button className="btn-google" onClick={signInWithGoogle}>Login with Google</button>
        </div>
      </div>
    </div>
  );
}

// Tailwind Utility Classes
const styles = `
  .input-style {
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
    transition: border 0.2s ease-in-out;
  }
  .input-style:focus {
    border-color: #007bff;
  }
  .btn-primary {
    width: 100%;
    background-color: #007bff;
    color: white;
    padding: 10px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }
  .btn-primary:hover {
    background-color: #0056b3;
  }
  .btn-google {
    width: 100%;
    background-color: #ea4335;
    color: white;
    padding: 10px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }
  .btn-google:hover {
    background-color: #c1351d;
  }
`;

// Inject Tailwind Styles
export const addStyles = () => {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
};

addStyles();
