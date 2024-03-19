import Link from "next/link";
import PaddingContainer from "@/components/Layout/PaddingContainer";

const Navigation = () => {
  return (
    <div className="border-b sticky top-0 left-0 right-0 bg-white bg-opacity-50 backdrop-blur-md z-[999]">
      <PaddingContainer>
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="text-lg font-bold">
            Explorer
          </Link>
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600 ">
              <li>
                <Link href="/cities">Cities</Link>
              </li>
              <li>
                <Link href="/experiences">Experiences</Link>
              </li>
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Navigation;
