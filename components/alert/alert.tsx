import React, { FC, useState } from 'react';
import './alert.scss';

interface IProps {
  type: 'alert-success' | 'alert-danger' | 'alert-warning';
  message?: string;
}

const Alert: FC<IProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);
  const closeAlert = () => {
    setIsVisible(false);
  };
  if (isVisible)
    return (
      <div className={`alert-box ${type}`}>
        <span className="alert-type-icon">
          {type == 'alert-danger' && <img src="/icons/minus (1).svg" />}
          {type == 'alert-success' && <img src="/icons/success-icon.svg" />}
        </span>
        <p className="alert-message">{message}</p>
        <button className="btn close-btn" onClick={closeAlert}>
          <img src="/icons/cross.svg" />
        </button>
      </div>
    );
  else return null;
};
export default Alert;
