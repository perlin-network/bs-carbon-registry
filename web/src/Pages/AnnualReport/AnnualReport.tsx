import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AnnualReport.scss';

export default function AnnualReport() {
  const { year } = useParams<{ year: string }>();
  const pdfUrl = `https://bio-carbon-registry-app-prod.s3.us-east-1.amazonaws.com/assets/NER+FINAL+${year}+ANNUAL+REPORT.pdf`;

  useEffect(() => {
    document.title = `NER ${year} Annual Report`;
  }, [year]);

  return (
    <div className="annual-report-page">
      <iframe src={pdfUrl} title={`Annual Report ${year}`} className="annual-report-container" />
    </div>
  );
}
