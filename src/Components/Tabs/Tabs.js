import React from 'react'

const Tabs = ({ tab ,handleCloseTab ,handleTabClick, activeTab}) => {

  return (
    <div className='text-stone-200'>
      <h3>Tabs:</h3>
      <ul className='flex gap-4'>
        {tab.map((fileName, index) => (
          <li key={index} className={activeTab === fileName ? 'active-tab' : ''} onClick={() => handleTabClick(fileName)}>
            {fileName}
            <button onClick={() => handleCloseTab(fileName)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs