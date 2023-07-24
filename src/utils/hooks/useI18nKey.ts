import { useTranslation } from 'react-i18next';

interface IProps {
  i18nKey: string;
}

const useI18nKey = ({ i18nKey }: IProps) => {
  const { i18n } = useTranslation();
  switch (i18nKey) {
    case 'en':
      return 'English';
    case 'zh-TW':
      return '繁體中文';
    case 'zh-CN':
      return '简体中文';
    default:
      return i18n.language;
  }
};

export default useI18nKey;
