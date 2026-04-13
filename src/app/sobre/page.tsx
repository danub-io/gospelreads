export const metadata = {
  title: 'Sobre Nós | GospelReads',
  description: 'Conheça a missão e a equipe por trás do GospelReads.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
      <header className="mb-12 text-center">
        <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-6">Sobre o GospelReads</h1>
        <p className="font-serif text-xl text-muted-foreground leading-relaxed">
          Um jornal digital focado na reflexão cristã profunda, em um mundo de leituras rasas.
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <p>
          No <strong>GospelReads</strong>, acreditamos que a fé cristã exige pensamento, reflexão e prática. Nossa missão é trazer conteúdos que desafiem o intelecto e aqueçam o coração, com uma roupagem editorial premium.
        </p>
        <h2>Nossa Visão</h2>
        <p>
          Queremos ser o principal portal de ensaios e artigos cristãos do Brasil, onde cada texto é tratado como uma obra de arte: bem escrito, bem editado e lindamente apresentado.
        </p>
        <h2>Apoie o Projeto</h2>
        <p>
          O GospelReads é mantido de forma independente. Se você tem sido abençoado pelas nossas publicações, considere apoiar nosso ministério, permitindo que a mensagem continue alcançando milhares de leitores.
        </p>
      </div>
    </div>
  );
}
