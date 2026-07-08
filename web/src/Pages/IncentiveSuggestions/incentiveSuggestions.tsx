import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Form, Input, message } from 'antd';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/news-bg.jpg';
import config from '../../config';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import './incentiveSuggestions.scss';

const recaptchaSiteKey = config.recaptchaSiteKey ?? 'REACT_APP_RECAPTCHA_SITE_KEY';

const IncentiveSuggestions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [form] = Form.useForm();
  const { post } = useConnection();

  const formStartRef = useRef(Date.now());

  const onFinish = async (values: any) => {
    if (!recaptchaToken) {
      message.error('Please complete the reCAPTCHA.');
      return;
    }
    try {
      setLoading(true);
      // Include the recaptchaToken in the payload
      const payload = {
        ...values,
        message: values.suggestion,
        subject: 'Green Incentive Suggestion Submission',
        recaptchaToken,
        honeypotValue: values.website,
        elapsedMs: Date.now() - formStartRef.current,
        type: 'suggestion',
      };
      await post('national/contact', payload);
      message.success('Suggestion sent!');
      form.resetFields();
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      formStartRef.current = Date.now();
    } catch (err) {
      message.error('Error occurred');
      console.error(err);
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      formStartRef.current = Date.now();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="incentive-suggestions-container">
      <HeroHeader
        title="Incentives Suggestions"
        breadcrumbs={['Incentives Suggestions']}
        backgroundImage={BackgroundJpg}
      />

      <div className="page-content">
        <div className="container">
          <div className="suggestions-intro">
            <span className="suggestions-kicker">Green Incentives</span>
            <h1>Share your ideas for a greener Bahamas</h1>
            <p>
              Please submit your suggestions and proposals to the Government for incentives and
              initiatives.
            </p>
          </div>

          <div className="suggestion-workspace">
            <div className="suggestion-form-wrap">
              <div className="form-heading">
                <span>Suggestion Box</span>
                <h2>Green Incentive Suggestion Form</h2>
                <p>
                  Share your thoughts for a government-led incentive for reducing emissions and/or
                  saving energy.
                </p>
              </div>

              <Form
                form={form}
                name="green-incentive-suggestion"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Suggestion"
                  name="suggestion"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your green incentive suggestion',
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Example: Reduce import duty on solar panels and energy-efficient equipment..."
                    rows={7}
                  />
                </Form.Item>

                <div className="optional-contact-panel">
                  <div className="contact-info-heading">
                    Contact Information
                    <span>Optional</span>
                  </div>

                  <p className="optional-note">
                    You may share your idea without providing your name or contact information.
                  </p>

                  <Form.Item label="Name" name="name">
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                  <Form.Item label="Website" name="website" hidden className="sr-only">
                    <Input autoComplete="off" tabIndex={-1} aria-hidden="true" />
                  </Form.Item>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'Enter a valid email address',
                      },
                    ]}
                  >
                    <Input placeholder="Enter your email address" />
                  </Form.Item>
                </div>

                <div className="form-footer">
                  <div className="recaptcha-wrap">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      onChange={setRecaptchaToken}
                      onExpired={() => setRecaptchaToken(null)}
                      onErrored={() => setRecaptchaToken(null)}
                    />
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    className="submit-btn"
                  >
                    Submit Suggestion
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          <p className="proposal-note">
            To formally submit a proposal, as a company, for an emission reduction initiative which
            the Government can support, please contact the National Emissions Registry at{' '}
            <a href="mailto:ner@bahamas.gov.bs">ner@bahamas.gov.bs</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncentiveSuggestions;
