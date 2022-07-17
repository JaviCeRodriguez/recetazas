import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Error from './screens/Error';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

const App = (): JSX.Element => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Box>
  );
};

export default App;
