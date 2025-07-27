import Layout from './layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteEditorPage from './pages/NoteEditor';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/note' element={<NoteEditorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
