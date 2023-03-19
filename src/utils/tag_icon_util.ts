import { SiCss3, SiHtml5, SiJavascript } from 'react-icons/si';

export const getIconByTagId = (id: string) => {
  switch (id) {
    case 'js_id':
      return SiJavascript;
    case 'html_id':
      return SiHtml5;
    case 'css_id':
      return SiCss3;
    default:
      return undefined;
  }
};

export default { getIconByTagId };
