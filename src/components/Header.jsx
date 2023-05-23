import { useContext, useState } from "react";
import { StoreContext } from "@/context/storeContext";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMenuOpen } = useContext(StoreContext);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="p-5 border-b-2 border-black">
        <nav className="flex justify-between items-center">
          <Link className="text-xl font-bold" href={"/"}>
            FOOEXTRA
          </Link>
          {isOpen || isMenuOpen ? (
            <p
              className="text-xl font-bold cursor-pointer z-50"
              onClick={closeMenu}
              href="/"
            >
              CLOSE
            </p>
          ) : (
            <p
              className="text-xl font-bold cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              MENU
            </p>
          )}
        </nav>
      </header>

      {(isOpen || isMenuOpen) && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-10">
          <div className="text-black text-5xl z-20">
            <ul className="space-y-4 ">
              <li>
                <Link href="/schedule" onClick={closeMenu}>
                  LINE UP 2023
                </Link>
              </li>
              <li>
                <Link href="/campingsite" onClick={closeMenu}>
                  HOW TO REACH US
                </Link>
              </li>
              <li>
                <Link href="/campingsite" onClick={closeMenu}>
                  CAMPING SITE
                </Link>
              </li>
              <li>
                <Link href="/campingsite" onClick={closeMenu}>
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}