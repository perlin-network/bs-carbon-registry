import React, { useState } from 'react';
import './faqs.scss';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/news-bg.jpg';

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQ[] = [
  {
    question: 'What is the National Emissions Registry (NER)?',
    answer: (
      <p>
        The National Emissions Registry, or the NER, is a Unit within the Office of the Prime
        Minister. The NER is responsible for maintaining a register of emissions reductions, as well
        as issuing emission allocations, and developing emission reduction initiatives and
        incentives for The Bahamas. The complete functions of the NER can be found under Part VII of
        the Climate Change and Carbon Markets Initiative Act, 2022, and within the Emission
        Reduction Initiatives and Incentives Regulations, 2025.
      </p>
    ),
  },
  {
    question:
      'Why is the Government of The Bahamas focused on reducing the country’s Greenhouse Gas emissions?',
    answer: (
      <p>
        Although small island nations like The Bahamas contribute minimally to global emissions, the
        country is committed to reducing greenhouse gases as part of the global transition to
        cleaner energy. Additionally, relying on outdated fossil fuel technology is becoming
        increasingly expensive and unsustainable. Shifting to sustainable energy solutions will
        reduce dependency on imported fuels, and increase cost savings, benefitting the country and
        Bahamians.
      </p>
    ),
  },
  {
    question: 'What are the Emission Reduction Initiatives and Incentives Regulations, 2025?',
    answer: (
      <p>
        The Emission Reduction Initiatives and Incentives Regulations, 2025 were developed to
        support The Bahamas’ Climate Change and Carbon Market Initiative Act, 2022. The Regulations
        will help the country achieve its goal of reducing national emissions by 30% and increasing
        renewable energy by 30% by the year 2030. <br />
        <br />
        The Regulations will also support the Government and private sector in recording relevant
        data for GHG emissions and implementing effective emission reduction initiatives and
        incentives.
        <br />
        <a
          href="/downloads/Emissions Reduction Initiatives and Incentives Regulations 2025.pdf"
          target="_blank"
          download
          className="text-blue-600 underline"
        >
          Download Regulations here
        </a>
      </p>
    ),
  },
  {
    question: 'What is an emission reduction initiative?',
    answer: (
      <p>
        An emission reduction initiative is a program designed to help reduce an entity’s greenhouse
        gas emissions and improve sustainability. Participants in these initiatives may also qualify
        for emission reduction incentives. You can either participate in a Government-led emission
        reduction initiative or propose your own.
        <br />
        <br />
        To participate and receive benefits, individuals or entities must make an application to the
        National Emissions Registry. This ensures that the Registry fulfills its function in
        recording emission reduction initiatives throughout the country.
      </p>
    ),
  },
  {
    question: 'How do I access incentives?',
    answer: (
      <p>
        You will need an emission reduction initiative permit. Applications can be made through the
        National Emissions Registry Portal.
      </p>
    ),
  },
  {
    question: 'What is an activity data questionnaire?',
    answer: (
      <p>
        An activity data questionnaire collects information on activities that produce greenhouse
        gas emissions, such as fuel consumption for energy use. These short questionnaires will
        include details such as the amount of fuel consumed over a period of time, the type of fuels
        used, the number of electric vehicles, etc. Each sector will have its own designated
        questionnaire for completion.
      </p>
    ),
  },
  {
    question: 'Why do I have to complete an activity data questionnaire?',
    answer: (
      <p>
        We cannot manage what we do not track! Activity data is an integral part of calculating how
        much greenhouse gas an entity emits. More data leads to better-informed decisions that
        translate to a better quality of living.
      </p>
    ),
  },
  {
    question: 'Who is required to complete an activity data questionnaire?',
    answer: (
      <p>
        Under the <em>Emission Reduction Initiatives and Incentives Regulations, 2025,</em>
        any entity operating in a sector identified in The Bahamas&apos; Nationally Determined
        Contributions (NDC) must be registered with the National Emissions Registry. The Registrar
        will then select registered entities to submit a completed activity data questionnaire.
        <br />
        <br />
        If you are unsure whether this applies to you, please contact us at{' '}
        <a href="mailto:ner@bahamas.gov.bs" className="text-blue-600 underline">
          ner@bahamas.gov.bs
        </a>{' '}
        or <a href="tel:+12423275826">(242) 327-5826</a>.
      </p>
    ),
  },
  {
    question: 'What happens if I do not complete an activity data questionnaire?',
    answer: (
      <p>
        For those who are required to fill out an activity data questionnaire, if you do not
        complete it by the indicated deadline, a fine will be applied (see Regulation 15 (7)).
      </p>
    ),
  },
  {
    question: 'What is an emission allocation?',
    answer: (
      <p>
        An emission allocation is an allowance that will be assigned to high-emitting entities
        through a permit. This allowance gives a limit on the amount of emissions an entity can emit
        within a designated time period. Allowances may be canceled.
      </p>
    ),
  },
  {
    question: 'What happens if an entity exceeds its emission allocation target?',
    answer: (
      <p>
        Where an entity exceeds the emission allocation specified in its permit, the entity commits
        an offence and is liable to a fine. If an entity does not meet its emission allocation
        target that entity may be subject to a fine.
      </p>
    ),
  },
  {
    question: 'How can I reduce my Greenhouse Gas emissions?',
    answer: (
      <p>
        There are many ways that an entity can reduce its emissions to be more sustainable or to
        meet its emission allowance. This may involve adopting new or existing renewable energy
        technologies, improving energy efficiency, or implementing more sustainable practices. If
        you need any assistance, you can contact the National Emissions Registry directly at{' '}
        <a href="mailto:ner@bahamas.gov.bs" className="text-blue-600 underline">
          ner@bahamas.gov.bs
        </a>
        .
      </p>
    ),
  },
  {
    question: 'How do I sign up as a Domestic Reporting Entity?',
    answer: (
      <p>
        Please click the sign up button to view the video titled “How to sign up as a domestic
        reporting entity” for guidance. Should you need any assistance, kindly contact the National
        Emissions Registry at{' '}
        <a href="mailto:ner@bahamas.gov.bs" className="text-blue-600 underline">
          ner@bahamas.gov.bs
        </a>
        .
      </p>
    ),
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="incentive-container">
      <HeroHeader title="Faqs" breadcrumbs={['Faqs']} backgroundImage={BackgroundJpg} />
      <div className="page-content">
        <div className="faq-container">
          <h1 className="faq-heading">Frequently Asked Questions (FAQs)</h1>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button onClick={() => toggleFaq(index)} className="faq-question">
                  {faq.question}
                </button>
                {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
