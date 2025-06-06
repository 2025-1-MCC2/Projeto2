import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../utility/animation";
import { Link, useNavigate } from "react-router-dom";

const Banner = ({ image, title, subtitle, link, tag, reverse }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simula o estado de autenticação
  const navigate = useNavigate();

  const handleCriativoClick = () => {
    if (isLoggedIn) {
      // Se o usuário estiver logado, redirecione para o Blog
      navigate("/blog");
    } else {
      // Se não estiver logado, redirecione para o Login
      navigate("/auth");
    }
  };

  return (
    <div className="bg-[#f9f9f9] pb-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0">
          {/* banner Image section */}
          <div
            className={`flex justify-start items-center ${
              reverse && "md:order-last md:justify-end"
            }`}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              src={image}
              alt=""
              className="w-[400px] h-full object-cover"
            />
          </div>
          {/* Banner text section */}
          <div className="flex flex-col justify-center text-center md:text-left space-y-4 lg:max-w-[500px]">
            <motion.p
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView={"visible"}
              className="text-sm text-orange-600 font-semibold capitalize"
            >
              {tag}
            </motion.p>
            <motion.p
              variants={SlideUp(0.7)}
              initial="hidden"
              whileInView={"visible"}
              className="text-xl lg:text-2xl font-semibold capitalize "
            >
              {title}
            </motion.p>
            <motion.p
              variants={SlideUp(0.9)}
              initial="hidden"
              whileInView={"visible"}
              className="text-sm text-slate-500"
            >
              {subtitle}
            </motion.p>
            <motion.div
              variants={SlideUp(1.1)}
              initial="hidden"
              whileInView={"visible"}
              className="flex justify-center md:justify-start"
            >
              <Link to={link} className="primary-btn !mt-5" onClick={handleCriativoClick}>
                {tag === "sobre" ? "Saiba mais" : "Quero ser Criativo!"}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;