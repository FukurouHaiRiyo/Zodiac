import React, { useState } from 'react';
import Brand from './Brand';
import Header from './Header';

const AppHeader = () => {
  const [state, setState] = useState<boolean>(false);

  return (
    <header>
      <Brand state={state} setState={setState} />
      <Header state={state} setState={setState}/>
    </header>
  );
};

export default AppHeader;
