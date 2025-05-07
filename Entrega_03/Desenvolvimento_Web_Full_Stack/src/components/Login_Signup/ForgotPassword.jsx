import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { motion } from "framer-motion";
import { SlideRight } from "../../utility/animation";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");
    setErro("");

    if (!validarEmail(email)) {
      setErro("E-mail inválido.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        validator.normalizeEmail(email),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) throw error;

      setMensagem("Link de redefinição enviado para seu e-mail!");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      setErro(error.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-[650px] relative py-14">
      {/* Conteúdo principal */}
      <div className="relative z-10">
        <motion.h1
          variants={SlideRight(0.4)}
          initial="hidden"
          animate="visible"
          className="text-5xl font-semibold lg:text-6xl !leading-tight text-center md:text-left"
        >
          Redefinir Senha
        </motion.h1>

        {/* Formulário */}
        <motion.form
          variants={SlideRight(1.0)}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 max-w-md mx-auto"
        >
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-300"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processando...
                </span>
              ) : (
                "Enviar Link de Redefinição"
              )}
            </button>
          </div>

          {erro && (
            <div className="text-center text-red-600 text-sm mt-4 p-3 bg-red-50 rounded-lg">
              {erro}
            </div>
          )}

          {mensagem && (
            <div className="text-center text-green-600 text-sm mt-4 p-3 bg-green-50 rounded-lg">
              {mensagem}
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            <p>
              Lembrou da senha?{" "}
              <button
                type="button"
                onClick={() => navigate("/Auth")}
                className="text-yellow-600 font-medium hover:underline"
              >
                Faça login
              </button>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ForgotPassword;