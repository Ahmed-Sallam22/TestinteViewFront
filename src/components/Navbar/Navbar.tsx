import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate=useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('TestInterView');
    setToken(storedToken);
  }, []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSignOut = () => {
    localStorage.removeItem('TestInterView');
    navigate('/')
    setToken(null);
  };
  return (
    <>
 <nav className="grid grid-cols-12 fixed top-0 right-0 left-0  gap-2 border border-black ">
        <div className="col-span-9 md:col-span-2 flex items-center justify-center border-r-2 border-black">
          <h1 className="text-lg font-bold">Blue202labs</h1>
        </div>

        <div className="col-span-6 hidden md:flex md:col-span-8 items-center justify-start">
          <span className="text-gray-600 text-lg">Technical test</span>
        </div>

        <div className="col-span-3 md:col-span-2 flex justify-end items-center">
          <div className="block md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              <FaBars className="text-xl text-blue-700" />
            </button>
          </div>

          {token && (
            <div className="hidden md:flex justify-end items-center border-2 border-black">
              <button   onClick={handleSignOut} className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      {isMenuOpen && token && (
        <div className="col-span-12 flex justify-end mt-2 md:hidden">
          <button             onClick={handleSignOut}
 className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 w-full rounded-md transition-colors duration-200">
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
