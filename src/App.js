import { RouterProvider } from 'react-router-dom';
import router from './routes/RouterConfig.tsx';

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
