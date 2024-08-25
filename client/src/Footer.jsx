import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';

function Footer() {
  const {t, i18n} = useTranslation()
  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Français', code: 'fr' },
    { name: 'Italiano', code: 'it' },
    { name: 'Español', code: 'es' },
    { name: 'German', code: 'de' }
  ];

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.value.code);
  };
  return (
    <>
      <div className="footer h-max">
        <div className="flex justify-content-center flex-wrap">
          <div className="flex align-items-center justify-content-center py-5">
            {t('Made to help anybody')}
            <Dropdown
      value={languages.find(lang => lang.code === i18n.language)}
      options={languages}
      onChange={changeLanguage}
      optionLabel="name"
      placeholder="Select a Language"
      className="p-mb-3 max-h-3rem flex align-items-center ml-6 justify-content-center"
    />
          </div>

        </div>
      </div>
    </>
  );
}

export default Footer;
