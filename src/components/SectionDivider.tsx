export default function SectionDivider({ title }: { title: string }) {
  return (
    <div className="w-full flex items-center pt-16 md:pt-20 pb-6 border-b-2 border-foreground mb-8">
      <h2 className="font-heading font-black tracking-tight text-3xl uppercase text-foreground">{title}</h2>
    </div>
  );
}
