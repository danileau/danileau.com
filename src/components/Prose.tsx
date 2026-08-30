import { Fragment, type ReactNode } from "react";
import type { Block } from "@/content/notes";

/** Inline markup, kept deliberately small: **bold**, *italic*, `mono`. */
const inline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <b key={i} className="font-bold text-ink">{part.slice(2, -2)}</b>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code key={i} className="font-mono text-[0.92em] bg-cream-3 px-1.5 py-0.5 rounded break-words">
          {part.slice(1, -1)}
        </code>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });

export const Prose = ({ blocks }: { blocks: Block[] }) => (
  <div>
    {blocks.map((block, i) => {
      switch (block.t) {
        case "h2":
          return (
            <h2 key={i} className="mt-8.8 mb-3.3">
              <span className="block font-mono text-[11px] tracking-widest uppercase text-cherry-dk mb-2.2">
                {block.num}
              </span>
              <span className="font-display text-2xl sm:text-3xl leading-tight">{block.text}</span>
            </h2>
          );

        case "p":
          return (
            <p key={i} className="font-body text-ink-2 leading-relaxed mb-4.4">
              {inline(block.text)}
            </p>
          );

        case "quote":
          return (
            <blockquote
              key={i}
              className="my-5.5 pl-4.4 border-l-4 border-sun font-display text-lg sm:text-xl leading-snug text-ink"
            >
              {inline(block.text)}
            </blockquote>
          );

        case "pull":
          return (
            <div
              key={i}
              className="my-6.6 py-5.5 border-y-3 border-ink text-center font-script text-cherry-dk text-2xl sm:text-3xl leading-snug"
            >
              {block.lines.map((line, j) => (
                <span key={j} className="block">{inline(line)}</span>
              ))}
            </div>
          );

        case "note": {
          const tone =
            block.tone === "warn"
              ? "bg-cherry-wash border-cherry"
              : "bg-mint-wash border-mint-dk";
          const label = block.tone === "warn" ? "text-cherry-dk" : "text-mint-dk";
          return (
            <aside key={i} className={`my-5.5 border-3 rounded-card px-4.4 py-4.4 ${tone}`}>
              <h3 className={`font-mono text-[11px] font-bold tracking-widest uppercase mb-3.3 ${label}`}>
                {block.title}
              </h3>
              {block.paras.map((para, j) => (
                <p key={j} className="font-body text-sm text-ink-2 leading-relaxed mb-2.2 last:mb-0">
                  {inline(para)}
                </p>
              ))}
            </aside>
          );
        }
      }
    })}
  </div>
);

export default Prose;
