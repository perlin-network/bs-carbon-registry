import React from 'react';
import { useNavigate } from 'react-router-dom';
import './about.scss';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/news-bg.jpg';

const publications = [
  {
    title:
      'First Biennial Update Report (BUR1)of the Commonwealth of The Bahamas to the United Nations Framework Convention on Climate Change (UNFCCC)',
    date: 'December 2022',
    image: 'http://placehold.it/128x160',
    url: 'https://unfccc.int/documents/624761',
  },
  {
    title: '2024 The Bahamas TNC to the UNFCCC',
    date: 'June 2024',
    image: 'http://placehold.it/128x160',
    url: 'https://unfccc.int/sites/default/files/resource/2024%20The%20Bahamas%20TNC%20to%20the%20UNFCCC.pdf',
  },
];

const news = [
  // {
  //   title:
  //     'Prime Minister Philip Davis Speaks on Climate Impact and Education at St. John’s University (December 12, 2023)',
  //   url: 'https://opm.gov.bs/prime-minister-davis-climate-impact-education-sju/',
  // },
  {
    title: `Prime Minister Philip Davis's Communication on the Emissions Reduction Initiatives and Incentives Regulations, 2025 - Office of the Prime Minister (March 26, 2025)`,
    titleUrl:
      'https://opm.gov.bs/prime-minister-davis-emission-reduction-initiatives-incentives-regulations/',
  },
  {
    title: `Prime Minister Davis announces duty exemption on household appliances with the highest level of energy efficiency will be granted.`,
    url: 'https://www.bahamas.gov.bs/news-press-release/prime-minister-davis-vat-to-be-reduced-to-five-percent-on-a-range-of-products-that-are-crucial-for-the-well-being-of-our-citizens',
    displayName: 'PM Davis Announces VAT Reduction on Essential Products (May 29, 2025)',
  },
];

interface NewsItemProps {
  title: string;
  titleUrl?: string;
  url?: string;
  displayName?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, titleUrl, url, displayName }) => (
  <li className="news-item">
    <span className="news-title">
      {titleUrl ? (
        <a href={titleUrl} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      ) : (
        <> {title}</>
      )}
      {displayName ? (
        <>
          {' - '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {displayName}
          </a>
        </>
      ) : null}
    </span>
  </li>
);

interface PublicationItemProps {
  title: string;
  date: string;
  image: string;
  url: string;
}

const PublicationItem: React.FC<PublicationItemProps> = ({ title, date, image, url }) => (
  <li className="publication-item">
    <img src={image} alt="" className="publication-image" />
    <div className="publication-body">
      <a href={url} target="_blank" className="publication-title">
        {title}
      </a>
      <div className="publication-date">{date}</div>
    </div>
  </li>
);

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <HeroHeader title="Reports" breadcrumbs={['Reports']} backgroundImage={BackgroundJpg} />
      <div className="page-content">
        <div className="container">
          <div className="about-publications">
            <h2 className="about-section-title">Publications:</h2>
            <ul>
              {publications.map((item) => (
                <PublicationItem key={item.title} {...item} />
              ))}
            </ul>
          </div>
          <div className="about-news">
            <h2 className="about-section-title">News and Annoucements:</h2>
            <ol>
              {news.map((item) => (
                <NewsItem key={item.title} {...item} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
