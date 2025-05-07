import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { NavbarMenu } from "../../mockData/data.js";
import { supabase } from "../../../lib/supabaseClient.js";

const ResponsiveMenu = ({ isOpen }) => {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Verifica a sessão atual
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // 2. Busca o nome completo do usuário
          let fullName = "";
          
          // Tenta pegar do perfil na tabela profiles
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .single();
          
          // Se não encontrar no perfil, pega dos metadados de autenticação
          if (profile?.full_name) {
            fullName = profile.full_name;
          } else if (session.user.user_metadata?.full_name) {
            fullName = session.user.user_metadata.full_name;
          } else {
            fullName = session.user.email; // Fallback para email se não tiver nome
          }
          
          // 3. Extrai apenas o primeiro nome
          const first = fullName.split(" ")[0];
          setFirstName(first);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setFirstName(""); // Limpa se houver erro
      }
    };

    fetchUserData();

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          await fetchUserData();
        } else if (event === 'SIGNED_OUT') {
          setFirstName("");
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setFirstName("");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 bg-primary lg:hidden"
        >
          <div className="text-xl font-semibold uppercase py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-6">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  {item.link === "#" ? (
                    <span className="text-gray-400 opacity-50 cursor-not-allowed">
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      to={item.link}
                      className="hover:text-orange-500 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}

              {firstName ? (
                <>
                  <li className="text-orange-500">Olá, {firstName}!</li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-red-500 font-semibold rounded-full px-4 py-2 hover:bg-red-600 transition-colors"
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/auth" 
                      className="hover:text-orange-500 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Entrar
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/auth?mode=signup" 
                      className="text-white bg-orange-500 font-semibold rounded-full px-6 py-2 hover:bg-orange-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Inscreva-se
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;