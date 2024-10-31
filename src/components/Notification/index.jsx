import PropTypes from 'prop-types';
import { MovieContext } from '../../context';
import { useContext } from 'react';

export default function HNotification() {
  const { showNotification, notification } = useContext(MovieContext);

  console.log(notification);

  if (!notification) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="chakra-petch-regular flex items-center justify-between bg-green-100 border border-green-200 p-2 rounded-lg max-w-xs shadow-lg">
        <div className="flex items-center justify-center w-full">
          <div className="flex justify-center flex-grow">
            <p className="text-green-600 text-sm">{notification}</p>
          </div>
        </div>
        <button
          onClick={() => showNotification("")}
          className="text-green-600 hover:text-green-800 border-0"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

HNotification.propTypes = {
  message: PropTypes.string,
};
