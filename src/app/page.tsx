'use client'
import { useState, useRef } from "react";
import Head from "next/head";
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Importando ícones de redes sociais

export default function VerifyPhone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState<null | boolean>(null);
  const recaptchaRef = useRef<any>(null);

  // Link do grupo no WhatsApp
  const whatsappGroupLink = "https://chat.whatsapp.com/SEU_LINK_DO_GRUPO";

  // Função de validação para números brasileiros
  const validatePhoneNumber = (number: string) => {
    const brazilianPhonePattern = /^(\d{2})\d{9}$/;
    return brazilianPhonePattern.test(number);
  };

  // Função de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      setIsVerified(false);
      return;
    }

    // Ativa o reCAPTCHA invisível
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      setIsVerified(true);
      setTimeout(() => {
        window.location.href = whatsappGroupLink;
      }, 1000);
    } else {
      setIsVerified(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/46.png')" }}>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js?render=6LckrHoqAAAAAHjHmfjO8id7lwkVhcPwj6ejFVlW" async defer></script>
      </Head>

      <div className="p-8 w-full max-w-lg bg-white text-[#B22D00] rounded-lg shadow-2xl border-2 border-[#B22D00]">
        <h2 className="text-center text-3xl font-bold mb-4">Verifique seu número</h2>
        <p className="text-center text-lg text-gray-600 mb-6">
          Verifique seu número para entrar na comunidade FullDev!
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Número de telefone</label>
            <p className="text-sm text-gray-500 mb-4">Digite seu número de celular no formato: +55 (XX) 9XXXX-XXXX</p>
            <div className="flex mb-6">
              <span className="inline-flex items-center px-4 text-lg bg-[#B22D00] text-white border border-r-0 rounded-l-md">
                +55
              </span>
              <input
                type="tel"
                placeholder="Ex: 11987654321"
                className="block w-full py-3 px-4 text-lg rounded-r-md border border-gray-300 focus:border-[#B22D00] focus:ring-[#B22D00]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          {isVerified === false && (
            <p className="text-red-500 text-lg mt-2">Número inválido. Tente novamente.</p>
          )}
          {isVerified === true && (
            <p className="text-green-500 text-lg mt-2">Número autenticado com sucesso!</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#B22D00] text-white font-semibold py-3 mt-4 rounded-lg hover:bg-[#8f1c00] transition duration-200 text-xl"
          >
            Entrar
          </button>
        </form>

        <div className="flex justify-center mt-6 space-x-6">
          {/* Ícones de redes sociais */}
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} className="text-[#25D366]" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} className="text-[#1877F2]" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} className="text-[#1DA1F2]" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} className="text-[#C13584]" />
          </a>
        </div>

        <p className="text-center text-md text-gray-500 mt-6">By Devs, For Devs</p>
      </div>

      {/* reCAPTCHA invisível */}
      <div
        className="g-recaptcha"
        data-sitekey="6LckrHoqAAAAAHjHmfjO8id7lwkVhcPwj6ejFVlW"
        data-callback="onReCAPTCHAChange"
        ref={recaptchaRef}
        data-size="invisible"
      ></div>
    </div>
  );
}
