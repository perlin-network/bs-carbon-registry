import { ExclamationCircleOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Modal } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import lockIcon from '../../Assets/Images/lock.svg';

export interface ChangePasswordProps {
  onPasswordChanged: any;
  onFieldsChanged: any;
  onCanceled: any;
  openModal: any;
  errorMsg: any;
  loadingBtn: boolean;
}

const ChangePasswordModel: FC<ChangePasswordProps> = (props: ChangePasswordProps) => {
  const { onPasswordChanged, onFieldsChanged, onCanceled, openModal, errorMsg, loadingBtn } = props;
  const { i18n, t } = useTranslation(['passwordReset']);

  return (
    <Modal
      width={450}
      title={
        <div className="popup-header">
          <div className="icon">
            <img alt="icon" src={lockIcon}></img>
          </div>
          <div>{t('passwordReset:changePassword')}</div>
        </div>
      }
      open={openModal}
      className={'popup-success password-reset-model'}
      centered={true}
      destroyOnClose={true}
      footer={null}
      onCancel={onCanceled}
    >
      <Form
        name="change_password"
        layout="vertical"
        className="login-form"
        onFieldsChange={onFieldsChanged}
        onFinish={onPasswordChanged}
      >
        <Form.Item
          className="mg-top-1"
          name="oldPassword"
          label={t('passwordReset:oldPassword')}
          rules={[
            {
              required: true,
              message: `${t('passwordReset:oldPassword')} ${t('passwordReset:isRequired')}`,
            },
          ]}
        >
          <Input.Password placeholder="" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={t('passwordReset:newPassword')}
          rules={[
            {
              required: true,
              message: `${t('passwordReset:newPassword')} ${t('passwordReset:isRequired')}`,
            },
          ]}
        >
          <Input.Password placeholder="" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label={t('passwordReset:confirmNewPassword')}
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: `${t('passwordReset:confirmNewPassword')} ${t('passwordReset:isRequired')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t('passwordReset:passwordsNotMatchedErr').toString())
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="" />
        </Form.Item>

        {errorMsg && <Alert className="error" message={errorMsg} type="error" showIcon />}

        <div className="mg-top-2 ant-modal-footer">
          <Button htmlType="button" onClick={onCanceled}>
            {t('passwordReset:cancel')}
          </Button>
          <Button className="mg-left-2" type="primary" htmlType="submit" loading={loadingBtn}>
            {t('passwordReset:setPassword')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModel;
