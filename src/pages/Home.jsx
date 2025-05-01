import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Category from './Category';
import '../../src/styles/global.scss';

const Home = () => {
  // const navigate = useNavigate();
  // const [data, setData] = useState([]);

  // const logoutFunction = () => {
  //   localStorage.removeItem('accesstokenn');
  //   localStorage.removeItem('refreshtokenn');
  //   navigate('/', { replace: true });
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('accesstokenn');
  //       const response = await fetch('YOUR_API_ENDPOINT_HERE', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const result = await response.json();
  //       setData(result.data || []);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <Category />
    </div>
  );
};

export default Home;
