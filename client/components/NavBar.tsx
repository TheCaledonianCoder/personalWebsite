import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../src/services/api";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("token");
      setIsAdmin(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location]);

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await logoutAdmin();
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      setIsAdmin(false);
      closeMenu();
      navigate("/login");
    } catch (err: unknown) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const getLinkClasses = (path: string, isMobile = false) =>
    `text-sm font-medium transition-all duration-200 ${
      isMobile ? "w-full text-center py-2" : "px-4 py-1 relative z-10"
    } ${
      isActive(path)
        ? "bg-[#1A4D57] text-white shadow-sm" +
          (isMobile ? "" : " rounded-full")
        : "bg-white/90 text-slate-700 hover:text-[#1A4D57]"
    }`;

  const renderLinks = (isMobile = false) => {
    const allLinks = [
      ...navLinks,
      ...(isAdmin ? [{ path: "/admin", label: "Admin" }] : []),
    ];

    return allLinks.map(({ path, label }, index) => {
      let roundedClass = "";
      if (!isMobile) {
        if (index === 0) roundedClass = "rounded-l-full";
        if (index === allLinks.length - 1) roundedClass = "rounded-r-full";
      }

      return (
        <Link
          key={path}
          to={path}
          onClick={isMobile ? closeMenu : undefined}
          className={`${getLinkClasses(path, isMobile)} ${roundedClass}`}
        >
          {label}
        </Link>
      );
    });
  };

  return (
    <header className="w-full bg-transparent text-slate-950 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-between">
        {/* Logo - Far Left */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center justify-start group outline-none focus:outline-none border-none focus:ring-0 mr-auto"
        >
          <svg
            className="h-10 w-auto fill-white transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
            viewBox="0 0 2000 2000"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: 2,
            }}
          >
            <rect
              x="0"
              y="0"
              width="2000"
              height="2000"
              style={{ fill: "none" }}
            />
            <g>
              <path d="M8.175,932.779l0,-427.626c0,-241.134 172.43,-442.313 400.609,-486.857c-3.111,18.92 -1.987,33.344 -1.987,37.035c-0.003,783.628 0.212,783.651 -1.607,790.22c-0.644,2.325 1.807,2.743 -5.216,29.703c-14.166,54.382 -43.825,81.101 -47.678,86.324c-15.144,20.527 -68.839,59.404 -107.716,65.407c-3.489,0.539 -60.352,18.589 -132.872,-7.414c-2.1,-0.753 -1.05,-2.897 -25.039,-12.288c-1.494,-0.585 -1.121,-0.887 -17.058,-10.557c-6.883,-4.177 -44.747,-36.458 -51.806,-50.561c-0.734,-1.466 -1.027,-1.301 -9.629,-13.388Zm686.365,-923.672l801.772,-0c273.775,0 496.046,222.271 496.046,496.046l0,383.549c-4.262,-3.824 -11.274,-10.341 -23.349,-22.028c-1.754,-1.698 -2.097,-1.229 -24.484,-18.212c-9.213,-6.989 -16.638,-11.456 -18.143,-12.362c-6.761,-4.068 -5.523,-5.759 -12.904,-8.699c-1.85,-0.737 -1.189,-1.739 -21.39,-12.735c-85.045,-46.293 -110.419,-43.886 -139.638,-52.757c-24.45,-7.423 -133.384,-15.927 -156.22,-10c-7.332,1.903 -91.267,-2.053 -205.461,55.734c-44.191,22.363 -85.867,57.47 -92.735,63.255c-4.759,4.009 -5.43,3.123 -9.162,8.248c-0.712,0.978 -1.009,0.354 -11.371,9.962c-7.046,6.533 -8.806,-6.03 -33.009,-23.72c-8.227,-6.013 -7.241,-7.104 -16.242,-12.189c-2.869,-1.621 -19.874,-17.472 -53.638,-36.342c-83.395,-46.609 -124.886,-49.171 -143.891,-54.948c-15.185,-4.616 -81.079,-10.636 -83.503,-11.156c-0.705,-0.151 -65.299,-1.061 -70.791,0.479c-2.37,0.664 -47.143,3.646 -59.736,7.105c-3.207,0.881 -3.406,-0.344 -40.676,8.567c-5.125,1.225 -52.036,12.442 -62.629,20.41c-5.344,4.02 -11.353,5.201 -12.417,5.41c-3.882,0.763 -3.324,-2.501 -3.324,-112.037c-0,-652.082 0.249,-652.21 -2.088,-665.901c-0.349,-2.041 -0.687,-3.927 -1.019,-5.678Zm1155.517,1835.744c-90.021,91.598 -215.297,148.44 -353.744,148.44l-78.54,0c2.241,-19.721 1.455,-48.075 1.455,-102.587c0,-664.879 -0.158,-664.855 1.333,-670.29c1.912,-6.968 -7.415,-90.252 88.151,-157.81c30.977,-21.898 31.597,-21.106 82.861,-35.533c13.042,-3.67 90.946,-8.499 133.281,14.942c11.031,6.108 11.765,4.153 22.704,10.227c2.32,1.288 1.978,1.746 26.592,19.834c32.667,24.005 43.4,49.01 52.779,60.807c8.242,10.366 20.461,51.458 20.977,59.694c1.012,16.147 2.214,15.95 2.255,32.089c0.4,158.842 -0.406,447.914 -0.105,620.187Zm-719.444,148.44l-434.208,0c0.582,-5.093 0.955,-10.704 1.063,-16.906c0.392,-22.376 0.134,-343.763 0.197,-741.018c0.013,-83.427 35.762,-118.868 42.674,-130.09c1.81,-2.939 30.924,-32.063 33.889,-33.891c21.28,-13.123 30.463,-27.84 85.157,-41.482c53.155,-13.258 132.082,-7.474 185.981,36.646c6.655,5.448 23.418,15.374 41.515,39.98c1.546,2.102 35.326,39.55 39.58,92.503c0.698,8.682 1.918,8.403 1.976,17.067c0.778,115.357 -1.505,758.205 1.303,768.649c0.174,0.649 0.389,4.109 0.873,8.542Zm-722.829,-9.385c-227.683,-44.935 -399.609,-245.879 -399.609,-486.66l0,-209.682c42.092,17.005 67.541,20.134 106.003,26.069c59.385,9.164 90.018,4.638 128.399,3.835c1.654,-0.035 62.424,-8.83 70.692,-11.296c4.576,-1.365 49.24,-13.862 53.524,-15.061c1.625,-0.455 1.171,-1.332 19.32,-8.448c1.07,-0.42 8.913,-3.495 13.208,-5.666c2.628,-1.329 7.273,-4.906 7.502,3.352c0.675,24.353 -1.434,653.874 0.961,703.558Z" />
            </g>
          </svg>
        </Link>

        {/* Desktop Navigation - Centered Pill */}
        <nav className="hidden md:flex items-center space-x-3 absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center rounded-full bg-white/90 overflow-hidden shadow-sm">
            {renderLinks(false)}
          </div>
        </nav>

        {/* Desktop Logout Link & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <a
              href="#logout"
              onClick={handleLogout}
              className="hidden md:inline-block text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 drop-shadow-sm"
            >
              Log Out
            </a>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="md:hidden p-2 text-white hover:text-slate-200 focus:outline-none rounded-md transition-colors bg-white/20"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <nav className="md:hidden bg-transparent px-6 pt-2 pb-6 space-y-2 flex flex-col items-center">
          <div className="w-full max-w-xs flex flex-col space-y-2 items-center">
            <div className="w-full flex flex-col rounded-2xl bg-white/95 overflow-hidden shadow-sm">
              {renderLinks(true)}
            </div>
            {isAdmin && (
              <a
                href="#logout"
                onClick={handleLogout}
                className="w-full text-center py-2 text-sm font-medium text-slate-700 hover:text-[#1A4D57] bg-white/95 rounded-xl shadow-sm transition-colors duration-200"
              >
                Log Out
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
