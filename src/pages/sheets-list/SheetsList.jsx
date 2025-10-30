import { useEffect, useState } from "react";
import SheetsContent from "../../components/sheets-content/SheetsContent";
import "./SheetsList.css";
import { getFormsByEnterpriseId } from "../../services/mongoDB/Forms/Forms";
import Loading from "../../components/loading/Loading";

function SheetsList() {
  const [contentVisibility, setContentVisibility] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const closeSheet = () => {
    setContentVisibility(false);
    setSheet(null);
  };

  const openSheet = (sheet) => {
    setSheet(sheet);
    setContentVisibility(true);
  };

  useEffect(() => {
    setLoading(true);
    async function getSheets() {
      try {
        const data = [];
        const rawData = await getFormsByEnterpriseId(
          JSON.parse(localStorage.getItem("user")).id
        );

        rawData.forEach((raw) => {
          data.push({
            id: raw.id,
            name: raw.titulo,
          });
        });

        setSheets(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getSheets();
  }, []);

  return (
    <section className="sheets-section">
      {isLoading && (
        <div className="sheets-loading">
          <Loading />
        </div>
      )}

      {contentVisibility && sheet && (
        <SheetsContent
          key={sheet.id} 
          sheet={sheet}
          isVisible={contentVisibility}
          closeSheet={closeSheet}
        />
      )}

      <section className="sheets-content">
        <h1>Planilhas</h1>
        <div className="sheets-options">
          {sheets.map((planilha, i) => (
            <div
              key={planilha.id}
              className={`sheets-option ${i % 2 !== 0 ? "rose" : "white"}`}
              onClick={() => openSheet(planilha)}
            >
              <h2>{planilha.name}</h2>
              <div className="sheets-img"></div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default SheetsList;
