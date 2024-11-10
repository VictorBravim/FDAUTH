'use client'
import { useState } from "react";

export default function VerifyPhone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState<null | boolean>(null);

  // Link do grupo no WhatsApp
  const whatsappGroupLink = "https://chat.whatsapp.com/SEU_LINK_DO_GRUPO";

  // Função de validação para números brasileiros
  const validatePhoneNumber = (number: string) => {
    const brazilianPhonePattern = /^(\d{2})\d{9}$/;
    return brazilianPhonePattern.test(number);
  };

  // Função de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhoneNumber(phoneNumber)) {
      setIsVerified(true);
      setTimeout(() => {
        window.location.href = whatsappGroupLink;
      }, 1000); // Redireciona para o WhatsApp após 1 segundo
    } else {
      setIsVerified(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="p-8 w-full max-w-md bg-[#441100] text-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">Verifique seu número</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">Número de telefone</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm bg-[#5a1b00] border border-r-0 border-gray-500 rounded-l-md">
              +55
            </span>
            <input
              type="tel"
              placeholder="Ex: 11987654321"
              className="block w-full p-2 rounded-r-md border border-gray-500 text-[#441100] focus:border-[#5a1b00] focus:ring-[#5a1b00]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          {isVerified === false && (
            <p className="text-red-500 text-sm mt-2">Número inválido. Tente novamente.</p>
          )}
          {isVerified === true && (
            <p className="text-green-500 text-sm mt-2">Número autenticado com sucesso!</p>
          )}
          <button
            type="submit"
            className="w-full bg-white text-[#441100] font-semibold py-2 mt-4 rounded hover:bg-[#5a1b00] hover:text-white transition duration-200"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}