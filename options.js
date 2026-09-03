let profiles = [];
let editIndex = -1;
let wizStep = 1;
let pickTargetTabId = null;

const profileList = document.getElementById('profileList');
const profileForm = document.getElementById('profileForm');
const wizardPanel = document.getElementById('wizardPanel');
const formTitle = document.getElementById('formTitle');
const header = document.querySelector('.opt-header');

function loadProfiles() {
  chrome.runtime.sendMessage({ type: 'GET_PROFILES' }, (resp) => {
    profiles = resp?.profiles || [];
    renderList();
  });
}

function renderList() {
  if (profiles.length === 0) {
    profileList.innerHTML = `<div class="profile-list-empty">${t('noProfilesYet')}<br><br>
      <button class="btn btn-success" id="emptyWizardBtn">${t('optWizard')}</button>
      <button class="btn btn-outline" id="emptyImportBtn">${t('optImportPresets')}</button>
    </div>`;
    document.getElementById('emptyWizardBtn')?.addEventListener('click', openWizard);
    document.getElementById('emptyImportBtn')?.addEventListener('click', importPresets);
    return;
  }

  profileList.innerHTML = profiles.map((p, i) => `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">${esc(p.name)}</div>
          <div class="card-subtitle">${esc(p.sitePattern)}</div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-outline btn-sm" data-edit="${i}">${t('optEditProfile')}</button>
          <button class="btn btn-danger btn-sm" data-delete="${i}">${t('optDeleteProfile')}</button>
        </div>
      </div>
      <div style="font-size:12px;color:var(--muted)">
        ${p.timer?.enabled
          ? '⏱ ' + t('timerOn') + ': ' + esc(p.timer.selector || t('timerAuto')) + ' → ' + esc(p.timer.targetValue || '00:00')
          : '⏱ ' + t('timerOff')}
        &nbsp;|&nbsp;
        🔘 ${t('buttonLabel')}: ${esc(p.button?.selector || p.button?.textMatch || '-')}
        ${p.preAction?.selector ? '&nbsp;|&nbsp;📋 ' + t('preActionLabel') + ': ' + esc(p.preAction.selector) : ''}
      </div>
    </div>
  `).join('');

  profileList.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.addEventListener('click', () => editProfile(Number(btn.dataset.edit)));
  });
  profileList.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => deleteProfile(Number(btn.dataset.delete)));
  });
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

function hideMain() {
  profileList.style.display = 'none';
  header.style.display = 'none';
}

function showMain() {
  profileForm.style.display = 'none';
  wizardPanel.style.display = 'none';
  profileList.style.display = 'block';
  header.style.display = 'flex';
}

document.getElementById('btnNewProfile').addEventListener('click', () => {
  editIndex = -1;
  formTitle.textContent = t('optNewProfile');
  clearForm();
  hideMain();
  profileForm.style.display = 'block';
});

function editProfile(i) {
  editIndex = i;
  const p = profiles[i];
  formTitle.textContent = t('optEditProfile');

  document.getElementById('fName').value = p.name || '';
  document.getElementById('fSitePattern').value = p.sitePattern || '';
  document.getElementById('fTimerEnabled').checked = p.timer?.enabled || false;
  document.getElementById('fTimerSelector').value = p.timer?.selector || '';
  document.getElementById('fTimerTarget').value = p.timer?.targetValue || '00:00';
  document.getElementById('fPreSelector').value = p.preAction?.selector || '';
  document.getElementById('fPreType').value = p.preAction?.type || 'click';
  document.getElementById('fPreValue').value = p.preAction?.value || '';
  document.getElementById('fBtnSelector').value = p.button?.selector || '';
  document.getElementById('fBtnText').value = p.button?.textMatch || '';
  document.getElementById('fInterval').value = p.interval || 1000;
  document.getElementById('fDelay').value = p.delay || 500;
  document.getElementById('fMaxClicks').value = p.maxClicks || 0;
  document.getElementById('fCooldown').value = p.cooldown ?? 3000;

  toggleTimerFields();
  hideMain();
  profileForm.style.display = 'block';
}

function deleteProfile(i) {
  profiles.splice(i, 1);
  saveProfiles();
}

function collectFormProfile() {
  return {
    id: editIndex >= 0 ? profiles[editIndex].id : 'profile_' + Date.now(),
    name: document.getElementById('fName').value.trim() || t('optUnnamedProfile'),
    sitePattern: document.getElementById('fSitePattern').value.trim(),
    timer: {
      enabled: document.getElementById('fTimerEnabled').checked,
      selector: document.getElementById('fTimerSelector').value.trim(),
      targetValue: document.getElementById('fTimerTarget').value.trim() || '00:00'
    },
    preAction: document.getElementById('fPreSelector').value.trim() ? {
      selector: document.getElementById('fPreSelector').value.trim(),
      type: document.getElementById('fPreType').value,
      value: document.getElementById('fPreValue').value.trim()
    } : null,
    button: {
      selector: document.getElementById('fBtnSelector').value.trim(),
      textMatch: document.getElementById('fBtnText').value.trim()
    },
    interval: parseInt(document.getElementById('fInterval').value) || 1000,
    delay: parseInt(document.getElementById('fDelay').value) || 500,
    maxClicks: parseInt(document.getElementById('fMaxClicks').value) || 0,
    cooldown: parseInt(document.getElementById('fCooldown').value) || 0
  };
}

document.getElementById('btnSave').addEventListener('click', () => {
  const p = collectFormProfile();
  if (editIndex >= 0) profiles[editIndex] = p;
  else profiles.push(p);
  saveProfiles();
  showMain();
});

document.getElementById('btnCancel').addEventListener('click', showMain);

function clearForm() {
  document.getElementById('fName').value = '';
  document.getElementById('fSitePattern').value = '';
  document.getElementById('fTimerEnabled').checked = false;
  document.getElementById('fTimerSelector').value = '';
  document.getElementById('fTimerTarget').value = '00:00';
  document.getElementById('fPreSelector').value = '';
  document.getElementById('fPreType').value = 'click';
  document.getElementById('fPreValue').value = '';
  document.getElementById('fBtnSelector').value = '';
  document.getElementById('fBtnText').value = '';
  document.getElementById('fInterval').value = 1000;
  document.getElementById('fDelay').value = 500;
  document.getElementById('fMaxClicks').value = 0;
  document.getElementById('fCooldown').value = 3000;
  toggleTimerFields();
}

function saveProfiles() {
  chrome.runtime.sendMessage({ type: 'SAVE_PROFILES', profiles }, () => {
    renderList();
  });
}

document.getElementById('fTimerEnabled').addEventListener('change', toggleTimerFields);
function toggleTimerFields() {
  document.getElementById('timerFields').style.display =
    document.getElementById('fTimerEnabled').checked ? 'block' : 'none';
}

function importPresets() {
  if (typeof PRESETS === 'undefined') return;
  PRESETS.forEach((preset) => {
    if (!profiles.some((p) => p.id === preset.id)) {
      profiles.push({ ...preset });
    }
  });
  saveProfiles();
}

document.getElementById('btnImportPresets').addEventListener('click', importPresets);

function isSiteTab(tab) {
  const url = tab.url || tab.pendingUrl || '';
  return /^https?:\/\//.test(url) && !url.startsWith('chrome-extension://');
}

function listSiteTabs(cb) {
  chrome.tabs.query({}, (tabs) => {
    cb((tabs || []).filter(isSiteTab));
  });
}

function getSelectedTab(cb) {
  const select = document.getElementById('wSiteTabs');
  const id = pickTargetTabId || Number(select?.value);
  if (!id) {
    listSiteTabs((tabs) => cb(tabs[0] || null));
    return;
  }
  chrome.tabs.get(id, (tab) => {
    if (chrome.runtime.lastError || !tab) {
      listSiteTabs((tabs) => cb(tabs[0] || null));
      return;
    }
    cb(tab);
  });
}

function applyTab(tab) {
  if (!tab) return;
  pickTargetTabId = tab.id;
  try {
    const u = new URL(tab.url || tab.pendingUrl);
    document.getElementById('wSitePattern').value = '*://' + u.hostname + '/*';
    document.getElementById('wName').value = (tab.title || u.hostname).slice(0, 60);
    document.getElementById('wSiteHint').textContent = u.href;
    const select = document.getElementById('wSiteTabs');
    if (select) select.value = String(tab.id);
  } catch (_) {
    document.getElementById('wSiteHint').textContent = t('wizNeedSite');
  }
}

function refreshTabList(preferId) {
  const select = document.getElementById('wSiteTabs');
  const hint = document.getElementById('wSiteHint');
  listSiteTabs((tabs) => {
    select.innerHTML = '';
    if (tabs.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = t('wizNoTabs');
      select.appendChild(opt);
      hint.textContent = t('wizNeedSite');
      pickTargetTabId = null;
      return;
    }
    tabs.forEach((tab) => {
      const opt = document.createElement('option');
      opt.value = String(tab.id);
      let host = tab.url;
      try { host = new URL(tab.url).hostname; } catch (_) {}
      opt.textContent = (tab.title || host) + ' — ' + host;
      select.appendChild(opt);
    });
    const chosen = tabs.find((tab) => tab.id === preferId) ||
      tabs.find((tab) => tab.active) ||
      tabs[0];
    applyTab(chosen);
  });
}

function resetPickButtons() {
  document.querySelectorAll('[data-pick]').forEach((b) => {
    b.textContent = t('optPickFromPage');
    b.disabled = false;
  });
  ['wPickTimer', 'wPickButton', 'wPickPre'].forEach((id) => {
    const b = document.getElementById(id);
    if (b) {
      b.textContent = t(b.dataset.i18n || 'optPickFromPage');
      b.disabled = false;
    }
  });
}

function startPick(field, buttonEl) {
  getSelectedTab((tab) => {
    if (!tab) {
      alert(t('wizNeedSite'));
      return;
    }
    pickTargetTabId = tab.id;
    if (buttonEl) {
      buttonEl.textContent = t('optPickerActive');
      buttonEl.disabled = true;
    }
    chrome.runtime.sendMessage({ type: 'START_PICKER', tabId: tab.id, field }, (resp) => {
      if (chrome.runtime.lastError || !resp?.ok) {
        alert(t('wizPickFailed'));
        resetPickButtons();
      }
    });
  });
}

document.querySelectorAll('[data-pick]').forEach((btn) => {
  btn.addEventListener('click', () => startPick(btn.dataset.pick, btn));
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'PICKER_RESULT') return;
  const input = document.getElementById(msg.field);
  if (input) input.value = msg.selector;
  if (msg.field === 'wBtnSelector' && msg.text) {
    const textInput = document.getElementById('wBtnText');
    if (textInput && !textInput.value) textInput.value = msg.text.split('\n')[0].trim();
  }
  if (msg.field === 'fBtnSelector' && msg.text) {
    const textInput = document.getElementById('fBtnText');
    if (textInput && !textInput.value) textInput.value = msg.text.split('\n')[0].trim();
  }
  resetPickButtons();
  chrome.runtime.sendMessage({ type: 'FOCUS_OPTIONS' });
});

/* ---------- Wizard ---------- */

document.getElementById('btnWizard').addEventListener('click', openWizard);

function openWizard() {
  wizStep = 1;
  document.getElementById('wName').value = '';
  document.getElementById('wSitePattern').value = '';
  document.getElementById('wSiteHint').textContent = '';
  document.getElementById('wTimerYes').checked = false;
  document.getElementById('wTimerNo').checked = true;
  document.getElementById('wTimerSelector').value = '';
  document.getElementById('wTimerTarget').value = '00:00';
  document.getElementById('wBtnSelector').value = '';
  document.getElementById('wBtnText').value = '';
  document.getElementById('wPreSelector').value = '';
  document.getElementById('wPreType').value = 'click';
  document.getElementById('wMaxClicks').value = 0;
  document.getElementById('wCooldown').value = 3000;
  document.getElementById('wTimerFields').style.display = 'none';
  hideMain();
  wizardPanel.style.display = 'block';
  renderWizard();
  refreshTabList(pickTargetTabId);
  syncTimerChoice();
}

document.getElementById('wUseSite').addEventListener('click', () => refreshTabList(pickTargetTabId));
document.getElementById('wSiteTabs').addEventListener('change', () => {
  const id = Number(document.getElementById('wSiteTabs').value);
  if (!id) return;
  chrome.tabs.get(id, (tab) => {
    if (chrome.runtime.lastError || !tab) return;
    applyTab(tab);
  });
});

function syncTimerChoice() {
  const hasTimer = document.getElementById('wTimerYes').checked;
  document.getElementById('wTimerFields').style.display = hasTimer ? 'block' : 'none';
}
document.getElementById('wTimerYes').addEventListener('change', syncTimerChoice);
document.getElementById('wTimerNo').addEventListener('change', syncTimerChoice);

document.getElementById('wPickTimer').addEventListener('click', (e) => startPick('wTimerSelector', e.currentTarget));
document.getElementById('wPickButton').addEventListener('click', (e) => startPick('wBtnSelector', e.currentTarget));
document.getElementById('wPickPre').addEventListener('click', (e) => startPick('wPreSelector', e.currentTarget));

function renderWizard() {
  document.querySelectorAll('.wiz-step').forEach((el) => {
    el.style.display = Number(el.dataset.step) === wizStep ? 'block' : 'none';
  });
  const titles = ['wizStep1', 'wizStep2', 'wizStep3', 'wizStep4', 'wizStep5'];
  const descs = ['wizStep1Desc', 'wizStep2Desc', 'wizStep3Desc', 'wizStep4Desc', 'wizStep5Desc'];
  document.getElementById('wizStepTitle').textContent = t(titles[wizStep - 1]);
  document.getElementById('wizStepDesc').textContent = t(descs[wizStep - 1]);
  document.getElementById('wizProgress').innerHTML = [1, 2, 3, 4, 5].map((n) => {
    const cls = n === wizStep ? 'active' : n < wizStep ? 'done' : '';
    return `<div class="wiz-dot ${cls}"></div>`;
  }).join('');
  document.getElementById('wizBack').style.visibility = wizStep === 1 ? 'hidden' : 'visible';
  document.getElementById('wizNext').textContent = wizStep === 5 ? t('wizFinish') : t('wizNext');
}

document.getElementById('wizCancel').addEventListener('click', showMain);
document.getElementById('wizBack').addEventListener('click', () => {
  if (wizStep > 1) {
    wizStep--;
    renderWizard();
  }
});
document.getElementById('wizNext').addEventListener('click', () => {
  if (wizStep === 1 && !document.getElementById('wSitePattern').value.trim()) {
    refreshTabList(pickTargetTabId);
    alert(t('wizNeedSite'));
    return;
  }
  if (wizStep === 3) {
    const sel = document.getElementById('wBtnSelector').value.trim();
    const text = document.getElementById('wBtnText').value.trim();
    if (!sel && !text) {
      alert(t('wizNeedButton'));
      return;
    }
  }
  if (wizStep < 5) {
    wizStep++;
    renderWizard();
    return;
  }
  saveWizardProfile();
});

function saveWizardProfile() {
  const preSel = document.getElementById('wPreSelector').value.trim();
  const p = {
    id: 'profile_' + Date.now(),
    name: document.getElementById('wName').value.trim() || t('optUnnamedProfile'),
    sitePattern: document.getElementById('wSitePattern').value.trim(),
    timer: {
      enabled: document.getElementById('wTimerYes').checked,
      selector: document.getElementById('wTimerSelector').value.trim(),
      targetValue: document.getElementById('wTimerTarget').value.trim() || '00:00'
    },
    preAction: preSel ? {
      selector: preSel,
      type: document.getElementById('wPreType').value,
      value: ''
    } : null,
    button: {
      selector: document.getElementById('wBtnSelector').value.trim(),
      textMatch: document.getElementById('wBtnText').value.trim()
    },
    interval: 1000,
    delay: 500,
    maxClicks: parseInt(document.getElementById('wMaxClicks').value) || 0,
    cooldown: parseInt(document.getElementById('wCooldown').value) || 0
  };
  profiles.push(p);
  saveProfiles();
  showMain();
}

loadLocale(() => {
  bindLanguageSelect(document.getElementById('langSelect'), () => {
    renderList();
    if (wizardPanel.style.display === 'block') renderWizard();
  });
  loadProfiles();
  toggleTimerFields();
});
