import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30 pt-12 pb-8 mt-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h3 className="font-heading font-black text-2xl mb-4 text-foreground">GOSPEL<span className="text-brand">READS</span></h3>
            <p className="text-muted-foreground font-serif text-sm px-4 md:px-0">
              Conteúdo transformador, análises profundas e reflexões que edificam. 
              O seu jornal digital diário de esperança.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-foreground">Sessões</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-sans">
              <li><Link href="/" className="hover:text-brand transition-colors">Artigos</Link></li>
              <li><Link href="/autores" className="hover:text-brand transition-colors">Autores</Link></li>
              <li><Link href="/livros" className="hover:text-brand transition-colors">Livros</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-foreground">Institucional</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-sans">
              <li><Link href="/sobre" className="hover:text-brand transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-brand transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground font-sans">
          <p>© {new Date().getFullYear()} GospelReads. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacidade" className="hover:text-foreground">Privacidade</Link>
            <Link href="/termos" className="hover:text-foreground">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
