const callSpreadsheet = async () => {
  const response = await fetch(
    /** Usando a versão /dev, que em tese deve refletir as mudanças sem precisar dar deploy em uma nova versão.
     *  'https://script.google.com/macros/s/AKfycbwnpSQT3-q4JxhgPZKuos9WyyzDu3dnAMyOcQRR3G7FVLNuNRZ1/exec'
     */
    //'https://script.google.com/macros/s/AKfycbwnpSQT3-q4JxhgPZKuos9WyyzDu3dnAMyOcQRR3G7FVLNuNRZ1/dev'
    'https://script.googleusercontent.com/a/macros/raccoon.ag/echo?user_content_key=BE8AkjtS-VzSIU6KdZpkmdvOAyBc8f4Loa3sPnyXnILOyH_Zv50NR-kho9NqRlravwCIS_B3vy85FOquWWglWrTYm_0s2hAGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_znu-QG1bDc2kc3c3WduKtKRaZ5dCdzsK_cPt-9sL2sEWkxSqzGfEdXzM1UAKByClN360qsyesEPbS1ZKgmGnnaSZRe-_Z6h7hlgo3jS_cH4&lib=MkuCK64gRAHvDYl9-WgKMUX22WVp6P5tO'
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
