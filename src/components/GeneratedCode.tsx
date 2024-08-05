import React from 'react';

interface GeneratedCodeProps {
  code: string;
}

const GeneratedCode: React.FC<GeneratedCodeProps> = ({ code }) => {
  return (
    <pre className="bg-gray-100 p-4 mt-4">
      <code>{code}</code>
    </pre>
  );
}

export default GeneratedCode;
