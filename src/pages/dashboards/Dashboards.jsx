import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Dashboards.css";

function Dashboards() {
  const [dashUrl, setDashUrl] = useState("");
  const id = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    if (id === 1) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiMjk4MWUzYzAtZWNhOC00NWRkLTlhZTYtOTM5ZWMwNzZmMTM2IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 2) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiM2RkMDY5YzEtYzMxNy00N2Q3LThjYWMtZjA3ZThjOGIxYTdjIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 3) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiYTNkNWYyNzMtM2YwNy00Mjg0LWJkOWUtYzI1MTk2MDhkMGI0IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 4) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiNjEzZjc0OGUtYjEwOS00NjNmLWJjMTMtNWY3N2Q2ZmE4Nzg1IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 5) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiMmY4ZmM4MWYtYTI3Yi00ZjIzLTk4OWMtZjJhZTc0NWQwZDZlIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 6) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiNjc4MWEwNmUtZDhiNy00YTY4LTk0ZGYtNDE4ODk1YzczM2M1IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 7) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiNWM3YTBhOTctNjc5Yi00NzU5LWFhNzYtM2M5MWU1NGI5NmE0IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 8) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiNDlkMTE2MGItNTI5Yi00OTg3LTg1OTYtNmRlN2IzNDczNjM0IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 9) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiZDdlODg1ZGEtMGE1YS00OTA4LWI1ODctM2RlODkzYWFiYWI3IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    } else if (id === 10) {
      setDashUrl(
        "https://app.powerbi.com/view?r=eyJrIjoiMDcxZGI4NmMtZTgzYi00ZWEyLWE0OTEtNGIyZjVmZDVjMDcwIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
      );
    }
  }, []);

  return (
    <section className="dashboards-section">
      <section className="dashboards-content">
        <h1>Dashboards</h1>
        {dashUrl ? (
          <iframe
            title="SinaraProjet"
            width="600"
            height="373.5"
            src={`https://app.powerbi.com/view?r=eyJrIjoiNjQzOGU2OTQtNWJlZi00Nzk3LThjYzItNjQ0N2QzNWY2OWJiIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9&filter=empresa/id%20eq%20${id}`}
            frameborder="0"
            allowFullScreen="true"
          ></iframe>
        ) : (
          <div className="dashboards-warning">
            <h2>Sua empresa ainda não possui dashboards!</h2>
            <h3>Fale com a equipe do Sinara e solicie um dashboard para sua empresa.</h3>
          </div>
        )}
      </section>
    </section>
  );
}

export default Dashboards;
