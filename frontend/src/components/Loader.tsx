import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="loader-div">
      <ClipLoader
        className="loader"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
