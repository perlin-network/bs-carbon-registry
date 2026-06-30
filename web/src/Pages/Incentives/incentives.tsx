import React, { useState } from 'react';
import './incentives.scss';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/news-bg.jpg';

type RegistryIncentive = {
  title: string;
  description?: string;
  descriptionLines?: string[];
  link?: string;
};

type RegistryCategory = {
  id: 'dutyExemptions' | 'dutyReductions' | 'privateSector';
  title: string;
  items: RegistryIncentive[];
};

const registryCategories: RegistryCategory[] = [
  {
    id: 'dutyExemptions',
    title: 'Duty Exemptions',
    items: [
      {
        title: 'Green Choice Exemption Programme',
        description:
          'A duty exemption is applied on energy efficient refrigerators, air conditioners, freezers and water heaters that meet the energy efficiency ratings listed in the NERs specification guidelines.',
      },
      {
        title: 'Inverters for solar panels',
        description:
          'A duty exemption is applied for all imported inverters for solar panels. These inverters are used for converting direct current from the solar panel into alternating current for use on an electric grid.',
      },
      {
        title: 'LED Light Bulbs and Fluorescent Energy Saving Light Bulbs',
        description:
          'A duty exemption is applied for all imported LED light bulbs and fluorescent energy saving light bulbs. These light bulbs are energy efficient, use up to 75% less energy, reduce household utility bills and can last up to 25 times longer than incandescent light bulbs.',
      },
      {
        title: 'Renewable Energy Battery Storage',
        description:
          'A duty exemption is applied for all imported lithium-ion and lithium phosphate batteries, which are predominantly used for renewable energy storage.',
      },
      {
        title: 'Solar Panel',
        description:
          'A duty exemption is applied for all imported solar panels, which reduce emissions and lead to energy cost savings.',
      },
    ],
  },
  {
    id: 'dutyReductions',
    title: 'Duty Reductions',
    items: [
      {
        title: 'Electric Golf Carts',
        description:
          'A duty reduction of 10% is applied to electric motorcycles compared to a duty of 75% for motorcycles with internal combustion engines.',
      },
      {
        title: 'Electric Motorcycles',
        description:
          'A duty reduction of 10% is applied to electric motorcycles compared to a duty of 75% for motorcycles with internal combustion engines.',
      },
      {
        title: 'Electric Vehicle Chargers',
        description: 'Import duties on electric vehicle chargers have been set at 5%.',
      },
      {
        title: 'Electric Vehicles',
        descriptionLines: [
          'Used or new electric vehicles whose value does not exceed $70,000 have a 10% duty rate.',
          'Used or new electric vehicles whose value does exceed $70,000 have a 25% duty rate.',
        ],
      },
      {
        title: 'Hybrid Vehicles',
        descriptionLines: [
          'Used or new hybrid vehicles whose value does not exceed $70,000 have a 10% duty.',
          'Used or new hybrid vehicles whose value does exceed $70,000 have a 25% duty.',
        ],
      },
      {
        title: 'Vehicle Batteries (except Internal Combustion Engine Vehicles)',
        description: 'Excise duty on rechargeable vehicle batteries has been lowered to 10%.',
      },
    ],
  },
  {
    id: 'privateSector',
    title: 'Private Sector Incentives',
    items: [
      {
        title: 'Scotiabank Green Loan Programme',
        descriptionLines: [
          'Applies for purchasing solar panels, electric vehicles or hybrid vehicles, for your home or business.',
          'Lower processing fees, low interest rates and no payments for up to two months.',
        ],
      },
      {
        title: 'CIBC Renewable Energy Loans',
        descriptionLines: [
          'Up to 100% financing on photovoltaic systems, up to 10 years to repay and up to 50% off the loan application fee.',
          'Competitive interest rates are also offered.',
        ],
      },
      {
        title: 'Bahamas Development Bank',
        descriptionLines: [
          'Green Lending Program.',
          'Green financing solutions provide up to 100% financing for electric vehicles and solar systems.',
        ],
        link: 'https://bahamasdevelopmentbank.com/what-we-do/loans/',
      },
    ],
  },
];

const Incentives = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeRegistrySection, setActiveRegistrySection] = useState<RegistryCategory['id'] | null>(
    null
  );

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderRegistryContent = (items: RegistryIncentive[]) => (
    <div className="registry-content">
      <div className="registry-list">
        {items.map((item) => {
          return (
            <article className="registry-item" key={item.title}>
              <h4>{item.title}</h4>
              {item.description && <p>{item.description}</p>}
              {item.descriptionLines && (
                <ul>
                  {item.descriptionLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {item.link}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );

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
          <p className="registry-intro">
            A Registry of Emission Reduction Initiatives and Incentives in The Bahamas can be found
            below.
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

            {registryCategories.map((category) => (
              <div className="faq-item initiative-item" key={category.id}>
                <button
                  type="button"
                  className="faq-question "
                  onClick={() =>
                    setActiveRegistrySection(
                      activeRegistrySection === category.id ? null : category.id
                    )
                  }
                >
                  {category.title}
                </button>

                {activeRegistrySection === category.id && (
                  <div className="faq-answer">{renderRegistryContent(category.items)}</div>
                )}
              </div>
            ))}

            <p className="registry-disclaimer">
              Disclaimer: If you are a private sector representative and would like to have your
              green incentive or initiative posted on this Registry, please contact us via email at{' '}
              <a href="mailto:ner@bahamas.gov.bs" className="text-blue-600 underline">
                ner@bahamas.gov.bs
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
