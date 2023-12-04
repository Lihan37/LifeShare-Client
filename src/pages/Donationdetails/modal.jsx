

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-8 z-10 relative">{children}</div>
    </div>
  );
};

export default Modal;
