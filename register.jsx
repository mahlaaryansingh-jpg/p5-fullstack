
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { auth, db } from "../firebase";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");

    if (name.trim().split(/\s+/).length < 2) {
      setMessage("Please enter your first and last name.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name.trim()
      });

      await setDoc(doc(db, "users", result.user.uid), {
        fullName: name.trim(),
        email: email,
        createdAt: serverTimestamp()
      });

      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered. Please log in.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setMessage("Please choose a stronger password.");
      } else if (error.code === "permission-denied") {
        setMessage("Unable to save your details. Check Firestore rules.");
      } else {
        setMessage("Registration failed: " + error.code);
      }
    }
  }

  return (
    <main className="auth-page">
      <section className="register-box">
        <h2>Create a DEV@Deakin Account</h2>

        <form onSubmit={handleRegister}>
          <label htmlFor="register-name">Name*</label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="register-email">Email*</label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="register-password">Password*</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />

          <label htmlFor="confirm-password">Confirm password*</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          <button className="blue-button" type="submit">
            Create
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <p className="back-to-login">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
