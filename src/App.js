import './App.scss';
import LoaderGL from './LoaderGL';
import { AppHeader } from './app/layout/Header';
import { AppContent } from './app/AppContent';

function App() {
  return (
    <>
      <LoaderGL />
      <div className="container">
        <AppHeader />
        <AppContent />
      </div>
    </>
  );
}

export default App;
