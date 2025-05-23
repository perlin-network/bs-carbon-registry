import './contact.scss';
import { Form, Input, Button, message } from 'antd';
import HeroHeader from '../../Components/HeroHeader/HeroHeader';
import BackgroundJpg from '../../Assets/Images/contact-bg.jpg';
import MapComponent from '../../Components/Maps/MapComponent';
import config from '../../config';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useState } from 'react';

const mapType = config.mapType;
const contactIframeUrl = config.iframurl + '/contact';

const Contact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { post } = useConnection();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await post('national/contact', values);
      message.success('Message sent!');
      console.log(response);
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
              <Form name="contact" layout="vertical" onFinish={onFinish}>
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
                {/* Button triggers form submit */}
                <div className="login-submit-btn-container">
                  <Button type="primary" size="large" htmlType="submit" block loading={loading}>
                    Send Message
                  </Button>
                </div>
              </Form>
              {/* <iframe
                src={contactIframeUrl}
                style={{ width: '100%', height: '450px', flex: 1, border: 'none' }}
              ></iframe> */}
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
