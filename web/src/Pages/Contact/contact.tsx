import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './contact.scss';
import { Form, Input, Button, message } from 'antd';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/contact-bg.jpg';
import MapComponent from '../../Components/Maps/MapComponent';
import config from '../../config';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
// Replace with your actual reCAPTCHA v2 site key
console.log('Recaptcha Key:', config.recaptchaSiteKey);
const recaptchaSiteKey = config.recaptchaSiteKey ?? 'REACT_APP_RECAPTCHA_SITE_KEY';

const mapType = config.mapType;

const Contact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
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
        recaptchaToken,
        honeypotValue: values.website,
        elapsedMs: Date.now() - formStartRef.current,
      };
      await post('national/contact', payload);
      message.success('Message sent!');
      form.resetFields();
      setRecaptchaToken(null);
      formStartRef.current = Date.now();
    } catch (err) {
      message.error('Error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="contact-container">
      <HeroHeader title="Contact Us" breadcrumbs={['Contact Us']} backgroundImage={BackgroundJpg} />
      <div className="page-content">
        <div className="container">
          <div className="section-row">
            <div className="section-column">
              <h2>Hello, Any Questions?</h2>
              <Form form={form} name="contact" layout="vertical" onFinish={onFinish}>
                <Form.Item label="Name" name="name">
                  <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input placeholder="Enter your email address" />
                </Form.Item>
                <Form.Item label="Message" name="message">
                  <Input.TextArea placeholder="Your message..." rows={6} />
                </Form.Item>
                <Form.Item label="Website" name="website" className="sr-only">
                  <Input autoComplete="off" tabIndex={-1} aria-hidden="true" />
                </Form.Item>
                <div style={{ marginBottom: 16 }}>
                  <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={setRecaptchaToken} />
                </div>
                {/* Button triggers form submit */}
                <div className="login-submit-btn-container">
                  <Button type="primary" size="large" htmlType="submit" block loading={loading}>
                    Send Message
                  </Button>
                </div>
              </Form>
            </div>
            <div className="section-column">
              <MapComponent
                mapType={mapType}
                center={[-77.038058, 24.58857]}
                zoom={5}
                height={350}
                style="mapbox://styles/mapbox/streets-v11"
              ></MapComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
