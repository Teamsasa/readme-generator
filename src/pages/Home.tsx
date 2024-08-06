import React, { useState } from 'react';
import Input from '../components/Input';
import Selector from '../components/Selector';
import Button from '../components/Button';
import GeneratedCode from '../components/GeneratedCode';
import { generateCode } from '../utils/generateCode';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [code, setCode] = useState('');

  const handleGenerateCode = () => {
    const generatedCode = generateCode(name, selectedItems);
    setCode(generatedCode);
  }

  return (
    <div className="container mx-auto p-4">
      <Input value={name} onChange={setName} placeholder="Enter your name" />
      <Selector selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      <Button onClick={handleGenerateCode}>Generate Code</Button>
      <GeneratedCode code={code} />
    </div>
  );
}

export default Home;
