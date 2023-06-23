import React, { useEffect, useState } from "react";
import { bg1, logo } from "../assests";
import { LoginInput } from "../components";
import { motion } from "framer-motion";
import { BsEnvelopeCheckFill, BsGoogle } from "react-icons/bs";
import { BsFillFileLock2Fill } from "react-icons/bs";
import { buttonClick } from "../Animations";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

import {
  //    createUserWithEmailAndPassword,
  //    signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  //   signUpWithEmailPass,
  //   signInWithEmailPass,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { validateUserJWTToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/actions/userActions";
import { alertInfo, alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data || null));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      //alet msg
      dispatch(alertInfo("Required fields should not be ampty"));
    } else {
      if (password === confirm_password) {
        setuserEmail("");
        setconfirm_password("");
        setpassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data || null));
                });
               navigate("login", { replace: true });
              });
            }
          });
        });
      } else {
        //alert msg
        dispatch(alertWarning("password doesn't match"));
      }
    }
  };

  //actions

  //reducer

  //store-> globalized

  //dispatch

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data || null));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      //alert msg
      dispatch(alertWarning("password doesn't match"));
    }
  };

  return (
    <div className="w-screen relative h-screen overflow-hidden flex">
      {/* Background image */}
      <img
        src={bg1}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt="Background"
      />

      <div className="flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-10 p-4 px-4 py-12 gap-6">
        {/* Logo */}
        <div className="flex items-center justify-start gap-4 w-64">
          <img src={logo} className="w-8" alt="Logo" />
          <p className="text-headingColor font-semibold text-2xl">FOODmarket</p>
        </div>

        {/* welcome text */}
        <p className="text-3xl font-semibold tex text-headingColor">
          Welcome Back
        </p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>
        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email Here"}
            icons={<BsEnvelopeCheckFill className=" text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"password Here"}
            icons={<BsFillFileLock2Fill className=" text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setpassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeHolder={"confirm_password Here"}
              icons={
                <BsFillFileLock2Fill className=" text-xl text-textColor" />
              }
              inputState={confirm_password}
              inputStateFunc={setconfirm_password}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn't have an account:{""}
              <motion.button
                {...buttonClick}
                className="text-red-500 underline cursor-pointer bg-transparent"
                onClick={() => setisSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{""}
              <motion.button
                {...buttonClick}
                className="text-red-500 underline cursor-pointer bg-transparent"
                onClick={() => setisSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}
          {/* {butn section} */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              sign In
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={loginWithGoogle}
        >
          <BsGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Signin with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
