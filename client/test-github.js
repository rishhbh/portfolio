const https = require('https');
https.get('https://github-contributions-api.jasonraimondi.com/v1/rishhbh', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Data:', data.slice(0, 100)));
});
