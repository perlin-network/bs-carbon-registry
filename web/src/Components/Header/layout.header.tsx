import './layout.header.scss';
import { useTranslation } from 'react-i18next';
import { HeaderProps } from '../../Definitions/InterfacesAndType/layout.header';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { useNavigate } from 'react-router-dom';
import thumbnail from '../../Assets/Images/thumbnail.png';

const LayoutHeader = (props: HeaderProps) => {
  const navigate = useNavigate();
  const { userInfoState } = useUserContext();
  const { i18n } = useTranslation(['common', 'login']);
  // const handleLanguageChange = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };
  const companyLogo = userInfoState?.companyLogo;

  return (
    <div className="header-container">
      <div className="header-prof">
        <div className="header-country-logo">
          <img
            src={companyLogo as string}
            alt="logo"
            onClick={() => {
              navigate('/userProfile/view');
            }}
          />
        </div>
        <img src={thumbnail} alt="thumbnail" style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default LayoutHeader;
