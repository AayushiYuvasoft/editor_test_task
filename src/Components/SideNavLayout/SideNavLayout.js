import { jsonData } from '@/constant/data';
import React, { useState } from 'react';

const SideNavLayout = ({renderFolder}) => {
  return (
    <div>
      {jsonData.map((folder) => renderFolder(folder))}
    </div> 
     );
};

export default SideNavLayout;
