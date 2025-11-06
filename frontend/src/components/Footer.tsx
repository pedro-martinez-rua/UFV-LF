const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#contacto" className="text-primary hover:underline transition-smooth">
            Contacto
          </a>
          <a href="#privacidad" className="text-primary hover:underline transition-smooth">
            Política de privacidad
          </a>
          <a href="#terminos" className="text-primary hover:underline transition-smooth">
            Términos y condiciones
          </a>
          <a href="#sobre-ufv" className="text-primary hover:underline transition-smooth">
            Sobre la UFV
          </a>
          <a href="#quienes-somos" className="text-primary hover:underline transition-smooth">
            Quiénes somos
          </a>
        </div>
        <div className="text-center mt-4 text-xs text-muted-foreground">
          © 2025 Universidad Francisco de Vitoria. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
