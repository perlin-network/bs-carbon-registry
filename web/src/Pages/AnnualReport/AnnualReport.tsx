import './AnnualReprt.scss';

export default function AnnualReport() {
  const pdfUrl =
    'https://bio-carbon-registry-app-prod.s3.us-east-1.amazonaws.com/assets/NER+FINAL+2025+ANNUAL+REPORT.pdf';

  return (
    <div className="annual-report-page">
      <iframe src={pdfUrl} title="PDF Viewer" className="annual-report-container" />
    </div>
  );
}
