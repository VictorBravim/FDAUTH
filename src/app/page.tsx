'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import ReCAPTCHA from 'react-google-recaptcha';

export default function VerifyPhone() {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState<null | boolean>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const whatsappGroupLink = 'https://chat.whatsapp.com/ChrXjnNn3Xh1gTikrYyjAs';

  const validatePhoneNumber = (code: string, number: string) => {
    const phonePattern = /^\d{1,4}$/; // Código do país deve ter de 1 a 4 dígitos
    const numberPattern = /^\d{7,12}$/; // Número deve ter entre 7 e 12 dígitos
    return phonePattern.test(code) && numberPattern.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(countryCode, phoneNumber)) {
      setIsVerified(false);
      return;
    }

    const token = await recaptchaRef.current?.executeAsync();
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
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Banner.webp')" }}
    >
      <Head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>

      <div className="p-8 w-full max-w-lg bg-white text-[#B22D00] rounded-lg shadow-2xl border-2 border-[#B22D00]">
        <h2 className="text-center text-3xl font-bold mb-4">Verifique seu número</h2>
        <p className="text-center text-lg text-gray-500 mb-6">
          Verifique seu número para entrar na comunidade FullDev!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Número de telefone</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="DDD"
                className="w-1/4 py-3 px-4 text-lg rounded-md border border-gray-300 focus:border-[#B22D00] focus:ring-[#B22D00]"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Número de telefone"
                className="w-3/4 py-3 px-4 text-lg rounded-md border border-gray-300 focus:border-[#B22D00] focus:ring-[#B22D00]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Digite o código do país e o número. Exemplo: +55 11987654321
            </p>
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

        <div className="flex space-x-4 justify-center mt-4">
          <a
            href="https://www.instagram.com/comunidadefulldev/?igsh=MnVjOW03NW4wOHFp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Instagram.png"
              alt="Instagram"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.linkedin.com/groups/9899811/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/linkedin.png"
              alt="LinkedIn"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://discord.gg/gzZCp5V2wQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Discord.png"
              alt="Discord"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://github.com/ComunidadeFullDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Github.png"
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.tiktok.com/@comunidadefulldev?_t=8r5kwpTwm4j&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Tiktok.png"
              alt="TikTok"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.youtube.com/@comunidadefulldev?si=_vgknvDpcDwAMGTk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Youtube.png"
              alt="YouTube"
              className="w-8 h-8"
            />
          </a>
        </div>


        <p className="text-center text-md text-gray-500 mt-6">By Devs, For Devs</p>
      </div>

      <ReCAPTCHA
        sitekey="6LckrHoqAAAAAHjHmfjO8id7lwkVhcPwj6ejFVlW"
        size="invisible"
        ref={recaptchaRef}
      />
    </div>
  );
}