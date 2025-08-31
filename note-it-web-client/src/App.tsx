import Layout from './layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteEditorPage from './pages/NoteEditor';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <TooltipProvider delayDuration={200}>
          <Routes>
            <Route path='/note' element={<NoteEditorPage />} />
          </Routes>
        </TooltipProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
