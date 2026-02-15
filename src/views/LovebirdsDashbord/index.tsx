import './css/dashboard.css';
import Board from './Board';

export default function LovebirdsDashboard() {
  return (
    <div className='dashboard'>
      <h1>🐦 Lovebirds Dashboard</h1>
      <p>Welcome to your avian paradise!</p>

      <Board />
    </div>
  );
}
