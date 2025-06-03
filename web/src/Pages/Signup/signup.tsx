import './signUp.scss';
import { Button, Form, Input, Row, Col, Checkbox, Radio, Space, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import UploadArea from './uploadArea';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useEffect, useState } from 'react';

const gutter = 24;
const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { get, post } = useConnection();
  const [companyTypes, setCompanyTypes] = useState<any[]>([]);
  const [form] = Form.useForm();
  const getCompanyTyes = async () => {
    const response: any = await get('national/signup/company-types');
    const data = response?.data;
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const formatted = Object.entries(data).map(([key, value]) => ({
        key,
        value,
      }));
      setCompanyTypes(formatted);
    } else {
      console.error('Invalid data format for company types:', data);
      setCompanyTypes([]);
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    setLoading(true);
    formData.append('nameOfCompany', values.companyName);
    formData.append('typeOfCompany', values.companyType);
    formData.append('companyWebsite', values.companyWebsite);
    formData.append('companyAddress', values.companyAddress);
    formData.append('isMainCorrespondence', values.isMainAddress || 'false');
    formData.append('mainCorrespondenceAddress', values.correspondenceAddress || '');
    formData.append('primaryRepresentativeName', values.primaryRepresentativeName);
    formData.append('primaryRepresentativeEmail', values.primaryRepresentativeEmail);
    formData.append('secondaryRepresentativeName', values.secondaryRepresentativeName);
    formData.append('secondaryRepresentativeEmail', values.secondaryRepresentativeEmail);
    formData.append('isManagementCompany', values.managementCompany ? 'true' : 'false');
    formData.append('isCarbonCreditPurchaser', values.carbonCreditPurchaser ? 'true' : 'false');
    formData.append('writeSummary', values.summary || '');
    formData.append('evidenceOfRegistration', values.file1?.[0]?.originFileObj || '');
    formData.append('businessLicense', values.file2?.[0]?.originFileObj || '');
    formData.append('financialIntegrity', values.file3?.[0]?.originFileObj || '');
    formData.append('managementDossier', values.file4?.[0]?.originFileObj || '');
    formData.append('scientificExperience', values.file5?.[0]?.originFileObj || '');
    formData.append('financialExpertise', values.file6?.[0]?.originFileObj || '');
    formData.append('environmentalExpertise', values.file7?.[0]?.originFileObj || '');
    try {
      const response = await post('national/signup/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
        },
      });
      if (response?.status === 200 || response?.status === 201) {
        console.log('Success:', response);
        message.success('Account create successfully');
        form.resetFields();
      } else {
        message.error('Error occurred');
        console.error('Submission failed:', response);
      }
    } catch (error) {
      message.error('Error submitting form');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanyTyes();
  }, []);

  return (
    <div className="sign-up">
      <div className="container">
        <h2 className="title">Please Provide Valid Information</h2>
        <div className="form-container">
          <Form form={form} name="sign-up" layout="vertical" onFinish={onFinish}>
            <Row gutter={gutter}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Name of Company"
                  name="companyName"
                  rules={[{ required: true, message: 'Please enter your company name' }]}
                >
                  <Input placeholder="Enter your company name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Type of Company"
                  name="companyType"
                  rules={[{ required: true, message: 'Please select your company type' }]}
                >
                  <Select placeholder="Select company type">
                    {companyTypes.map((option) => (
                      <Select.Option key={option.key} value={option.value}>
                        {option.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={gutter}>
              <Col xs={24} md={12}>
                <Form.Item label="Company Website" name="companyWebsite">
                  <Input placeholder="Enter company website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Company Address"
                  name="companyAddress"
                  rules={[{ required: true, message: 'Please enter your company address' }]}
                >
                  <Input placeholder="Enter company address" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Is this the Main Correspondence Address?"
              name="isMainAddress"
              initialValue={'true'}
            >
              <Row>
                <Radio.Group defaultValue={'true'}>
                  <Radio value={'true'}>Yes</Radio>
                  <Radio value={'false'}>No</Radio>
                </Radio.Group>
              </Row>
            </Form.Item>
            <Form.Item
              label="If/no Main Correspondence Address"
              name="correspondenceAddress"
              dependencies={['isMainAddress']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const isMain = getFieldValue('isMainAddress');
                    if (isMain === 'false' && !value) {
                      return Promise.reject(new Error('Please enter the correspondence address'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input placeholder="Enter correspondence address" />
            </Form.Item>

            <h3 className="group-title">Company Representatives:</h3>

            <Row gutter={gutter}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Primary Representative Name"
                  name="primaryRepresentativeName"
                  rules={[
                    { required: true, message: 'Please enter your primary representative name' },
                  ]}
                >
                  <Input placeholder="Enter primary representative name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Primary Representative Email"
                  name="primaryRepresentativeEmail"
                  rules={[
                    { required: true, message: 'Please enter your primary representative email' },
                  ]}
                >
                  <Input placeholder="Enter primary representative email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={gutter}>
              <Col xs={24} md={12}>
                <Form.Item label="Secondary Representative Name" name="secondaryRepresentativeName">
                  <Input placeholder="Enter secondary representative name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Secondary Representative Email"
                  name="secondaryRepresentativeEmail"
                >
                  <Input placeholder="Enter secondary representative email" />
                </Form.Item>
              </Col>
            </Row>

            <Space direction="vertical" size="middle">
              <Form.Item name="managementCompany" valuePropName="checked" noStyle>
                <Checkbox>Application to be Management Company</Checkbox>
              </Form.Item>
              <Form.Item name="carbonCreditPurchaser" valuePropName="checked">
                <Checkbox>Application to be Carbon Credit Purchaser</Checkbox>
              </Form.Item>
            </Space>

            <Form.Item label="Write Summary" name="summary">
              <Input.TextArea
                placeholder="Please Provide a 1,000 word summary of your company..."
                rows={6}
                maxLength={1000}
                showCount
              />
            </Form.Item>

            <h3 className="group-title">Upload Following Documents:</h3>

            <Row gutter={gutter}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Evidence of Registration with Securities Commission"
                  name="file1"
                  rules={[
                    {
                      required: true,
                      message:
                        'Please upload your Evidence of Registration with Securities Commission',
                    },
                  ]}
                >
                  <UploadArea name="file1" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Copy of Business License"
                  name="file2"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload your Copy of Business License',
                    },
                  ]}
                >
                  <UploadArea name="file2" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Proof of Financial Integrity"
                  name="file3"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload your Proof of Financial Integrity',
                    },
                  ]}
                >
                  <UploadArea name="file3" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Dossier of Management Company"
                  name="file4"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload your Dossier of Management Company',
                    },
                  ]}
                >
                  <UploadArea name="file4" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Proof of Scientific Experience"
                  name="file5"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload your Proof of Scientific Experience',
                    },
                  ]}
                >
                  <UploadArea name="file5" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Proof of Financial Expertise"
                  name="file6"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload your Proof of Financial Expertise',
                    },
                  ]}
                >
                  <UploadArea name="file6" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Proof of Environmental Expertise"
                  name="file7"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload your Proof of Environmental Expertise',
                    },
                  ]}
                >
                  <UploadArea name="file7" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="action-buttons">
              <Space direction="horizontal" size="middle">
                <Button onClick={() => navigate('/')}>Cancel</Button>
                <Button type="primary" size="large" htmlType="submit" block loading={loading}>
                  Sign Up
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
