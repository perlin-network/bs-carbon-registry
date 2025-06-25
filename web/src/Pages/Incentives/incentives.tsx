import React, { useState } from 'react';
import './incentives.scss';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/news-bg.jpg';
import { Button } from 'antd';

const incentives: any[] = [];

interface IncentiveItemProps {
  title: string;
  date: string;
  image: string;
}

const IncentiveItem: React.FC<IncentiveItemProps> = ({ title, date, image }) => (
  <li className="item">
    <img src={image} alt="" className="item-image" />
    <div className="item-body">
      <a href="#" className="item-title">
        {title}
      </a>
      <div className="item-date">{date}</div>
    </div>
  </li>
);

const Incentives = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
          <div className="incentives-section">
            <h2 className="incentive-section-title">2025 Incentives</h2>
            <h3 className="incentive-program-title mt-6 mb-2 font-semibold text-lg">
              Green Choice Exemption Programme
            </h3>
            <p className="mb-4">
              The Green Choice Exemption Program is a duty exemption program designed to encourage
              the importation and use of eligible energy-efficient cooling and heating appliances
              (refrigerators, freezers, air-conditioners and water heaters) in The Bahamas. The
              incentive aims to promote energy efficiency, allowing for lower energy costs for the
              benefit of consumers.
            </p>
            <p className="font-medium mt-4">
              Please note the steps below for participation in this programme.
            </p>

            {/* <Button type="primary" onClick={() => setIsExpanded((prev) => !prev)} className="my-3">
              {isExpanded ? 'Hide Steps' : 'Show Steps'}
            </Button> */}
            {!isExpanded && (
              <p className="read-more-btn" onClick={() => setIsExpanded(true)}>
                Read More....
              </p>
            )}
            {isExpanded && (
              <ul className="collapsible-steps mt-3 list-decimal ml-6 space-y-2">
                <li>
                  Review the specifications guidelines to ensure that your appliance(s) are eligible
                  to receive duty exemption. If unsure, contact the NER at{' '}
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
                  </a>{' '}
                  to complete the relevant application.
                </li>
                <li>
                  The NER will review the application and provide an e-certificate to successful
                  applicants via MyGateway.
                </li>
                <li>The e-certificate can then be uploaded to the Custom’s Click2Clear portal.</li>
                <li>
                  The successful applicant will receive a duty exemption on their energy-efficient
                  appliance.
                </li>
              </ul>
            )}
            {/* <ul>
              {incentives.length > 0 ? (
                incentives.map((item) => <IncentiveItem key={item.title} {...item} />)
              ) : (
                <p>No incentives available at the moment.</p>
              )}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
