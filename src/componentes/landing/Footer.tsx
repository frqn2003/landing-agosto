const Footer = () => {
  return (
    <footer className="w-full bg-(--rojo-ucasal) text-white flex flex-col items-center py-6" role="contentinfo">
      <div className="contenedor w-full flex flex-col items-center">
        
        {/* Logo Centrado */}
        <div className="mb-4">
          <a href="#inicio" className="inline-block transition-transform hover:scale-105">
            <img 
              src={`${import.meta.env.BASE_URL}ucasal-color-h.svg`}
              alt="UCASAL" 
              className="h-10 w-auto brightness-0 invert" 
            />
          </a>
        </div>

        {/* Línea Divisoria separadora */}
        <div className="w-full border-t border-white/50 mb-3"></div>

        {/* Copyright */}
        <p className="text-[11px] md:text-xs font-semibold tracking-wide text-center opacity-90">
          &copy; {new Date().getFullYear()} UCASAL. Construí tu historia.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
