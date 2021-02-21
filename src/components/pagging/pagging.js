import "./pagging.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagging = ({ skip, limit, pagging, setSkip }) => {
  return (
    <div className="pagging">
      <div
        className="pagging-left"
        style={
          // If first page we hide left arrow
          Number(skip) > 0
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <p>{skip} ...</p>
        <i
          id="pagging-left"
          onClick={() => {
            const newSkip = Number(skip) - Number(limit);
            newSkip < 0 ? setSkip(0) : setSkip(newSkip); // Avoid going to negative pagging
          }}
        >
          <FontAwesomeIcon icon="arrow-left" size="lg" />
        </i>
      </div>
      <div className="pagging-right">
        <i
          id="pagging-right"
          onClick={() => {
            const newSkip = Number(skip) + Number(limit);
            setSkip(newSkip);
          }}
        >
          <FontAwesomeIcon icon="arrow-right" size="lg" />
        </i>
        <p>... {pagging}</p>
      </div>
    </div>
  );
};

export default Pagging;
