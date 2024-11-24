import { isBrowser } from '@/utils/misc';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  isVisible: boolean;
  onClickClose: () => void;
  disableClose?: boolean;
  hideClose?: boolean;
};

const withModal =
  <P extends object>(Element: React.ComponentType<P>) =>
  (props: P & Props) => {
    const { isVisible, onClickClose, hideClose, disableClose } = props;
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);

      const handleClose = () => {
        if (!isVisible) return;
        onClickClose();
      };

      window.addEventListener('keyup', handleClose);

      return () => {
        window.removeEventListener('keyup', handleClose);
      };
    }, [isVisible, onClickClose]);

    if (!isVisible) return null;

    const modalContent = (
      <div className="text-center">
        <div
          className={`fixed left-0 top-0 w-full h-full z-10 bg-gray-800 bg-opacity-75 ${disableClose ? 'pointer-events-none' : ''}`}
          onClick={onClickClose}
        />
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer">
          <div className="relative z-10 cursor-default overflow-y-auto shadow-lg rounded-lg bg-white-100">
            <div
              className={`absolute right-0 top-0 p-6 text-black opacity-50 transition-opacity duration-150 cursor-pointer ${
                hideClose || disableClose ? 'hidden' : 'hover:opacity-100'
              }`}
              onClick={onClickClose}
            >
              <Image src="/close.svg" width={24} height={24} alt="close button" />
            </div>
            <Element {...props} />
          </div>
        </div>
      </div>
    );

    if (isClient && isBrowser()) {
      const modalRoot = document.getElementById('modal');
      if (modalRoot) {
        return ReactDOM.createPortal(modalContent, modalRoot);
      }
    }

    return null;
  };

export default withModal;
