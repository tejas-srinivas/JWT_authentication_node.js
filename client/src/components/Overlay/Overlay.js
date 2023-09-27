import "./overlay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/fontawesome-free-solid";

const Overlay = ({ isOpen, onClose, message, children }) => {
  return (
    <>
      {isOpen ? (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay__container">
            <div className="overlay__controls">
              <div className="overlay__header"><h3>{message}</h3></div>
              <FontAwesomeIcon className="overlay__close" icon={faWindowClose} onClick={onClose} />
            </div>
            <div className="overlay__body">
              <p>Click on OK button to continue..</p>
            </div>
            
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Overlay;
