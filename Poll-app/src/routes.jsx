import { Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const AppRoutes = () => {
  return (
    <>
    <Routes>
    <Route path="/signup" element={<SignUpPage />} />
    </Routes>
      
    </>
  )
}

export default AppRoutes
