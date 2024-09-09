import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

const Home: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.user.role);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue-500 text-white p-6 m-4 rounded-md w-1/4 flex justify-center items-center text-center">
        <div>
          <p>Content (1)</p>
          <p>Display to client and admin</p>
        </div>
      </div>

      {userRole === 'admin' && (
        <div className="bg-blue-500 text-white p-6 m-4 rounded-md w-1/4 flex justify-center items-center text-center">
          <div>
            <p>Content (2)</p>
            <p>Display only to admin</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
