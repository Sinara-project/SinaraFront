import { useState } from "react";
import SheetsContent from "../../components/sheets-content/SheetsContent";
import "./SheetsList.css";

function SheetsList() {
  const [contentVisibility, setContentVisibility] = useState(false);
  const [sheetName, setSheetName] = useState();
  const sheets = [
    {
      id: 1,
      name: "Relatório Financeiro 2025",
      link: "https://meusarquivos.com/planilhas/financeiro-2025.xlsx",
    },
    {
      id: 2,
      name: "Controle de Estoque - Julho",
      link: "https://meusarquivos.com/planilhas/estoque-julho.xlsx",
    },
    {
      id: 3,
      name: "Planejamento de Projetos",
      link: "https://meusarquivos.com/planilhas/projetos.xlsx",
    },
    {
      id: 4,
      name: "Horas Trabalhadas - Equipe A",
      link: "https://meusarquivos.com/planilhas/horas-equipe-a.xlsx",
    },
    {
      id: 5,
      name: "Cadastro de Clientes",
      link: "https://meusarquivos.com/planilhas/clientes.xlsx",
    },
    {
      id: 6,
      name: "Análise de Vendas Q3",
      link: "https://meusarquivos.com/planilhas/vendas-q3.xlsx",
    },
  ];

  const closeSheet = () => {
    setContentVisibility(false);
  }

  const openSheet = (name, visibility) => {
    setSheetName(name);
    setContentVisibility(visibility);
  }

  return (
    <section className="sheets-section">
      <SheetsContent sheetName={sheetName} isVisible={contentVisibility} closeSheet={closeSheet} />
      <section className="sheets-content">
        <h1>Planilhas</h1>
        <div className="sheets-options">
          {sheets.map((planilha) => (
            <div className={`sheets-option ${planilha.id % 2 == 0 ? "rose" : "white"}`} onClick={() => {openSheet(planilha.name, true)}}>
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
