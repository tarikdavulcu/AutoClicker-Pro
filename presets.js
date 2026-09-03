const PRESETS = [
  {
    id: 'adbs',
    nameKey: 'presetAdbsName',
    name: 'ADBS - Amatör Denizci Eğitim',
    sitePattern: '*://adbs.uab.gov.tr/*',
    timer: {
      enabled: true,
      selector: 'h5.mb-0',
      targetValue: '00:00'
    },
    preAction: null,
    button: {
      selector: 'dx-button[aria-label="İleri"]',
      textMatch: 'İleri'
    },
    interval: 1000,
    delay: 500,
    maxClicks: 0,
    cooldown: 3000
  },
  {
    id: 'generic-education',
    nameKey: 'presetGenericName',
    name: 'Genel Eğitim Platformu',
    sitePattern: '',
    timer: {
      enabled: true,
      selector: '',
      targetValue: '00:00'
    },
    preAction: null,
    button: {
      selector: '',
      textMatch: 'İleri|Devam|Next|Continue|Sonraki|Submit|Son'
    },
    interval: 1000,
    delay: 500,
    maxClicks: 0,
    cooldown: 3000
  }
];

if (typeof module !== 'undefined') module.exports = PRESETS;
