interface AuthenticationSubmitButtonProp {
  loading: boolean;
  buttonText: string;
  buttonStatus: boolean;
  onUserSignIn: () => void;
}

const AuthenticationSubmitButton = ({
  loading,
  buttonText,
  buttonStatus,
  onUserSignIn,
}: AuthenticationSubmitButtonProp) => {
  return (
    <>
      <button
        type="submit"
        className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
        onClick={onUserSignIn}
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
};

export default AuthenticationSubmitButton;
