import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import AppRouter from './routes';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <AppRouter />
        </main>
      </div>
    </div>
  );
};

export default App;
