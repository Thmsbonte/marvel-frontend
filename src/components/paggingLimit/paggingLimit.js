import "./paggingLimit.scss";

const PaggingLimit = ({ setLimit }) => {
  return (
    <div className="pagging-limit">
      <select
        name="characters-paging"
        id="characters-paging"
        onChange={(event) => {
          setLimit(event.target.value);
        }}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default PaggingLimit;
