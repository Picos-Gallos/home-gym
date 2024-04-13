import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Survey from './Survey';
import Table from './Table';
import NotFound from './NotFound';
import Navbar from './components/Navbar';
import About from "./About";

function App() {
    return (
        <>
        <Navbar />
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Register />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/table" element={<Table />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    );
}

export default App;