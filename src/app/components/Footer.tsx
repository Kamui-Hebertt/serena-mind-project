export default function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 mt-8 shadow-inner border-t border-gray-300 dark:border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-semibold">Mente Serena - Apoio Psicológico</p>
          <p className="text-sm mt-2">Atendimento gratuito para quem precisa</p>
  
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              Instagram
            </a>
          </div>
  
          <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Mente Serena. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    );
  }
  