import cookieCutter from "cookie-cutter";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../utils/Dropdown";
import Transition from "../utils/Transition";

function Header({ user }) {
  console.log(user);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [top, setTop] = useState(true);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  const handleLogout = () => {
    cookieCutter.set("token", "");
    Router.push("/signin");
  };

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4 block" aria-label="Cruip">
            {/* Logo */}
            <Link href="/">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                <Link href="/pricing">Pricing</Link>
              </li>
              <li className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                <Link href="/about">About us</Link>
              </li>
              <li className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                <Link href="/tutorials">Tutorials</Link>
              </li>
              <li className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                <Link href="/blog">Blog</Link>
              </li>
              {/* 1st level: hover */}
              <Dropdown title="Resources">
                {/* 2nd level: hover */}
                <li className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight">
                  <Link href="/documentation">Documentation</Link>
                </li>
                <li className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight">
                  <Link href="/support">Support center</Link>
                </li>
                <li className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight">
                  <Link href="/404">404</Link>
                </li>
              </Dropdown>
            </ul>

            {/* Desktop sign in links */}
            {!user?.email ? (
              <ul className="flex grow justify-end flex-wrap items-center">
                <li className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                  <Link href="/signin">Sign in</Link>
                </li>
                <li className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                  <Link href="/signup">
                    <div className="flex items-center cursor-pointer">
                      <span>Sign up</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex grow justify-end flex-wrap items-center">
                <li className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                  <Link href="/account">
                    <span className="cursor-pointer">
                      {user.name} ({user.plan})
                    </span>
                  </Link>
                </li>
                <li className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={handleLogout}
                  >
                    <svg
                      className="w-3 h-3 fill-current text-gray-400 shrink-0 "
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            )}
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden">
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && "active"}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-gray-900"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" />
                <rect y="11" width="24" height="2" />
                <rect y="18" width="24" height="2" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <div ref={mobileNav}>
              <Transition
                show={mobileNavOpen}
                tag="nav"
                id="mobile-nav"
                className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              >
                <ul className="px-5 py-2">
                  <li className="flex text-gray-600 hover:text-gray-900 py-2">
                    <Link href="/pricing">Pricing</Link>
                  </li>
                  <li className="flex text-gray-600 hover:text-gray-900 py-2">
                    <Link href="/about">About us</Link>
                  </li>
                  <li className="flex text-gray-600 hover:text-gray-900 py-2">
                    <Link href="/tutorials">Tutorials</Link>
                  </li>
                  <li className="flex text-gray-600 hover:text-gray-900 py-2">
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className="py-2 my-2 border-t border-b border-gray-200">
                    <span className="flex text-gray-600 hover:text-gray-900 py-2">
                      Resources
                    </span>
                    <ul className="pl-4">
                      <li className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2">
                        <Link href="/documentation">Documentation</Link>
                      </li>
                      <li className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2">
                        <Link href="/support">Support center</Link>
                      </li>
                      <li className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2">
                        <Link href="/404">404</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center">
                    <Link href="/signin">Sign in</Link>
                  </li>
                  <li>
                    <Link href="/signup">
                      <div className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2 cursor-pointer">
                        <span>Sign up</span>
                        <svg
                          className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                            fill="#999"
                            fillRule="nonzero"
                          />
                        </svg>
                      </div>
                    </Link>
                  </li>
                </ul>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
