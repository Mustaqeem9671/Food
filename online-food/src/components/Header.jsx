import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { avatar, logo } from "../assests";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../Animations";
import { BsFillCartDashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { BsBoxArrowInRight } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";
import { setCartOn } from "../context/actions/displayCartAction";
import Services from "./Services";


const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isMenu, setisMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleCartClick = () => {
    dispatch(setCartOn()); // Dispatch the setCartOn action when the cart is clicked
  };

  return (
    <header className="f fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">FOODmarket</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
            {/* <Services /> */}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>
        <motion.div {...buttonClick} 
        onClick={handleCartClick}
        // onClick={() => dispatch(setCartOn)}
         className="relative cursor-pointer">
          <BsFillCartDashFill className=" text-3xl text-textColor " />
          {cart?.length > 0 && (
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
            <p className="text-primary text-base font-semibold">{cart?.length}
            </p>
          </div>
          )}
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setisMenu(true)}
            >
              <div
                className=" w-12 h-12 rounded-full shadow-md 
                               cursor-pointer overflow-hidden flex items-center justify-center "
              >
                <motion.img
                  className=" w-full h-full object-cover"
                  src={user?.picture ? user?.picture : avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy=" no-referrer"
                />
              </div>
              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setisMenu(false)}
                  className=" px-6 py-4 w-48 bg-cardOverlay backdrop-blur-md 
                          rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
                >
                  {user?.user_id === process.env.REACT_APP_AADMIN_ID && (

                  <Link
                    className="h hover:text-red-500 text-xl text-textColor"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                  )}

                  <Link
                    className="h hover:text-red-500 text-xl text-textColor"
                    to={"/dashboard/home"}
                  >
                    My Profile
                  </Link>

                  <Link
                    className="h hover:text-red-500 text-xl text-textColor"
                    to={"/dashboard/home"}
                  >
                    Orders
                  </Link>
                  <hr />

                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-3 
                       py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap3"
                  >
                    <BsBoxArrowInRight className="text-2xl text-textColor g group-hover::text-headingColor " />
                    <p className=" text-textColor text-xl group-hover:text-headingColor">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...onclick}
                className="d px-4 py-2 rounded-md shadow-md bg-cardOverlay border-red-300 cursor-pointer "
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
