import FooterLinks from "@/components/footer/FooterLinks";
import FooterProducts from "@/components/footer/FooterProducts";
import LangLinks from "@/components/footer/LangLinks";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();
  const { authors } = siteConfig;

  return (
    <footer>
      <div className="mt-16 space-y-2 pt-6 pb-4 flex flex-col items-center bg-black text-sm text-gray-400 border-t">
        <FooterLinks />
        <FooterProducts />
        <LangLinks />
        <div className="flex space-x-2">
          <p>{`©${currentYear}`}</p>{" "}
          <Link href={authors[0].twitter || authors[0].url} target="_blank">
            {authors[0].name}
          </Link>{" "}
          <p>Powered by</p>{" "}
          <Link href="https://github.com/SylarLong/iztro" target="_blank">
            iztro
          </Link>{" "}
          <p>licensed under the</p>{" "}
          <Link
            href="https://github.com/SylarLong/iztro/blob/main/LICENSE"
            target="_blank"
          >
            MIT License
          </Link>{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
