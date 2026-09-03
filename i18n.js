const I18N = {
  tr: {
    language: 'Dil',
    status: 'Durum',
    profileSettings: 'Profil Ayarları',
    howToUse: 'Nasıl Kullanılır?',
    totalClicks: 'Toplam tıklama',
    lastClick: 'Son tıklama',
    noClicks: 'Henüz tıklama yapılmadı.',
    activeProfile: 'Aktif Profil',
    noProfile: 'Bu site için profil yok',
    noProfilesYet: 'Henüz profil yok.',

    optTitle: 'Profil Yönetimi',
    optNewProfile: 'Yeni Profil',
    optEditProfile: 'Profili Düzenle',
    optDeleteProfile: 'Sil',
    optSave: 'Kaydet',
    optCancel: 'İptal',
    optImportPresets: 'Hazır Profilleri Ekle',
    optProfileName: 'Profil Adı',
    optSitePattern: 'Site URL Kalıbı',
    optSitePatternHelp: 'Örn: *://adbs.uab.gov.tr/* veya *://example.com/*',
    optTimerEnabled: 'Sayaç var mı?',
    optTimerSelector: 'Sayaç CSS Selector',
    optTimerSelectorHelp: 'Sayacı içeren HTML elemanının CSS selector\'ı',
    optTimerTarget: 'Hedef Değer',
    optTimerTargetHelp: 'Sayaç bu değere ulaşınca buton tıklanır (ör: 00:00)',
    optPreAction: 'Ön İşlem (Opsiyonel)',
    optPreActionHelp: 'Butona basmadan önce seçilmesi gereken element (radio, checkbox, dropdown vb.)',
    optPreActionSelector: 'Ön İşlem Selector',
    optPreActionType: 'İşlem Tipi',
    optPreActionClick: 'Tıkla',
    optPreActionCheck: 'İşaretle (checkbox)',
    optPreActionSelect: 'Seç (dropdown)',
    optPreActionValue: 'Değer (dropdown için)',
    optButtonSelector: 'Buton CSS Selector',
    optButtonSelectorHelp: 'Tıklanacak butonun CSS selector\'ı',
    optButtonText: 'Buton Metin Eşleşmesi',
    optButtonTextHelp: 'Buton metninde aranacak kelime (ör: İleri, Devam, Next)',
    optInterval: 'Kontrol Aralığı (ms)',
    optDelay: 'Tıklama Gecikmesi (ms)',
    optPickFromPage: 'Sayfadan Seç',
    optPickerActive: 'Sayfada bir element seçin...',
    optTiming: 'Zamanlama',
    optUnnamedProfile: 'İsimsiz Profil',
    phName: 'Örn: ADBS Eğitim',
    phOptional: '(opsiyonel)',
    phDropdown: '(dropdown için)',
    timerOn: 'Sayaç',
    timerOff: 'Sayaç yok',
    timerAuto: 'otomatik',
    buttonLabel: 'Buton',
    preActionLabel: 'Ön işlem',
    emergencyStop: 'Acil Durdur',
    emergencyResume: 'Devam Et',
    optWizard: 'Sihirbaz',
    optMaxClicks: 'Maksimum tıklama',
    optMaxClicksHelp: '0 = sınırsız. Bu oturumda bu sayıya ulaşınca durur.',
    optCooldown: 'Tıklamalar arası bekleme (ms)',
    optCooldownHelp: 'Peş peşe basmayı önler. Örn: 3000 = 3 saniye.',
    wizTitle: 'Profil Sihirbazı',
    wizNext: 'İleri',
    wizBack: 'Geri',
    wizSkip: 'Atla',
    wizFinish: 'Kaydet ve Bitir',
    wizUseSite: 'Listeyi yenile',
    wizSelectTab: 'Açık sekmelerden seç',
    wizNoTabs: 'Açık web sitesi sekmesi yok. Önce siteyi bir sekmede açın.',
    wizStep1: '1 / 5 — Site',
    wizStep1Desc: 'Açık sekmeler listesinden otomasyonun çalışacağı siteyi seçin. Ad ve adres otomatik dolar.',
    wizStep2: '2 / 5 — Sayaç',
    wizStep2Desc: 'Sayfada geri sayım varsa seçin. Yoksa “Sayaç yok” deyin.',
    wizHasTimer: 'Sayaç var',
    wizNoTimer: 'Sayaç yok',
    wizPickTimer: 'Sayacı sayfadan seç',
    wizStep3: '3 / 5 — Buton',
    wizStep3Desc: 'Tıklanacak butonu sayfada işaretleyin (İleri, Devam, Next…).',
    wizPickButton: 'Butonu sayfadan seç',
    wizPickHint: 'Bu butona basınca seçtiğiniz site sekmesi açılır. Oradaki İleri / Devam butonuna tıklayın. Bitince bu sayfaya otomatik dönülür.',
    wizPickFailed: 'Sayfaya bağlanılamadı. Site sekmesini yenileyip (F5) tekrar deneyin.',
    wizStep4: '4 / 5 — Ön işlem',
    wizStep4Desc: 'Butondan önce bir kutu işaretlenecekse seçin. Yoksa atlayın.',
    wizPickPre: 'Ön işlemi sayfadan seç',
    wizStep5: '5 / 5 — Limitler',
    wizStep5Desc: 'İsterseniz tıklama sayısı ve bekleme süresi koyun.',
    wizPicked: 'Seçildi',
    wizNeedSite: 'Önce bir web sitesi sekmesi açın.',
    wizNeedButton: 'Buton seçin veya buton metni yazın.',

    balloonWaiting: 'Sayaç bekleniyor…',
    balloonTimer: 'Kalan süre',
    balloonReady: 'Buton bekleniyor…',
    balloonClicked: 'Tıklandı',
    balloonCooldown: 'Bekleme',
    balloonLimit: 'Tıklama limitine ulaşıldı',
    balloonStopped: 'Durduruldu',
    balloonHint: 'Ctrl+Shift+X ile durdur / devam',

    guideTitle: 'Kullanım Kılavuzu',
    guideStep1Title: '1. Uzantıyı Kurun',
    guideStep1Desc: 'chrome://extensions sayfasını açın, Geliştirici modunu aktifleştirin, "Paketlenmemiş uzantı yükle" butonuna tıklayın ve uzantı klasörünü seçin.',
    guideStep2Title: '2. Profil Oluşturun',
    guideStep2Desc: 'Popup\'taki "Profil Ayarları"nı açın. En kolayı "Sihirbaz"dır: siteyi, sayacı ve butonu adım adım seçersiniz. İsterseniz "Yeni Profil" ile elle de doldurabilirsiniz.',
    guideStep3Title: '3. Site URL Kalıbını Girin',
    guideStep3Desc: 'Otomasyonun çalışacağı site adresini girin. Örn: *://adbs.uab.gov.tr/* Yıldız (*) herhangi bir metin anlamına gelir.',
    guideStep4Title: '4. Sayacı Ayarlayın',
    guideStep4Desc: 'Sayfada geri sayım varsa "Sayaç var mı?" seçeneğini açın. Sayacın CSS selector\'ını girin veya "Sayfadan Seç" butonuyla seçin. Hedef değeri yazın (genelde 00:00).',
    guideStep5Title: '5. Buton Ayarlayın',
    guideStep5Desc: 'Tıklanacak butonun CSS selector\'ını girin veya metin eşleşmesi yazın (İleri, Devam, Next vb.). İkisini de girerseniz önce selector denenir.',
    guideStep6Title: '6. Ön İşlem (İsteğe Bağlı)',
    guideStep6Desc: 'Buton tıklanmadan önce bir checkbox işaretlenmeli veya bir dropdown seçilmeliyse, ön işlem bölümünü doldurun.',
    guideStep7Title: '7. Selector Nasıl Bulunur?',
    guideStep7Desc: 'Sayfadaki herhangi bir elemente sağ tıklayıp "İncele (Inspect)" seçin. Açılan panelde element vurgulanır. Üzerine sağ tıklayıp Copy > Copy selector seçin.',
    guideQuickStartTitle: 'Hızlı Başlangıç - ADBS Örneği',
    guideQuickStartHtml: 'ADBS (Amatör Denizci Eğitim) sitesi için hazır profil mevcuttur. Uzantı ayarlarına girip <strong>"Hazır Profilleri Ekle"</strong> butonuna tıklayın. ADBS profili otomatik eklenir ve <code>adbs.uab.gov.tr</code> adresinde hemen çalışmaya başlar.',
    guideTimerHtml: '<strong>Sayaç:</strong> <code>h5.mb-0</code> (Kalan Zaman yanındaki element)',
    guideButtonHtml: '<strong>Buton:</strong> <code>dx-button[aria-label="İleri"]</code>',
    guideTargetHtml: '<strong>Hedef:</strong> Sayaç <code>00:00</code> olunca İleri butonuna otomatik tıklar.',
    faqTitle: 'Sık Sorulan Sorular',
    faq1q: 'S: Selector nasıl bulunur?',
    faq1a: 'Sayfadaki elemente sağ tıklayın → "İncele (Inspect)" seçin → Açılan panelde vurgulanan elemente sağ tıklayın → Copy → Copy selector.',
    faq2q: 'S: Birden fazla site için kullanabilir miyim?',
    faq2a: 'Evet, her site için ayrı profil oluşturabilirsiniz.',
    faq3q: 'S: Sayaç olmadan çalışır mı?',
    faq3a: 'Evet, "Sayaç var mı?" seçeneğini kapalı bırakın. Bu durumda buton aktif olduğu anda tıklanır.',
    faq4q: 'S: Ön işlem ne işe yarar?',
    faq4a: 'Bazı sayfalarda butona basmadan önce bir checkbox işaretlenmeli veya dropdown\'dan seçim yapılmalıdır. Ön işlem bunu otomatik yapar.',
    faq5q: 'S: Uzantı neden çalışmıyor?',
    faq5a: '1. Popup\'tan uzantının aktif olduğunu kontrol edin.<br>2. Site URL kalıbının doğru girildiğinden emin olun.<br>3. Selector\'ların doğru olduğunu "Sayfadan Seç" ile kontrol edin.<br>4. Sayfayı yenileyin (F5).',
    faq6q: 'S: Durum balonu ve acil durdur nedir?',
    faq6a: 'Eşleşen bir profil varsa sayfanın sağ altında durum görünür. "Durdur" veya Ctrl+Shift+X otomasyonu keser. "Devam Et" ile yeniden başlar.',
    faq7q: 'S: Tıklama limiti ve bekleme ne işe yarar?',
    faq7a: 'Limit, bu oturumda kaç kez basılacağını sınırlar. Bekleme, aynı butona peş peşe basılmasını önler.'
  },
  en: {
    language: 'Language',
    status: 'Status',
    profileSettings: 'Profile Settings',
    howToUse: 'How to Use',
    totalClicks: 'Total clicks',
    lastClick: 'Last click',
    noClicks: 'No clicks yet.',
    activeProfile: 'Active Profile',
    noProfile: 'No profile for this site',
    noProfilesYet: 'No profiles yet.',

    optTitle: 'Profile Management',
    optNewProfile: 'New Profile',
    optEditProfile: 'Edit Profile',
    optDeleteProfile: 'Delete',
    optSave: 'Save',
    optCancel: 'Cancel',
    optImportPresets: 'Import Preset Profiles',
    optProfileName: 'Profile Name',
    optSitePattern: 'Site URL Pattern',
    optSitePatternHelp: 'E.g.: *://adbs.uab.gov.tr/* or *://example.com/*',
    optTimerEnabled: 'Has countdown timer?',
    optTimerSelector: 'Timer CSS Selector',
    optTimerSelectorHelp: 'CSS selector of the element containing the countdown',
    optTimerTarget: 'Target Value',
    optTimerTargetHelp: 'Button clicks when timer reaches this value (e.g. 00:00)',
    optPreAction: 'Pre-Action (Optional)',
    optPreActionHelp: 'Element to interact with before clicking the button (radio, checkbox, dropdown)',
    optPreActionSelector: 'Pre-Action Selector',
    optPreActionType: 'Action Type',
    optPreActionClick: 'Click',
    optPreActionCheck: 'Check (checkbox)',
    optPreActionSelect: 'Select (dropdown)',
    optPreActionValue: 'Value (for dropdown)',
    optButtonSelector: 'Button CSS Selector',
    optButtonSelectorHelp: 'CSS selector of the button to click',
    optButtonText: 'Button Text Match',
    optButtonTextHelp: 'Text to search for in button (e.g. Next, Continue, Submit)',
    optInterval: 'Check Interval (ms)',
    optDelay: 'Click Delay (ms)',
    optPickFromPage: 'Pick from Page',
    optPickerActive: 'Click an element on the page...',
    optTiming: 'Timing',
    optUnnamedProfile: 'Unnamed Profile',
    phName: 'E.g.: ADBS Training',
    phOptional: '(optional)',
    phDropdown: '(for dropdown)',
    timerOn: 'Timer',
    timerOff: 'No timer',
    timerAuto: 'auto',
    buttonLabel: 'Button',
    preActionLabel: 'Pre-action',
    emergencyStop: 'Emergency Stop',
    emergencyResume: 'Resume',
    optWizard: 'Wizard',
    optMaxClicks: 'Maximum clicks',
    optMaxClicksHelp: '0 = unlimited. Stops when this session reaches the number.',
    optCooldown: 'Wait between clicks (ms)',
    optCooldownHelp: 'Prevents rapid repeat clicks. E.g. 3000 = 3 seconds.',
    wizTitle: 'Profile Wizard',
    wizNext: 'Next',
    wizBack: 'Back',
    wizSkip: 'Skip',
    wizFinish: 'Save and Finish',
    wizUseSite: 'Refresh list',
    wizSelectTab: 'Choose an open tab',
    wizNoTabs: 'No website tabs are open. Open the site in a tab first.',
    wizStep1: '1 / 5 — Site',
    wizStep1Desc: 'Pick the site from the list of open tabs. Name and address are filled automatically.',
    wizStep2: '2 / 5 — Timer',
    wizStep2Desc: 'If the page has a countdown, pick it. Otherwise choose “No timer”.',
    wizHasTimer: 'Has timer',
    wizNoTimer: 'No timer',
    wizPickTimer: 'Pick timer from page',
    wizStep3: '3 / 5 — Button',
    wizStep3Desc: 'Point to the button to click (Next, Continue, Submit…).',
    wizPickButton: 'Pick button from page',
    wizPickHint: 'This opens the selected site tab. Click the Next / Continue button there. You will return here automatically.',
    wizPickFailed: 'Could not connect to the page. Refresh that tab (F5) and try again.',
    wizStep4: '4 / 5 — Pre-action',
    wizStep4Desc: 'If a checkbox must be ticked first, pick it. Otherwise skip.',
    wizPickPre: 'Pick pre-action from page',
    wizStep5: '5 / 5 — Limits',
    wizStep5Desc: 'Optionally set a click cap and wait time.',
    wizPicked: 'Selected',
    wizNeedSite: 'Open a website tab first.',
    wizNeedButton: 'Pick a button or enter button text.',

    balloonWaiting: 'Waiting for timer…',
    balloonTimer: 'Time left',
    balloonReady: 'Waiting for button…',
    balloonClicked: 'Clicked',
    balloonCooldown: 'Waiting',
    balloonLimit: 'Click limit reached',
    balloonStopped: 'Stopped',
    balloonHint: 'Ctrl+Shift+X to stop / resume',

    guideTitle: 'User Guide',
    guideStep1Title: '1. Install the Extension',
    guideStep1Desc: 'Open chrome://extensions, enable Developer mode, click "Load unpacked" and select the extension folder.',
    guideStep2Title: '2. Create a Profile',
    guideStep2Desc: 'Open "Profile Settings" from the popup. The easiest way is the Wizard: pick the site, timer, and button step by step. You can also fill a profile manually with "New Profile".',
    guideStep3Title: '3. Enter Site URL Pattern',
    guideStep3Desc: 'Enter the website address where automation should run. E.g.: *://adbs.uab.gov.tr/* The asterisk (*) means any text.',
    guideStep4Title: '4. Set Up the Timer',
    guideStep4Desc: 'If the page has a countdown, enable "Has countdown timer?". Enter the timer CSS selector or use "Pick from Page". Set the target value (usually 00:00).',
    guideStep5Title: '5. Set Up the Button',
    guideStep5Desc: 'Enter the CSS selector of the button to click, or a text match (Next, Continue, Submit etc.). If both are provided, the selector is tried first.',
    guideStep6Title: '6. Pre-Action (Optional)',
    guideStep6Desc: 'If a checkbox must be checked or a dropdown selected before clicking the button, fill in the pre-action section.',
    guideStep7Title: '7. How to Find a Selector',
    guideStep7Desc: 'Right-click any element on the page and choose "Inspect". The element is highlighted in the panel. Right-click it and choose Copy > Copy selector.',
    guideQuickStartTitle: 'Quick Start - ADBS Example',
    guideQuickStartHtml: 'A preset profile is available for ADBS (Amateur Maritime Training). Open extension settings and click <strong>"Import Preset Profiles"</strong>. The ADBS profile is added automatically and starts working on <code>adbs.uab.gov.tr</code>.',
    guideTimerHtml: '<strong>Timer:</strong> <code>h5.mb-0</code> (element next to Remaining Time)',
    guideButtonHtml: '<strong>Button:</strong> <code>dx-button[aria-label="İleri"]</code>',
    guideTargetHtml: '<strong>Target:</strong> When the timer reaches <code>00:00</code>, the Next button is clicked automatically.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Q: How do I find a selector?',
    faq1a: 'Right-click the element → choose "Inspect" → right-click the highlighted element in the panel → Copy → Copy selector.',
    faq2q: 'Q: Can I use it on more than one site?',
    faq2a: 'Yes. Create a separate profile for each site.',
    faq3q: 'Q: Does it work without a timer?',
    faq3a: 'Yes. Leave "Has countdown timer?" off. The button is clicked as soon as it becomes active.',
    faq4q: 'Q: What is a pre-action?',
    faq4a: 'Some pages require a checkbox or dropdown selection before the button can be clicked. Pre-action does this automatically.',
    faq5q: 'Q: Why is the extension not working?',
    faq5a: '1. Make sure the extension is enabled in the popup.<br>2. Check that the site URL pattern is correct.<br>3. Verify selectors with "Pick from Page".<br>4. Refresh the page (F5).',
    faq6q: 'Q: What are the status balloon and emergency stop?',
    faq6a: 'If a profile matches, a status box appears at the bottom-right. Stop or Ctrl+Shift+X pauses automation. Resume starts it again.',
    faq7q: 'Q: What are click limit and cooldown?',
    faq7a: 'The limit caps how many times this session may click. Cooldown prevents clicking the same button over and over.'
  }
};

let currentLocale = 'tr';

function t(key) {
  const pack = I18N[currentLocale] || I18N.tr;
  return pack[key] || I18N.tr[key] || key;
}

function applyI18n() {
  document.documentElement.lang = currentLocale;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) document.title = t(titleEl.dataset.i18n);

  document.querySelectorAll('.lang-select').forEach((sel) => {
    sel.value = currentLocale;
  });
}

function detectDefaultLocale() {
  const ui = (chrome.i18n.getUILanguage() || 'tr').toLowerCase();
  return ui.startsWith('en') ? 'en' : 'tr';
}

function loadLocale(cb) {
  chrome.storage.local.get({ locale: null }, (data) => {
    currentLocale = data.locale || detectDefaultLocale();
    applyI18n();
    if (cb) cb(currentLocale);
  });
}

function setLocale(locale, cb) {
  currentLocale = locale;
  chrome.storage.local.set({ locale }, () => {
    applyI18n();
    if (cb) cb(locale);
  });
}

function bindLanguageSelect(selectEl, onChange) {
  if (!selectEl) return;
  selectEl.value = currentLocale;
  selectEl.addEventListener('change', () => {
    setLocale(selectEl.value, onChange);
  });
}
