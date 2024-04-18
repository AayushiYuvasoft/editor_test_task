"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SideNavLayout from '@/Components/SideNavLayout/SideNavLayout';
import Tabs from '@/Components/Tabs/Tabs';
import { jsonData } from '@/constant/data';
import LangugageSelector from '../LanguageSelector/LangugageSelector';
import axios from 'axios';
import { Langugage_version } from '@/constant/Language';
import Image from 'next/image';
import uploadIcon from '../../assets/icons/UploadContractIcon.svg'

const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false });

const CodeEditor = () => {
  const [selectedFileContent, setSelectedFileContent] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [tab, setTab] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeTab) {
      handleTabClick(activeTab);
    } else {
      setSelectedFileContent('Start coding here!');
    }
  }, [activeTab]);

  const handleFileClick = (fileName, content) => {
    setActiveTab(fileName);
    setSelectedFileContent(content);
    if (!tab.includes(fileName)) {
      setTab([...tab, fileName]);
    }
  };

  const handleTabClick = (fileName) => {
    const file = jsonData.find(folder => {
      return folder.contents.some(subItem => {
        if (subItem.type === 'folder') {
          return subItem.contents.some(item => item.name === fileName);
        } else {
          return subItem.name === fileName;
        }
      });
    });

    if (file) {
      const selectedFile = file?.contents?.map(content => (
        content.contents.find(item => item.name === fileName)
      )).find(item => item !== undefined);
      setSelectedFileContent(selectedFile ? selectedFile.content : 'Start coding here!');
    } else {
      setSelectedFileContent('Start coding here!');
    }
  };

  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };

  const onChange = (newValue, e, monaco) => {
    setSelectedFileContent(newValue);
  };

  const handleExecute = async () => {
    console.log('handleExecute called');

    try {
      const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
        language: language,
        version: Langugage_version[language],
        files: [{ content: selectedFileContent }]
      });
      if (response.data.run.stdout) {
        setOutput(response.data.run.stdout);
        setError('');
      } else if (response.data.run.stderr) {
        setError(response.data.run.stderr);
        setOutput('');
      }
    } catch (error) {
      console.error('Error executing code:', error);
      setError('An error occurred while executing the code.');
      setOutput('');
    }
  };

  const handleCloseTab = (fileName) => {
    setTab(tab.filter((name) => name !== fileName));
    if (activeTab === fileName) {
      setActiveTab('');
      setSelectedFileContent('Start coding here!');
    }
  };

  const renderFolder = (folder) => (
    <div key={folder.name}>
      <h3>{folder.name}</h3>
      <ul>
        {folder.contents.map((item) => (
          item.type === 'folder' ? (
            renderFolder(item)
          ) : (
            <li
              key={item.name}
              onClick={() => handleFileClick(item.name, item.content)}
              style={{ marginLeft: item.type === 'file' ? '30px' : '10px' }}
            >
              {item.name}
            </li>
          )
        ))}
      </ul>
    </div>
  );

  return (
    <div className='bg-secondary p-4'>
      <div className='flex justify-between items-center'>
        <div className='project-detail-header flex items-center'>
          <Image src={uploadIcon} width={22} height={26} className='mr-2.5' />
          <p className='text-white'>Sample Project</p>
        </div>
        <div className='btm-wrapper gap-3'>
          <button className='btn-primary text-white rounded-sm px-8 py-2' onClick={handleExecute}>
            Audit Now
          </button>
          <button className='btn-secondary text-white rounded-sm px-8 py-2'>
            Options
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/4 p-4 text-stone-200">
          <SideNavLayout renderFolder={renderFolder} />
        </div>
        <div className="w-2/4 p-4">
          <Tabs tab={tab} handleCloseTab={handleCloseTab} handleTabClick={handleTabClick} activeTab={activeTab} />
          <MonacoEditor
            width="100%"
            height="600"
            language={language}
            theme="vs-dark"
            value={selectedFileContent}
            editorDidMount={editorDidMount}
            onChange={onChange}
          />
        </div>
        <div className="mt-4 w-1/4">
          <LangugageSelector setLanguage={setLanguage} />
          <hr />
          <div className='text-stone-200'>{output}</div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
