import {
  LegalHeading,
  LegalParagraph,
  LegalQuote,
} from "./LegalDocument";

/** Shared line renderer for long-form legal TEXT blobs */
export function renderLegalLines(text: string, skipTitles: string[] = []) {
  return text.split("\n").map((line, idx) => {
    if (!line.trim()) return <div key={idx} className="h-2" />;
    if (skipTitles.some((t) => line === t || line.startsWith(t))) return null;

    if (/^\d+\.\s[A-Z]/.test(line) || (/^[A-Z][A-Z0-9\s&()/.-]{8,}$/.test(line) && !line.includes("."))) {
      return <LegalHeading key={idx}>{line}</LegalHeading>;
    }

    if (/^\d+\.\d+\s/.test(line)) {
      const space = line.indexOf(" ");
      return (
        <LegalParagraph key={idx}>
          <span className="font-semibold text-[#111]">{line.slice(0, space + 1)}</span>
          {line.slice(space + 1)}
        </LegalParagraph>
      );
    }

    if (line.startsWith('"')) {
      return <LegalQuote key={idx}>{line}</LegalQuote>;
    }

    if (line.includes(":")) {
      const parts = line.split(":");
      if (parts.length === 2 && parts[0].length < 50) {
        return (
          <LegalParagraph key={idx}>
            <span className="font-semibold text-[#111]">{parts[0]}:</span>
            {parts[1]}
          </LegalParagraph>
        );
      }
    }

    return <LegalParagraph key={idx}>{line}</LegalParagraph>;
  });
}
