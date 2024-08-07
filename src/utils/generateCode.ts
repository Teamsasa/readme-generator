export const generateCode = (name: string, items: string[]): string => {
  const codeSnippets: { [key: string]: string } = {
    stat: `
      <h2 align="center">📚 GitHub Profile Summary Cards 📚</h2>
      <br/>
      <div align="center">
          <img src="http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${name}&theme=tokyonight"/>
          <img src="http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${name}&theme=tokyonight"/>
          <img src="http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${name}&theme=tokyonight"/>
          <img src="http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${name}&theme=tokyonight"/>
          <img src="http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${name}&theme=tokyonight&utcOffset=9"/>
      </div>`,
    trophy: `
      <h2 align="center">🏆 GitHub Profile Trophy 🏆</h2>
      <br/>
      <div align="center">
          <img src="https://github-profile-trophy.vercel.app/?username=${name}&theme=tokyonight"/>
      </div>`,
  };

  return items.map((item) => codeSnippets[item]).join("\n");
};
