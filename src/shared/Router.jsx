import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>예시</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
