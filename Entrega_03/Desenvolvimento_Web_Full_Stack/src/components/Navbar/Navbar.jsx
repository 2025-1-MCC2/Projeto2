import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarMenu } from "../../mockData/data.js";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import instituto_criativo_logo from "../../assets/instituto_criativo_logo.png";
import { supabase } from "../../../lib/supabaseClient.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");

  // Verifica e monitora o estado de autenticação
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // 1. Verifica a sessão atual
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    const fetchUserProfile = async (user) => {
      try {
        // 1. Tenta pegar da tabela profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', user.id)
          .single();
    
        if (profileError && profileError.code !== 'PGRST116') throw profileError;
    
        // 2. Define o nome com fallbacks inteligentes
        let displayName = "";
        
        if (profile?.full_name) {
          displayName = profile.full_name;
        } else if (user.user_metadata?.full_name) {
          displayName = user.user_metadata.full_name;
        } else {
          // Fallback: pega a parte antes do @ no email
          displayName = user.email.split('@')[0];
        }
    
        // 3. Extrai apenas o primeiro nome
        const first = displayName.split(" ")[0];
        setFirstName(first || "Usuário"); // Fallback final
    
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        setFirstName(user?.email?.split('@')[0] || "Usuário");
      }
    };

    checkAuthState();

    // Configura listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user);
        } else if (event === 'SIGNED_OUT') {
          setFirstName("");
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setFirstName("");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="container flex justify-between items-center py-6">
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <Link to="/">
              <img
                src={instituto_criativo_logo}
                alt="Instituto Criativo Logo"
                className="w-10 h-10"
              />
            </Link>
            <Link to="/">
              <p>Instituto Criativo</p>
            </Link>
          </div>

          {/* Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  {item.link === "#" ? (
                    <span className="inline-block text-gray-400 text-sm xl:text-base py-1 px-2 xl:px-3 font-semibold cursor-not-allowed opacity-50">
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      to={item.link}
                      className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-secondary transition-all duration-300 font-semibold"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button section */}
          <div className="hidden lg:block space-x-6">
            {firstName ? (
              <div className="flex items-center gap-4">
                <span className="text-secondary font-semibold">Olá, {firstName}!</span>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 font-semibold rounded-full px-4 py-2 hover:bg-red-600 transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <button className="font-semibold hover:text-secondary transition-colors">
                    Entrar
                  </button>
                </Link>
                <Link to="/auth?mode=signup">
                  <button className="text-white bg-secondary font-semibold rounded-full px-6 py-2 hover:bg-secondary-dark transition-colors">
                    Inscreva-se
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl cursor-pointer hover:text-secondary transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar section */}
      <ResponsiveMenu isOpen={isOpen} />
    </>
  );
};

export default Navbar;