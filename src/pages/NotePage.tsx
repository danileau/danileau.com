import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Prose from "@/components/Prose";
import { useI18n } from "@/i18n/use-i18n";
import { useNote } from "@/content/use-notes";
import { LogoIcon } from "@/components/Logo";

const NotePage = () => {
  const { slug } = useParams();
  const { c } = useI18n();
  const note = useNote(slug);

  useEffect(() => {
    if (note) document.title = `${note.title} — Danilo Alessio Licitra`;
    return () => {
      document.title = "Danilo Alessio Licitra — System Architect | Built. Operated. Designed.";
    };
  }, [note]);

  if (!note) return <Navigate to="/notes" replace />;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground plate">
      <Navigation />

      <main className="container px-5.5 py-8.8 flex-1 w-full">
        <div className="max-w-[92ch] mx-auto">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-2 hover:text-cherry-dk transition-colors mb-5.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {c.notes.backToNotes}
        </Link>

        <article>
          <header className="mb-6.6">
            <p className="flex gap-x-4.4 gap-y-1 flex-wrap font-mono text-xs text-ink-3 mb-3.3">
              <span className="font-bold text-cherry-dk">#{note.no}</span>
              <span>{note.topic}</span>
              <span>{note.date}</span>
            </p>
            <h1 className="font-script text-cherry-dk text-5xl sm:text-6xl lg:text-7xl leading-none mb-3.3">
              {note.title}
            </h1>
            <p className="font-display text-lg sm:text-xl leading-snug">{note.standfirst}</p>
            <div className="checker h-4 border-y-3 border-ink mt-5.5" />
          </header>

          <Prose blocks={note.blocks} />

          <footer className="mt-8.8 pt-5.5 border-t-3 border-ink flex items-center gap-3.3 flex-wrap">
            <LogoIcon size={38} />
            <p className="font-mono text-xs text-ink-3">
              Danilo Alessio Licitra · Bern ·{" "}
              <a
                href="https://github.com/danileau/ciphra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink border-b-2 border-sun hover:border-cherry transition-colors"
              >
                github.com/danileau/ciphra
              </a>
            </p>
          </footer>
        </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotePage;
