import './signupFrameView.scss';
import config from '../../config';
const signupIframeUrl = config.iframurl + '/signup';
const SignupFrameView = () => {
  return (
    <iframe
      src={signupIframeUrl}
      style={{ width: '100%', height: '100%', flex: 1, border: 'none' }}
    ></iframe>
  );
};
export default SignupFrameView;
