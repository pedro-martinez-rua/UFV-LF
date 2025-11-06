const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#contacto" className="text-primary hover:underline transition-smooth">
            Contact
          </a>
          <a href="#privacidad" className="text-primary hover:underline transition-smooth">
            Privacy Policy
          </a>
          <a href="#terminos" className="text-primary hover:underline transition-smooth">
            Terms and Conditions
          </a>
          <a href="#sobre-ufv" className="text-primary hover:underline transition-smooth">
            About UFV
          </a>
          <a href="#quienes-somos" className="text-primary hover:underline transition-smooth">
            Who we are
          </a>
        </div>
        <div className="text-center mt-4 text-xs text-muted-foreground">
          © 2025 UFV L&F. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
