import './css/style.css';
import mainData from '../components/mainData';

type MainData = {
  title: string;
  description: string;
  date: string;
};

// Change 'index' to 'Index'
const Index = () => {
  const lang =
    typeof window !== 'undefined' ? navigator.language.slice(0, 2) : 'en';
  const data: MainData | undefined = mainData(lang as 'en' | 'ru');

  return (
    <div className='homepage welcome-screen'>
      <h1>{data?.title}</h1>
      <h3>{data?.date}</h3>
    </div>
  );
};

export default Index;
