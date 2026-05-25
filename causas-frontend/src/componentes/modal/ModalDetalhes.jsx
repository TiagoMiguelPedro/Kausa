import DestaqueCard from "../cards/DestaqueCard.jsx";

function ModalDetalhes({titulo, children, onClose}) {

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    X
                </button>

                <h2>{titulo}</h2>

                <div className="modal-body">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default ModalDetalhes;