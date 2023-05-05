import {
  SiCplusplus,
  SiCsharp,
  SiJavascript,
  SiPython,
  SiTypescript,
} from 'react-icons/si';

export const getIconByTag = (title: string) => {
  switch (title) {
    case 'JavaScript':
      return SiJavascript;
    case 'TypeScript':
      return SiTypescript;
    case 'Java':
      return undefined;
    case 'C#':
      return SiCsharp;
    case 'C++':
      return SiCplusplus;
    case 'Python':
      return SiPython;
    default:
      return undefined;
  }
};

export default { getIconByTag };
