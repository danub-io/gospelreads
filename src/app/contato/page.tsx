export const metadata = {
  title: 'Contato | GospelReads',
  description: 'Entre em contato com a equipe do GospelReads.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-2xl">
      <header className="mb-12 text-center">
        <h1 className="font-heading font-black text-4xl md:text-5xl mb-6">Fale Conosco</h1>
        <p className="font-serif text-xl text-muted-foreground leading-relaxed">
          Dúvidas, parcerias ou apoio ao ministério? Mande-nos uma mensagem.
        </p>
      </header>

      <form className="space-y-6 mt-8">
        <div>
          <label htmlFor="name" className="block text-sm font-sans font-semibold mb-2">Nome</label>
          <input type="text" id="name" className="w-full border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand font-sans" placeholder="Seu nome" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-sans font-semibold mb-2">E-mail</label>
          <input type="email" id="email" className="w-full border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand font-sans" placeholder="seu@email.com" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-sans font-semibold mb-2">Mensagem</label>
          <textarea id="message" rows={5} className="w-full border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand font-sans" placeholder="Como podemos ajudar?"></textarea>
        </div>
        <button type="button" className="w-full bg-brand hover:bg-foreground transition-colors text-white font-sans font-bold py-4 rounded-md uppercase tracking-wider">
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}
