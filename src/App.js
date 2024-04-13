import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Survey from './Survey';
import Table from './Table';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
        <Navbar />
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/table" element={<Table />} />
            </Routes>
        </>
    );
}

export default App;