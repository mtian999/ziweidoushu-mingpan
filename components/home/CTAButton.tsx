import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

const CTAButton = ({ locale, langName }: { locale: any; langName: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 mt-4 sm:mt-8">
      <Link
        href="https://fate.mastermao.com"
        // rel="noopener noreferrer nofollow"
      >
        <Button
          variant="default"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
          aria-label={locale.title_2}
        >
          <RocketIcon />
          {locale.title_2}
        </Button>
      </Link>
      <Link
        href={`/${langName}/fate`}
        // rel="noopener noreferrer nofollow"
      >
        <Button
          variant="default"
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white"
          aria-label={locale.title}
        >
          {locale.title}
        </Button>
      </Link>
    </div>
  );
};

export default CTAButton;
