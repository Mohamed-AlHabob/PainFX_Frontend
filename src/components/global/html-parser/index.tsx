import parse from "html-react-parser";
import { useEffect, useState } from "react";

type HtmlParserProps = {
  html: string;
};

export const HtmlParser = ({ html }: HtmlParserProps) => {
  // State to check if the component has mounted to avoid hydration errors
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="[&_h1]:text-4xl [&_h2]:text-3xl [&_blockquote]:italic [&_iframe]:aspect-video [&_h3]:text-2xl text-themeTextGray flex flex-col gap-y-3">
      {mounted && parse(html)}
    </div>
  );
};
