const callSpreadsheet = async () => {
  const response = await fetch(
    /** Usando a versão /dev, que em tese deve refletir as mudanças sem precisar dar deploy em uma nova versão.
     *  'https://script.google.com/macros/s/AKfycbwnpSQT3-q4JxhgPZKuos9WyyzDu3dnAMyOcQRR3G7FVLNuNRZ1/exec'
     */
    'https://script.google.com/macros/s/AKfycbwnpSQT3-q4JxhgPZKuos9WyyzDu3dnAMyOcQRR3G7FVLNuNRZ1/dev'
  );
  const responseJson = await response.json();
  const showTagDict = JSON.parse(responseJson);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ShowTagDictReady',
    ShowTagDict: showTagDict
  });
};
if (/ticketsforfun\.com\.br/.test(document.location.hostname))
  callSpreadsheet();
