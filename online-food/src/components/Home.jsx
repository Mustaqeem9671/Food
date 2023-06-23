




import { motion } from "framer-motion";
import React from "react";
import { delivery, heroBg } from "../assests";
import { buttonClick, staggerFadeInOut } from "../Animations";
import { randomData } from "../utils/styles";

const Home = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lg font-semibold text-orange-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img src={delivery} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
        <p className="text-[40px] text-headingColor md:text-[px] font-sans font-extrabold tracking-wider">
          The Fastest Delivery in <span className="text-orange-600">Your City</span>
        </p>
        <p className="text-textColor text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia consequatur provident iure. Delectus
          necessitatibus aspernatur vitae harum aut dolorem vel voluptatum hic libero nesciunt, omnis totam sint rem ab
          sapiente beatae ea, at non eius reprehenderit. Dignissimos, quia ex?
        </p>
        <motion.button
          {...buttonClick}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold"
        >
          Order Now
        </motion.button>
      </div>

      <div className="py-2 flex-1 flex items-center justify-end relative">
        <img
          className="absolute top-0 right-0 md:-right-12 w-full h-96 md:w-auto md:h-auto"
          src={heroBg}
          alt=""
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap justify-center gap-3 gap-y-10">
          {randomData.map((data, i) => (
            <motion.div
              key={data.id}
              {...staggerFadeInOut(i)}
              className="w-1/2 md:w-1/3 p-2 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
            >
              <img
                src={data.imageURL}
                className="w-12 h-12 md:w-32 md:h-32 md:-mt-14 object-contain"
                alt=""
              />
              <p className="text-sm lg:text-xl font-semibold text-textColor">
                {data.product_name.slice(0, 14)}
              </p>
              <p className="text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize">
                {data.product_category}
              </p>
              <p className="text-sm font-semibold text-headingColor">
                <span className="text-xs text-red-600">Rs</span> {data.product_price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;





