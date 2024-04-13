import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Survey from './Survey';

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/survey" element={<Survey />} />
        </Routes>
    );
}

export default App;