import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      thirdiary: string;
      tag: string;
      selected: string;
      checked: string;
      label: string;
    };
    customBorders: {
      primary: string;
      thirdiary: string;
    };
    customBackgrounds: {
      buttonPrimary: string;
      buttonHover: string;
      buttonDisabled: string;
    };
  }

  interface ThemeOptions {
    customColors?: {
      thirdiary?: string;
      tag?: string;
      selected?: string;
      checked?: string;
      label?: string;
    };
    customBorders?: {
      primary?: string;
      thirdiary?: string;
    };
    customBackgrounds?: {
      buttonPrimary?: string;
      buttonHover?: string;
      buttonDisabled?: string;
    };
  }
}
