const toggle = document.getElementById('toggle');
const profileName = document.getElementById('profileName');
const stats = document.getElementById('stats');

let cachedProfile = null;
let cachedStats = null;

function renderStats() {
  if (!cachedProfile) {
    profileName.textContent = t('noProfile');
    profileName.className = 'popup-value badge-noProfile';
    stats.textContent = '';
    return;
  }

  profileName.textContent = cachedProfile.name;
  profileName.className = 'popup-value badge-active';

  const s = cachedStats;
  if (s && s.clickCount > 0) {
    const locale = currentLocale === 'en' ? 'en-US' : 'tr-TR';
    const time = new Date(s.lastClickTime).toLocaleTimeString(locale);
    stats.textContent = `${t('totalClicks')}: ${s.clickCount} | ${t('lastClick')}: ${time}`;
  } else {
    stats.textContent = t('noClicks');
  }
}

loadLocale(() => {
  bindLanguageSelect(document.getElementById('langSelect'), renderStats);
});

chrome.storage.local.get({ globalEnabled: true }, (data) => {
  toggle.checked = data.globalEnabled;
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0]) return;
  const url = tabs[0].url;

  chrome.runtime.sendMessage({ type: 'GET_PROFILE', url }, (resp) => {
    if (chrome.runtime.lastError || !resp) return;

    if (resp.profile) {
      cachedProfile = resp.profile;
      chrome.runtime.sendMessage({ type: 'GET_STATS' }, (sr) => {
        cachedStats = sr?.stats?.[resp.profile.id || resp.profile.name] || null;
        renderStats();
      });
    } else {
      cachedProfile = null;
      renderStats();
    }
  });
});

toggle.addEventListener('change', () => {
  chrome.storage.local.set({ globalEnabled: toggle.checked });
});

function openExtensionPage(file) {
  chrome.tabs.create({ url: chrome.runtime.getURL(file) });
}

document.getElementById('linkOptions').addEventListener('click', (e) => {
  e.preventDefault();
  openExtensionPage('options.html');
});

document.getElementById('linkGuide').addEventListener('click', (e) => {
  e.preventDefault();
  openExtensionPage('guide.html');
});

document.getElementById('btnStop').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'EMERGENCY_STOP' });
  const btn = document.getElementById('btnStop');
  btn.textContent = t('emergencyStop') + ' ✓';
  setTimeout(() => { btn.textContent = t('emergencyStop'); }, 1200);
});
