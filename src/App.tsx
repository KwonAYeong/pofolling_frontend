import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Signup from './routes/signup';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Signup />
        </main>
      </div>
    </div>
  );
};

export default App;
