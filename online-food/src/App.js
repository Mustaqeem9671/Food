import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "./containers";
import Main from "./containers/Main";
import { app } from "./config/firebase.config";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./Animations";
import { MainLoader } from "./components";
import { Alert } from "./components";
import { setCartItems } from "./context/actions/cartActions";
import { CheckOutSuccess } from "./components";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isloading, setisloading] = useState(false);
const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setisloading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data || null));

          });
        });
      }
      setInterval(() => {
        setisloading(false);
      },3000);
    });
  },[ dispatch, firebaseAuth ]);

  return (
    <div className="w-screen min-h-screen h-screen flex items-center justify-center overflow-x-hidden">
     {isloading && (
      <motion.div {...fadeInOut} className="fixed inset-0 z-50 bg-cardOverlay backdrop-blur-md flex items-center justify-center w-full">
        <MainLoader/>
      </motion.div>
     )}
     
      <Routes>
      
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
     
      </Routes>

    {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;



