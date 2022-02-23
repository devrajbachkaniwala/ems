import { FC, ReactNode } from 'react';
import ReactDom from 'react-dom';

type TModalProps = {
  children: ReactNode;
  /* onClose: () => void; */
};

const Modal: FC<TModalProps> = ({ children }) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const rootModal: HTMLElement | null = document.getElementById('root-modal');

  if (!rootModal) {
    return null;
  }

  return ReactDom.createPortal(<>{children}</>, rootModal);
};

export default Modal;
