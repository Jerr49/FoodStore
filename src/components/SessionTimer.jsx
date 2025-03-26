import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { authAPI } from '../api/User';
import Modal from './Modal';

const SessionTimer = () => {
  const dispatch = useDispatch();
  const expiresAt = useSelector(state => state.auth.expiresAt);
  const [timeLeft, setTimeLeft] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [warningTimeLeft, setWarningTimeLeft] = useState('');

  useEffect(() => {
    if (!expiresAt) return;

    const updateTimer = () => {
      const now = Date.now();
      const expirationTime = new Date(expiresAt).getTime();
      const secondsLeft = Math.floor((expirationTime - now) / 1000);

      if (secondsLeft <= 0) {
        handleLogout();
        return;
      }

      const mins = Math.floor(secondsLeft / 60);
      const secs = secondsLeft % 60;
      const displayTime = `${mins}m ${secs}s`;
      setTimeLeft(displayTime);

      if (secondsLeft <= 300) {
        setShowWarning(true);
        setWarningTimeLeft(displayTime);
      } else {
        setShowWarning(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);

  const handleLogout = () => {
    dispatch(logout());
    authAPI.forceLogout();
  };

  const handleContinueSession = async () => {
    try {
      const { accessToken } = await authAPI.refreshToken();
      localStorage.setItem('authToken', accessToken);
      setShowWarning(false);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      handleLogout();
    }
  };

  return (
    <>
      {timeLeft && (
        <div className="fixed bottom-4 right-4 bg-white p-2 rounded shadow-lg text-sm">
          Session: {timeLeft}
        </div>
      )}

      <Modal isOpen={showWarning} onClose={() => setShowWarning(false)}>
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">Session About to Expire</h3>
          <p className="mb-4">Your session will expire in {warningTimeLeft}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleContinueSession}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Stay Logged In
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Logout Now
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SessionTimer;