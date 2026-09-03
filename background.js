chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ profiles: [], globalEnabled: true }, (data) => {
    if (data.profiles.length === 0) {
      chrome.storage.local.set({ profiles: [], globalEnabled: true, stats: {} });
    }
  });
});

function matchesPattern(url, pattern) {
  if (!pattern) return false;
  const regex = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  try {
    return new RegExp('^' + regex + '$', 'i').test(url);
  } catch {
    return false;
  }
}

function sendToActiveTab(type) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) return;
    chrome.tabs.sendMessage(tabs[0].id, { type }, () => {
      void chrome.runtime.lastError;
    });
  });
}

chrome.commands.onCommand.addListener((command) => {
  if (command === 'emergency-stop') sendToActiveTab('EMERGENCY_STOP');
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_PROFILE') {
    chrome.storage.local.get({ profiles: [], globalEnabled: true, locale: 'tr' }, (data) => {
      if (!data.globalEnabled) {
        sendResponse({ profile: null, enabled: false, locale: data.locale });
        return;
      }
      const profile = data.profiles.find((p) => matchesPattern(msg.url, p.sitePattern));
      sendResponse({ profile: profile || null, enabled: true, locale: data.locale });
    });
    return true;
  }

  if (msg.type === 'LOG_CLICK') {
    const profileId = msg.profileId;
    chrome.storage.local.get({ stats: {} }, (data) => {
      const stats = data.stats;
      if (!stats[profileId]) stats[profileId] = { clickCount: 0, lastClickTime: null };
      stats[profileId].clickCount++;
      stats[profileId].lastClickTime = new Date().toISOString();
      chrome.storage.local.set({ stats });
    });
    chrome.action.setBadgeText({ text: '✓', tabId: sender.tab?.id });
    chrome.action.setBadgeBackgroundColor({ color: '#34a853', tabId: sender.tab?.id });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '', tabId: sender.tab?.id });
    }, 3000);
    return false;
  }

  if (msg.type === 'GET_PROFILES') {
    chrome.storage.local.get({ profiles: [] }, (data) => {
      sendResponse({ profiles: data.profiles });
    });
    return true;
  }

  if (msg.type === 'SAVE_PROFILES') {
    chrome.storage.local.set({ profiles: msg.profiles }, () => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (msg.type === 'GET_STATS') {
    chrome.storage.local.get({ stats: {} }, (data) => {
      sendResponse({ stats: data.stats });
    });
    return true;
  }

  if (msg.type === 'EMERGENCY_STOP') {
    sendToActiveTab('EMERGENCY_STOP');
    return false;
  }

  if (msg.type === 'EMERGENCY_RESUME') {
    sendToActiveTab('EMERGENCY_RESUME');
    return false;
  }

  if (msg.type === 'START_PICKER') {
    const tabId = msg.tabId;
    const field = msg.field;
    if (!tabId) {
      sendResponse({ ok: false });
      return false;
    }

    function startOnTab() {
      chrome.tabs.sendMessage(tabId, { type: 'START_PICKER', field }, (resp) => {
        if (chrome.runtime.lastError || !resp?.ok) {
          sendResponse({ ok: false, error: chrome.runtime.lastError?.message });
          return;
        }
        chrome.tabs.update(tabId, { active: true });
        sendResponse({ ok: true });
      });
    }

    chrome.tabs.sendMessage(tabId, { type: 'PING' }, (resp) => {
      if (chrome.runtime.lastError || !resp?.ok) {
        chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] }, () => {
          if (chrome.runtime.lastError) {
            sendResponse({ ok: false, error: chrome.runtime.lastError.message });
            return;
          }
          setTimeout(startOnTab, 400);
        });
        return;
      }
      startOnTab();
    });
    return true;
  }

  if (msg.type === 'FOCUS_OPTIONS') {
    const optionsUrl = chrome.runtime.getURL('options.html');
    chrome.tabs.query({}, (tabs) => {
      const optionsTab = tabs.find((tab) => (tab.url || '').startsWith(optionsUrl));
      if (optionsTab) chrome.tabs.update(optionsTab.id, { active: true });
    });
    return false;
  }
});
