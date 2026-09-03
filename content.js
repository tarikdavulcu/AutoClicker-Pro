// AutoClicker Pro - Content Script
(function () {
  const TAG = '[AutoClicker]';
  const STOP_KEY = 'ac-emergency-stop';

  const UI = {
    tr: {
      waiting: 'Sayaç bekleniyor…',
      timer: 'Kalan süre',
      ready: 'Buton bekleniyor…',
      clicked: 'Tıklandı',
      cooldown: 'Bekleme',
      limit: 'Tıklama limitine ulaşıldı',
      stopped: 'Durduruldu',
      stop: 'Durdur',
      resume: 'Devam Et',
      hint: 'Ctrl+Shift+X ile durdur / devam',
      pick: 'Sayfada bir element seçin… (ESC iptal)'
    },
    en: {
      waiting: 'Waiting for timer…',
      timer: 'Time left',
      ready: 'Waiting for button…',
      clicked: 'Clicked',
      cooldown: 'Waiting',
      limit: 'Click limit reached',
      stopped: 'Stopped',
      stop: 'Stop',
      resume: 'Resume',
      hint: 'Ctrl+Shift+X to stop / resume',
      pick: 'Click an element on the page… (ESC to cancel)'
    }
  };

  let currentProfile = null;
  let intervalId = null;
  let enabled = false;
  let locale = 'tr';
  let sessionClicks = 0;
  let lastClickAt = 0;
  let clickInFlight = false;
  let emergencyStopped = sessionStorage.getItem(STOP_KEY) === '1';
  let balloonRoot = null;

  function ui(key) {
    return (UI[locale] || UI.tr)[key] || UI.tr[key] || key;
  }

  function loadProfile() {
    chrome.runtime.sendMessage({ type: 'GET_PROFILE', url: location.href }, (resp) => {
      if (chrome.runtime.lastError) return;
      if (!resp) return;
      enabled = resp.enabled;
      currentProfile = resp.profile;
      locale = resp.locale || locale;
      if (currentProfile && enabled && !emergencyStopped) {
        start();
        updateBalloon('waiting');
        console.log(TAG, 'Profil yüklendi:', currentProfile.name);
      } else if (currentProfile && emergencyStopped) {
        stop();
        updateBalloon('stopped');
      } else {
        stop();
        hideBalloon();
      }
    });
  }

  function findTimer(profile) {
    if (!profile.timer?.enabled) return null;
    if (profile.timer.selector) {
      const el = document.querySelector(profile.timer.selector);
      if (el) return el;
    }
    const all = document.querySelectorAll('*');
    for (const el of all) {
      if (el.children.length === 0) {
        const text = el.textContent.trim();
        if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(text)) return el;
      }
    }
    return null;
  }

  function isTimerAtTarget(timerEl, profile) {
    const text = timerEl.textContent.trim();
    const targets = (profile.timer.targetValue || '00:00').split('|').map((s) => s.trim());
    return targets.includes(text);
  }

  function findButton(profile) {
    if (profile.button.selector) {
      const el = document.querySelector(profile.button.selector);
      if (el && !isDisabled(el)) return el;
    }
    if (profile.button.textMatch) {
      const keywords = profile.button.textMatch.split('|').map((s) => s.trim().toLowerCase());
      const candidates = document.querySelectorAll(
        'button, a, input[type="button"], input[type="submit"], [role="button"], dx-button'
      );
      for (const el of candidates) {
        const text = (el.innerText || el.textContent || el.value || el.getAttribute('aria-label') || '')
          .trim()
          .toLowerCase();
        if (keywords.some((kw) => text === kw || text.includes(kw))) {
          if (!isDisabled(el)) return el;
        }
      }
    }
    return null;
  }

  function isDisabled(el) {
    return el.disabled ||
      el.classList.contains('dx-state-disabled') ||
      el.classList.contains('disabled') ||
      el.getAttribute('aria-disabled') === 'true' ||
      el.hasAttribute('disabled');
  }

  function doPreAction(profile) {
    if (!profile.preAction?.selector) return true;
    const el = document.querySelector(profile.preAction.selector);
    if (!el) return false;
    switch (profile.preAction.type) {
      case 'check':
        if (!el.checked) el.click();
        break;
      case 'select':
        if (el.tagName === 'SELECT') {
          el.value = profile.preAction.value || '';
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        break;
      default:
        el.click();
    }
    return true;
  }

  function tick() {
    if (!currentProfile || !enabled || emergencyStopped) return;
    if (clickInFlight) return;

    const max = Number(currentProfile.maxClicks) || 0;
    if (max > 0 && sessionClicks >= max) {
      updateBalloon('limit');
      stop();
      return;
    }

    const cooldown = Number(currentProfile.cooldown) || 0;
    if (cooldown > 0 && lastClickAt) {
      const remain = lastClickAt + cooldown - Date.now();
      if (remain > 0) {
        updateBalloon('cooldown', Math.ceil(remain / 1000));
        return;
      }
    }

    if (currentProfile.timer?.enabled) {
      const timer = findTimer(currentProfile);
      if (!timer) {
        updateBalloon('waiting');
        return;
      }
      if (!isTimerAtTarget(timer, currentProfile)) {
        updateBalloon('timer', timer.textContent.trim());
        return;
      }
    }

    updateBalloon('ready');

    if (currentProfile.preAction?.selector) {
      if (!doPreAction(currentProfile)) return;
    }

    clickButton();
  }

  function clickButton() {
    if (clickInFlight || emergencyStopped) return;
    const btn = findButton(currentProfile);
    if (!btn) return;

    clickInFlight = true;
    const delay = currentProfile.delay || 500;
    setTimeout(() => {
      clickInFlight = false;
      if (emergencyStopped || !currentProfile) return;
      const live = findButton(currentProfile);
      if (!live) return;
      live.click();
      sessionClicks++;
      lastClickAt = Date.now();
      updateBalloon('clicked');
      console.log(TAG, 'Buton tıklandı. Oturum:', sessionClicks);
      chrome.runtime.sendMessage({
        type: 'LOG_CLICK',
        profileId: currentProfile.id || currentProfile.name
      });
    }, delay);
  }

  function start() {
    if (intervalId) return;
    const interval = currentProfile?.interval || 1000;
    intervalId = setInterval(tick, interval);
    console.log(TAG, 'Başlatıldı');
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function emergencyStop() {
    emergencyStopped = true;
    sessionStorage.setItem(STOP_KEY, '1');
    clickInFlight = false;
    stop();
    updateBalloon('stopped');
    console.log(TAG, 'Acil durdur');
  }

  function emergencyResume() {
    emergencyStopped = false;
    sessionStorage.removeItem(STOP_KEY);
    if (currentProfile && enabled) {
      start();
      updateBalloon('waiting');
    }
    console.log(TAG, 'Devam');
  }

  function ensureBalloon() {
    if (balloonRoot) return balloonRoot;
    const host = document.createElement('div');
    host.id = 'ac-pro-host';
    host.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:2147483646;';
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .box { font-family: 'Segoe UI', Roboto, sans-serif; width: 230px; background: #fff; color: #202124;
          border: 1px solid #dadce0; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,.18); padding: 10px 12px; }
        .top { display: flex; align-items: center; gap: 8px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #34a853; flex-shrink: 0; }
        .dot.wait { background: #fbbc04; }
        .dot.stop { background: #ea4335; }
        .name { font-size: 12px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .status { font-size: 12px; color: #5f6368; margin: 6px 0 8px; min-height: 16px; }
        .btns { display: flex; gap: 6px; }
        button { border: 0; border-radius: 6px; padding: 5px 10px; font-size: 12px; cursor: pointer; font-weight: 600; }
        .stop { background: #ea4335; color: #fff; }
        .resume { background: #1a73e8; color: #fff; }
        .hint { font-size: 10px; color: #9aa0a6; margin-top: 6px; }
      </style>
      <div class="box">
        <div class="top"><span class="dot" id="dot"></span><span class="name" id="name"></span></div>
        <div class="status" id="status"></div>
        <div class="btns">
          <button class="stop" id="stopBtn"></button>
          <button class="resume" id="resumeBtn"></button>
        </div>
        <div class="hint" id="hint"></div>
      </div>
    `;
    shadow.getElementById('stopBtn').addEventListener('click', emergencyStop);
    shadow.getElementById('resumeBtn').addEventListener('click', emergencyResume);
    (document.body || document.documentElement).appendChild(host);
    balloonRoot = shadow;
    return shadow;
  }

  function hideBalloon() {
    const host = document.getElementById('ac-pro-host');
    if (host) host.style.display = 'none';
  }

  function updateBalloon(kind, extra) {
    if (!currentProfile) {
      hideBalloon();
      return;
    }
    const root = ensureBalloon();
    const host = document.getElementById('ac-pro-host');
    if (host) host.style.display = 'block';

    const dot = root.getElementById('dot');
    const stopBtn = root.getElementById('stopBtn');
    const resumeBtn = root.getElementById('resumeBtn');
    root.getElementById('name').textContent = currentProfile.name || 'AutoClicker';
    root.getElementById('hint').textContent = ui('hint');
    stopBtn.textContent = ui('stop');
    resumeBtn.textContent = ui('resume');

    const stopped = kind === 'stopped' || emergencyStopped;
    stopBtn.style.display = stopped ? 'none' : 'inline-block';
    resumeBtn.style.display = stopped ? 'inline-block' : 'none';
    dot.className = 'dot' + (stopped || kind === 'limit' ? ' stop' : kind === 'clicked' ? '' : ' wait');

    let status = ui('waiting');
    if (kind === 'timer') status = ui('timer') + ': ' + extra;
    else if (kind === 'ready') status = ui('ready');
    else if (kind === 'clicked') status = ui('clicked') + (sessionClicks ? ' (' + sessionClicks + ')' : '');
    else if (kind === 'cooldown') status = ui('cooldown') + ': ' + extra + 's';
    else if (kind === 'limit') status = ui('limit');
    else if (kind === 'stopped') status = ui('stopped');
    root.getElementById('status').textContent = status;
  }

  function getSelector(el) {
    if (el.id) return '#' + CSS.escape(el.id);
    const parts = [];
    while (el && el !== document.body && el !== document.documentElement) {
      let sel = el.tagName.toLowerCase();
      if (el.className && typeof el.className === 'string') {
        const classes = el.className.trim().split(/\s+/).filter((c) =>
          !c.startsWith('ac-') && !c.startsWith('ng-') && c.length < 40
        ).slice(0, 3);
        if (classes.length) sel += '.' + classes.map((c) => CSS.escape(c)).join('.');
      }
      const ariaLabel = el.getAttribute('aria-label');
      if (ariaLabel) sel += '[aria-label="' + ariaLabel.replace(/"/g, '\\"') + '"]';
      parts.unshift(sel);
      try {
        if (document.querySelectorAll(parts.join(' > ')).length === 1) break;
      } catch (_) { break; }
      el = el.parentElement;
    }
    return parts.join(' > ');
  }

  function startPicker(field) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;cursor:crosshair;';
    const highlight = document.createElement('div');
    highlight.style.cssText = 'position:fixed;z-index:2147483646;border:2px solid #1a73e8;background:rgba(26,115,232,.12);pointer-events:none;';
    const tooltip = document.createElement('div');
    tooltip.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:2147483647;background:#333;color:#fff;padding:8px 16px;border-radius:6px;font:13px Segoe UI,sans-serif;';
    tooltip.textContent = ui('pick');
    document.body.appendChild(overlay);
    document.body.appendChild(highlight);
    document.body.appendChild(tooltip);

    function cleanup() {
      overlay.remove();
      highlight.remove();
      tooltip.remove();
      document.removeEventListener('keydown', escHandler, true);
    }

    overlay.addEventListener('mousemove', (e) => {
      overlay.style.pointerEvents = 'none';
      const target = document.elementFromPoint(e.clientX, e.clientY);
      overlay.style.pointerEvents = 'auto';
      if (!target) return;
      const rect = target.getBoundingClientRect();
      highlight.style.left = rect.left + 'px';
      highlight.style.top = rect.top + 'px';
      highlight.style.width = rect.width + 'px';
      highlight.style.height = rect.height + 'px';
    });

    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      overlay.style.pointerEvents = 'none';
      const target = document.elementFromPoint(e.clientX, e.clientY);
      overlay.style.pointerEvents = 'auto';
      if (target) {
        chrome.runtime.sendMessage({
          type: 'PICKER_RESULT',
          field: field,
          selector: getSelector(target),
          text: (target.getAttribute('aria-label') || target.textContent || '').trim().substring(0, 50)
        });
      }
      cleanup();
    }, true);

    function escHandler(e) {
      if (e.key === 'Escape') cleanup();
    }
    document.addEventListener('keydown', escHandler, true);
  }

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === 'PING') {
      sendResponse({ ok: true });
      return;
    }
    if (msg.type === 'START_PICKER') {
      startPicker(msg.field);
      sendResponse({ ok: true });
      return;
    }
    if (msg.type === 'RELOAD_PROFILE') {
      stop();
      loadProfile();
    }
    if (msg.type === 'TOGGLE') {
      enabled = msg.enabled;
      if (enabled && currentProfile && !emergencyStopped) start();
      else stop();
    }
    if (msg.type === 'EMERGENCY_STOP') emergencyStop();
    if (msg.type === 'EMERGENCY_RESUME') emergencyResume();
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.profiles || changes.globalEnabled || changes.locale) {
      stop();
      loadProfile();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
      e.preventDefault();
      if (emergencyStopped) emergencyResume();
      else emergencyStop();
    }
  }, true);

  loadProfile();

  let lastUrl = location.href;
  const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      stop();
      loadProfile();
    }
  });
  if (document.body) {
    urlObserver.observe(document.body, { childList: true, subtree: true });
  }
})();
