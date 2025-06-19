import config from '../../config';
const SigninFrameView = () => {
  const signinIframeUrl = config.iframurl + '/continue-application';
  return (
    <iframe
      src={signinIframeUrl}
      style={{ width: '100%', height: '100%', flex: 1, border: 'none' }}
    ></iframe>
  );
};

export default SigninFrameView;
