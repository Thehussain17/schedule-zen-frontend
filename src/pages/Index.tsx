
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard by default
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
