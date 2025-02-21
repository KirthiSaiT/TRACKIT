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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select.jsx";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      <div className="w-full max-w-md p-8">
        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              {isLogin ? "Enter your credentials to access your account" : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign-In Button */}
            <Button 
              className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/30 transition-all duration-300"
              variant="outline" 
              onClick={signInWithGoogle}
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
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-violet-400 focus:ring-violet-400"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={isLogin ? loginEmail : registerEmail}
                onChange={(e) => isLogin ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-violet-400 focus:ring-violet-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={isLogin ? loginPassword : registerPassword}
                onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-violet-400 focus:ring-violet-400"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300"
              onClick={isLogin ? loginUser : registerUser}
            >
              {isLogin ? "Sign in" : "Create account"}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm text-gray-300 hover:text-white hover:bg-white/10"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}