interface ModalFormButtonProp {
  loading: boolean;
  buttonText: string;
  buttonStatus: boolean;
  onButtonClick: () => void;
}

function ModalFormButton({
  loading,
  buttonText,
  buttonStatus,
  onButtonClick,
}: ModalFormButtonProp) {
  return (
    <>
      <button
        className="btn btn-primary py-8 fs-4 mb-4 rounded-2 text-center justify-content-center d-flex align-items-center "
        onClick={onButtonClick}
        disabled={buttonStatus}
      >
        {loading && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {buttonText}
      </button>
    </>
  );
}

export default ModalFormButton;
