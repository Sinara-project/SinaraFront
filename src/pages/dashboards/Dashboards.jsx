import Sidebar from "../../components/sidebar/Sidebar";
import "./Dashboards.css";

function Dashboards() {
  const id = JSON.parse(localStorage.getItem("user")).id;
  return (
    <section className="dashboards-section">
      <section className="dashboards-content">
        <h1>Dashboards</h1>
        <iframe
          title="SinaraProjet"
          width="600"
          height="373.5"
          src={`https://app.powerbi.com/view?r=eyJrIjoiNjQzOGU2OTQtNWJlZi00Nzk3LThjYzItNjQ0N2QzNWY2OWJiIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9&filter=empresa/id%20eq%20${id}`}
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </section>
    </section>
  );
}

export default Dashboards;
