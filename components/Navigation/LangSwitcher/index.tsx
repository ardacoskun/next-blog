"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LangSwitcher = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const targetLanguage = locale === "en" ? "de" : "en";

  const redirectTarget = () => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = targetLanguage;

    return segments.join("/");
  };

  return (
    <Link href={redirectTarget()} locale={locale} className="font-semibold ">
      {targetLanguage?.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
