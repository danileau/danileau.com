import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/use-i18n";
import { useNotes } from "@/content/use-notes";

const Notes = () => {
  const { c } = useI18n();
  const notes = useNotes();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground plate">
      <Navigation />

      <main className="container px-5.5 py-8.8 flex-1 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-2 hover:text-cherry-dk transition-colors mb-5.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {c.notes.back}
        </Link>

        <div className="flex items-center gap-4.4 flex-wrap mb-2.2">
          <span className="font-mono text-xs tracking-widest uppercase text-ink-3">{c.notes.kicker}</span>
          <span className="flex-1 min-w-10 h-1.5 bg-chrome border-y border-chrome-dk" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-2.2">{c.notes.title}</h1>
        <p className="font-body text-ink-2 max-w-[58ch] mb-6.6">{c.notes.note}</p>

        <div className="grid gap-5.5 md:grid-cols-2">
          {notes.map((note) => (
            <Link
              key={note.slug}
              to={`/notes/${note.slug}`}
              className="ticket shadow-stamp border-3 border-ink rounded-card bg-porcelain px-4.4 pt-5.5 pb-4.4 flex flex-col group"
            >
              <div className="flex items-baseline justify-between gap-2.2 font-mono text-xs text-ink-3">
                <span className="font-bold text-ink">#{note.no}</span>
                <span>{note.date}</span>
              </div>
              <h2 className="font-script text-3xl text-cherry-dk leading-none mt-3.3 mb-2.2">{note.title}</h2>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-3 mb-3.3">{note.topic}</p>
              <p className="font-body text-sm text-ink-2 leading-relaxed">{note.standfirst}</p>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cherry-dk mt-4.4">
                {c.notes.read}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="mt-auto pt-4.4">
                <div className="h-1.5 rounded-chip bg-cherry" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notes;
