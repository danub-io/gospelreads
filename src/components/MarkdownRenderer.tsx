import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => <h2 className="font-heading font-black" {...props} />,
          h3: ({ node, ...props }) => <h3 className="font-heading font-bold" {...props} />,
          a: ({ node, ...props }) => <a className="text-brand hover:border-b-2 hover:border-brand transition-all" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
