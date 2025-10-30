import "./SheetsContent.css";
import Close from "../../assets/close-blue.svg";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { getFormsResponses } from "../../services/mongoDB/Forms/Forms";

function SheetsContent({ sheet, isVisible, closeSheet }) {
  const [formData, setFormData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const closeContent = () => {
    setFormData(null);
    closeSheet();
  };

  useEffect(() => {
    if (!sheet?.id) return;

    setLoading(true);
    setFormData(null);

    async function getDataResponses() {
      try {
        const data = await getFormsResponses(sheet.id);
        setFormData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getDataResponses();
  }, [sheet]);

  if (!isVisible) return null;
  if (!formData) return null;

  return (
    <section className={`sheets-content-section ${isVisible ? "visible" : ""}`}>
      {isLoading && (
        <div className="sheets-content-loading">
          <Loading />
        </div>
      )}

      <div className={`sheets-content-container ${isVisible ? "visible" : ""}`}>
        <nav>
          <h2>{formData.titulo}</h2>
          <img src={Close} alt="Fechar" onClick={closeContent} />
        </nav>

        <div className="sheets-table-wrapper">
          <table className="sheets-table">
            <thead>
              <tr>
                {formData.campos.map((campo, idx) => (
                  <th key={idx}>{campo.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="rose">
                {formData.campos.map((campo, idx) => (
                  <td key={idx}>{campo.valor || "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default SheetsContent;
