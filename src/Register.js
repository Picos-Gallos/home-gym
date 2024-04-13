import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("User registered: ", user);
        navigate("/survey");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              var user = userCredential.user;
              console.log("User logged in: ", user);
              navigate("/table");
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("Error: ", errorCode, errorMessage);
            });
        } else if (error.code === "auth/weak-password") {
          setError("Password too weak");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email");
        } else if (error.code === "auth/user-not-found") {
          setError("User not found");
        } else if (error.code === "auth/wrong-password") {
          setError("Wrong password");
        } else if (error.code === "auth/invalid-credential") {
          setError("Invalid credential");
        }
      });
  };

  return (
    <>
      <div className="login">
        <h1>Register</h1>
        <form onSubmit={register}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default Register;