import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName
} from 'carbon-components-react/lib/components/UIShell';
import { SkipToContent } from 'carbon-components-react';
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';

export const AppHeader = () => {
  return (
    <Header aria-label="IBM Platform Name">
      <SkipToContent />
      <HeaderName href="#" prefix="">
        <img src={'assets/images/logo/logo_white_large.png'} width="110" height="25" alt="Logo" />
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
