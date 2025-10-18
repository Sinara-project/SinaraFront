import "./SheetsContent.css";
import Close from "../../assets/close-blue.svg";

function SheetsContent({ sheetName, isVisible, closeSheet }) {
    const closeContent = () => { 
        closeSheet();
    }
  return (
    <section className={`sheets-content-section ${isVisible ? "visible" : ""}`}>
      <div className={`sheets-content-container ${isVisible ? "visible" : ""}`}>
        <nav>
          <h2>{sheetName}</h2>
          <img src={Close} alt="" onClick={closeContent} />
        </nav>
      </div>
    </section>
  );
}

export default SheetsContent;
