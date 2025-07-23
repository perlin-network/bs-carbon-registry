import React, { useState } from 'react';
import './incentives.scss';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/news-bg.jpg';

const Incentives = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="incentive-container">
      <HeroHeader
        title="Emission Reduction Initiatives and Incentives"
        breadcrumbs={['Incentives/Initiatives']}
        backgroundImage={BackgroundJpg}
      />
      <div className="page-content">
        <div className="container">
          <p>
            The Prime Minister may create and implement incentives and initiatives to promote
            decarbonization and lower greenhouse gas emissions.
          </p>

          <div className="mt-6 faq-list">
            <div className="faq-item">
              <button className="faq-question" onClick={() => toggleOpen(0)}>
                Green Choice Exemption Programme
              </button>

              {openIndex === 0 && (
                <div className="faq-answer">
                  <p>
                    The Green Choice Exemption Programme is a duty exemption program designed to
                    encourage the importation and use of eligible energy-efficient cooling and
                    heating appliances (refrigerators, freezers, air-conditioners and water heaters)
                    in The Bahamas. The incentive aims to promote energy efficiency, allowing for
                    lower energy costs for the benefit of consumers.
                  </p>
                  <p>
                    Households, commercial entities, and non-profit organizations can participate in
                    this incentive.
                  </p>
                  <p className="mt-4 mb-1 font-semibold">Steps for participation:</p>
                  <ol className="space-y-2 ml-6 list-decimal">
                    <li>
                      Review the specifications guidelines to ensure that your appliance(s) are
                      eligible to receive duty exemption. If unsure, contact the NER at{' '}
                      <a href="mailto:ner@bahamas.gov.bs" className="text-blue-600 underline">
                        ner@bahamas.gov.bs
                      </a>
                      .
                      <br />
                      <a
                        href="https://bio-carbon-registry-app-prod.s3.us-east-1.amazonaws.com/assets/National+Emissions+Registry+Green+Choice+Exemption+Program+Specifications+Guideline.pdf"
                        download
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        📄 Download Specifications Guidelines
                      </a>
                    </li>
                    <li>Purchase the eligible appliance(s).</li>
                    <li>
                      Visit the{' '}
                      <a
                        href="https://services.mygateway.gov.bs/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        MyGateway portal
                      </a>
                      , select Office of the Prime Minister, and select National Emissions Registry
                      to complete the relevant application.
                    </li>
                    <li>
                      The NER will review the application and provide a permit to successful
                      applicants via MyGateway.
                    </li>
                    <li>The permit can then be uploaded to the Custom’s Click2Clear portal.</li>
                    <li>
                      The successful applicant will receive a duty exemption on their
                      energy-efficient appliance.
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
