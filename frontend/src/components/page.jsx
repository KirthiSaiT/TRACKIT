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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card.jsx";
import { Label } from "./ui/label.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";

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
  const [isLogin, setIsLogin] = useState(true);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Register User
  const registerUser = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: registerName })
          .then(() => {
            setSuccessMessage("Registration Successful!");
            setTimeout(() => setSuccessMessage(""), 3000);
          })
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Login User
  const loginUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        setSuccessMessage("Login Successful!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Google Sign-In
  const signInWithGoogle = () => {
    setLoading(true);
    auth.languageCode = "en";
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then(() => {
        setSuccessMessage("Google Login Successful!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        if (error.code === "auth/unauthorized-domain") {
          setError("Error: Unauthorized domain. Please add your domain to Firebase Authentication settings.");
        } else {
          setError(error.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <div className="w-full max-w-md p-8">
        <Card className="bg-zinc-900/50 border border-zinc-800 shadow-xl">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-bold text-white text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              {isLogin ? "Enter your credentials to access your account" : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-2 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-sm text-center">
                {successMessage}
              </div>
            )}

            {/* Google Sign-In Button */}
            <Button 
              className="w-full bg-zinc-800/50 text-white hover:bg-zinc-800 border border-zinc-700"
              variant="outline" 
              onClick={signInWithGoogle}
              disabled={loading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900/50 px-2 text-zinc-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={isLogin ? loginEmail : registerEmail}
                onChange={(e) => isLogin ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-400">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={isLogin ? loginPassword : registerPassword}
                onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={isLogin ? loginUser : registerUser}
              disabled={loading}
            >
              {loading ? "Loading..." : (isLogin ? "Sign in" : "Create account")}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccessMessage("");
              }}
              disabled={loading}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}