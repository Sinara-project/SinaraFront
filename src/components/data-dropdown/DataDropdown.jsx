import "./DataDropdown.css";

function DataDropdown({
  isVisible,
  datas,
  toggleValue,
  closeCard,
  hasCloseNav,
}) {
  return (
    <section className={`data-dropdown-section ${isVisible ? "active" : ""}`}>
      {hasCloseNav && (
        <nav className="data-dropdown-close">
          <div
            onClick={() => {
              closeCard();
            }}
          ></div>
        </nav>
      )}
      <div className={`data-dropdown-content ${hasCloseNav ? "has-close" : ""}`}>
        <hr />
        {datas.map((data, i) => (
          <div key={data.id ? data.id : i}>
            <label className="data-dropdown-choice">
              <h4>{data.name}</h4>
              <input
                type="checkbox"
                className="data-dropdown-checkbox"
                checked={data.isChecked}
                onChange={() => toggleValue(data.value)}
              />
              <span className="data-dropdown-checkbox-icon"></span>
            </label>
            {i !== datas.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default DataDropdown;
