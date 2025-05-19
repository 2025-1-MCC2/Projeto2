import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../../../lib/supabaseClient";
import { motion } from "framer-motion";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [userType, setUserType] = useState("pessoa_fisica");

  // Carrega os dados do perfil ao montar o componente
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Busca os dados do perfil na tabela profiles
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('full_name, bio, avatar_url, user_type')
            .eq('id', user.id)
            .single();

          if (!error && profile) {
            setName(profile.full_name || "");
            setBio(profile.bio || "");
            setAvatarUrl(profile.avatar_url || "");
            setUserType(profile.user_type || "pessoa_fisica");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      let avatarPath = avatarUrl;
      
      // Upload da nova imagem se houver
      if (previewImage) {
        const file = await fetch(previewImage).then(r => r.blob());
        const fileExt = file.type.split('/')[1];
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Remove a imagem antiga se existir
        if (avatarUrl) {
          const oldFileName = avatarUrl.split('/').pop();
          await supabase.storage
            .from('avatars')
            .remove([`avatars/${oldFileName}`]);
        }

        // Obtém a URL pública da nova imagem
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatarPath = publicUrl;
      }

      // Atualiza o perfil no Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: name,
          bio: bio,
          avatar_url: avatarPath,
          user_type: userType,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Atualiza os dados do usuário (se necessário)
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: name }
      });

      if (authError) throw authError;

      alert("Perfil atualizado com sucesso!");
      setAvatarUrl(avatarPath); // Atualiza a URL da imagem no estado
      setPreviewImage(null); // Limpa o preview
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert(`Erro ao atualizar perfil: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Configurações do Perfil</h2>
      
      {loading && !name ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Foto de Perfil */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={previewImage || avatarUrl || "/default-avatar.png"}
                alt="Foto de perfil"
                className="h-32 w-32 rounded-full object-cover border-4 border-yellow-100"
              />
              {previewImage && (
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ✕
                </button>
              )}
            </div>
            
            <div
              {...getRootProps()}
              className="px-4 py-2 bg-yellow-50 text-yellow-800 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
            >
              <input {...getInputProps()} />
              <p className="text-center">
                {previewImage ? "Trocar imagem" : "Alterar foto"}
              </p>
            </div>
          </div>

          {/* Campo de Nome */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>

          {/* Campo de Bio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              rows="4"
              placeholder="Conte um pouco sobre você..."
            />
          </div>

          {/* Tipo de Usuário */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Usuário
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="pessoa_fisica">Pessoa Física</option>
              <option value="colaborador">Colaborador</option>
              <option value="voluntario">Voluntário</option>
              <option value="desenvolvedor">Desenvolvedor</option>
            </select>
          </div>

          {/* Botão de Envio */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ProfileSettings;