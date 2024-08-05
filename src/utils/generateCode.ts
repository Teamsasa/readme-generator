export const generateCode = (name: string, items: string[]): string => {
    const codeSnippets: { [key: string]: string } = {
      stat: `const stats = { name: "${name}", value: 100 };`,
      trophy: `const trophy = { name: "${name}", title: "Champion" };`,
    };
  
    return items.map((item) => codeSnippets[item]).join('\n');
  }
  