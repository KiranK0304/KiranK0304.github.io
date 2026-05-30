const portfolioScripts = [
  'js/project-data.js',
  'js/main.js'
];

portfolioScripts.forEach((src) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});
