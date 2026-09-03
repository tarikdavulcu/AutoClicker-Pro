# AutoClicker Pro

<p align="center">
  <a href="#english">English</a> ·
  <a href="#türkçe">Türkçe</a>
</p>

Chrome and Microsoft Edge extension (Manifest V3). It watches a page for a countdown timer and/or an enabled button, then clicks **Next / Continue / İleri / Devam** automatically. You configure one **profile per website**.

---

# English

## What it does

Many online courses lock the **Next** button until a timer reaches `00:00` (or until a checkbox is ticked). AutoClicker Pro:

1. Matches the current tab to a **site profile** (URL pattern).
2. Optionally waits until a **timer** shows a target value (usually `00:00`).
3. Optionally runs a **pre-action** (checkbox, radio, dropdown).
4. Clicks the **button** when it is enabled.
5. Repeats on the next section (including Angular / SPA page changes).

If nothing is found, it waits silently — no error popups.

## Features

| Feature | Description |
| --- | --- |
| Per-site profiles | Different sites, different buttons and timers |
| Wizard | 5-step setup: pick an open tab, timer, button, pre-action, limits |
| Pick from page | Click the real element on the site; the CSS selector is filled for you |
| Presets | Ready-made profile for ADBS (`adbs.uab.gov.tr`) plus a generic education template |
| Status balloon | Bottom-right overlay: waiting, time left, clicked, stopped |
| Emergency stop | Balloon **Stop**, popup red button, or `Ctrl+Shift+X` (`Cmd+Shift+X` on Mac) |
| Click limit | Max clicks this session (`0` = unlimited) |
| Cooldown | Wait between clicks so the same button is not hammered |
| Languages | Turkish / English in the popup, options, and guide |

## Requirements

- Google Chrome 88+ or Microsoft Edge 88+
- You load the extension **unpacked** (Developer mode). It is not on the Chrome Web Store.

## Install from GitHub

### Option A — ZIP (easiest)

1. Open the repository: [tarikdavulcu/AutoClicker-Pro](https://github.com/tarikdavulcu/AutoClicker-Pro).
2. Click **Code** → **Download ZIP**.
3. Unzip the file. You should see a folder that contains `manifest.json`.
4. Continue with **Load in the browser** below.

### Option B — Git

```bash
git clone https://github.com/tarikdavulcu/AutoClicker-Pro.git
```

Use the cloned folder (the one that contains `manifest.json`) in the next step.

### Load in the browser

**Chrome**

1. Go to `chrome://extensions`
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the **AutoClicker-Pro** folder (the folder that contains `manifest.json`, not a parent folder).

**Edge**

1. Go to `edge://extensions`
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select the same folder.

After you update files from Git, click the **reload** icon on the extension card, then refresh the website tab (`F5`).

## First-time setup

1. Click the puzzle-piece icon in the toolbar → pin **AutoClicker Pro**.
2. Click the extension icon. Turn the switch **on**.
3. Choose **Language** (Türkçe / English).
4. Open **Profile Settings**.

### Fast path: preset (ADBS)

If you use [ADBS](https://adbs.uab.gov.tr):

1. Profile Settings → **Import Preset Profiles**.
2. Open the training page and refresh it.
3. A status balloon should appear at the bottom right when the profile matches.

### Fast path: Wizard (any site)

1. Open the course website in a tab.
2. Profile Settings → **Wizard**.
3. **Step 1 — Site:** pick the correct tab from **Choose an open tab** (not a random first tab). Use **Refresh list** if the site is missing.
4. **Step 2 — Timer:** **Has timer** or **No timer**. If yes, click **Pick timer from page**, switch to the site, click the countdown.
5. **Step 3 — Button:** **Pick button from page**, then click Next / Continue / İleri on the site. You return to the wizard automatically.
6. **Step 4 — Pre-action:** skip, or pick a checkbox that must be ticked first.
7. **Step 5 — Limits:** max clicks (`0` = unlimited) and wait between clicks (e.g. `3000` ms).
8. **Save and Finish.** Refresh the course tab.

If pick-from-page fails: refresh the **website** tab, then try again.

## How a profile works

| Field | Meaning |
| --- | --- |
| Site URL pattern | Example: `*://example.com/*` — `*` means any text |
| Timer | Optional. CSS selector + target text (`00:00`). If off, the button is clicked as soon as it is enabled |
| Pre-action | Optional click / check / select before the main button |
| Button | CSS selector **or** text match (`Next`, `Continue`, `İleri`, `Devam`, …). Selector is tried first |
| Check interval | How often the page is scanned (default 1000 ms) |
| Click delay | Extra wait before the click (default 500 ms) |
| Max clicks | Session cap; `0` = unlimited |
| Cooldown | Minimum time between two clicks |

### Finding a selector yourself

Right-click the element → **Inspect** → right-click the highlighted HTML → **Copy** → **Copy selector**. Paste it into the profile. The wizard’s **Pick from page** does this for you.

## Status balloon and stop

When a profile matches, a small box appears at the **bottom right**:

- Waiting for timer / time left / waiting for button / clicked / cooldown / limit reached / stopped

**Stop immediately**

- **Stop** on the balloon, or **Emergency Stop** in the popup, or **Ctrl+Shift+X**
- **Resume** on the balloon starts it again (stop is remembered for that tab until you resume)

The main popup switch turns the extension **off on all sites**.

## Permissions (why they are requested)

| Permission | Why |
| --- | --- |
| `storage` | Save profiles, language, and click stats |
| `tabs` | List open tabs in the wizard so you can choose the correct site |
| `scripting` | Inject the helper if a page was opened before the extension was loaded |
| Host access (`<all_urls>`) | Run only where you created a matching profile; other sites stay idle |

## Troubleshooting

| Problem | What to try |
| --- | --- |
| Extension icon does nothing useful | Pin it; confirm the toggle is on |
| “No profile for this site” | URL pattern must match (e.g. `*://adbs.uab.gov.tr/*`). Refresh the page |
| Balloon does not appear | Reload the extension, then `F5` on the site |
| Pick from page does nothing | Select the right tab in step 1, refresh that site, click pick again |
| Button never clicks | Timer still counting; button `disabled`; wrong selector or text; cooldown/limit |
| Clicks too fast | Increase **Cooldown** (e.g. 3000–5000) |
| Clicks after the course ended | Set a **max clicks** value or use emergency stop |

In-extension help: popup → **How to Use**.

## Disclaimer

Use this only on sites and accounts you are allowed to automate. You are responsible for the website’s terms of use and any training / exam rules.

---

# Türkçe

## Ne işe yarar?

Birçok online eğitimde **İleri / Devam** butonu, süre `00:00` olana (veya bir kutu işaretlenene) kadar kilitli kalır. AutoClicker Pro:

1. Açık sekmeyi bir **site profiline** eşleştirir (URL kalıbı).
2. İsterseniz **sayaç** hedef değere gelene kadar bekler (genelde `00:00`).
3. İsterseniz **ön işlem** yapar (checkbox, radio, dropdown).
4. Buton **aktif** olunca tıklar.
5. Yeni bölüm açılınca (Angular / SPA dahil) aynı döngüyü sürdürür.

Öğe bulunamazsa hata vermez, beklemeye devam eder.

## Özellikler

| Özellik | Açıklama |
| --- | --- |
| Site profilleri | Her site için ayrı sayaç / buton ayarı |
| Sihirbaz | 5 adım: açık sekme, sayaç, buton, ön işlem, limitler |
| Sayfadan seç | Sitedeki gerçek elemente tıklarsınız; CSS selector otomatik dolar |
| Hazır profiller | ADBS (`adbs.uab.gov.tr`) ve genel eğitim şablonu |
| Durum balonu | Sağ alt: bekleniyor, kalan süre, tıklandı, durduruldu |
| Acil durdur | Balondaki **Durdur**, popup’taki kırmızı buton veya `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`) |
| Tıklama limiti | Bu oturumda en fazla kaç tıklama (`0` = sınırsız) |
| Bekleme (cooldown) | Peş peşe basmayı engeller |
| Dil | Popup, ayarlar ve kılavuzda Türkçe / English |

## Gereksinimler

- Google Chrome 88+ veya Microsoft Edge 88+
- Uzantı **paketlenmemiş** yüklenir (Geliştirici modu). Chrome Web Mağazası’nda değildir.

## GitHub’dan kurulum

### A — ZIP (en kolay)

1. Depoyu açın: [tarikdavulcu/AutoClicker-Pro](https://github.com/tarikdavulcu/AutoClicker-Pro).
2. **Code** → **Download ZIP**.
3. ZIP’i çıkarın. Klasörün içinde `manifest.json` görünmeli.
4. Aşağıdaki **Tarayıcıya yükleme** adımlarına geçin.

### B — Git

```bash
git clone https://github.com/tarikdavulcu/AutoClicker-Pro.git
```

Sonraki adımda `manifest.json` içeren klasörü seçin.

### Tarayıcıya yükleme

**Chrome**

1. `chrome://extensions` adresine gidin.
2. Sağ üstten **Geliştirici modu**nu açın.
3. **Paketlenmemiş uzantı yükle**ye tıklayın.
4. **AutoClicker-Pro** klasörünü seçin (`manifest.json`’ın olduğu klasör; bir üst klasör değil).

**Edge**

1. `edge://extensions`
2. **Geliştirici modu**nu açın.
3. **Paketlenmemiş uzantı yükle** → aynı klasör.

Git’ten dosya güncelledikten sonra uzantı kartındaki **yenile** ikonuna basın, sonra site sekmesini `F5` ile yenileyin.

## İlk ayar

1. Araç çubuğundaki yapboz ikonundan **AutoClicker Pro**yu sabitleyin.
2. Uzantı ikonuna tıklayın. Anahtarı **açık** tutun.
3. **Dil** seçin (Türkçe / English).
4. **Profil Ayarları**nı açın.

### Hızlı yol: hazır profil (ADBS)

[ADBS](https://adbs.uab.gov.tr) kullanıyorsanız:

1. Profil Ayarları → **Hazır Profilleri Ekle**.
2. Eğitim sayfasını açıp yenileyin.
3. Profil eşleşince sağ altta durum balonu görünür.

### Hızlı yol: Sihirbaz (herhangi bir site)

1. Kurs sitesini bir sekmede açın.
2. Profil Ayarları → **Sihirbaz**.
3. **1. Site:** **Açık sekmelerden seç** listesinden doğru sekmeyi seçin. Yoksa **Listeyi yenile**.
4. **2. Sayaç:** **Sayaç var** veya **Sayaç yok**. Varsa **Sayacı sayfadan seç**, siteye geçin, süre yazısına tıklayın.
5. **3. Buton:** **Butonu sayfadan seç**, sitede İleri / Devam / Next’e tıklayın. Sihirbaza otomatik dönülür.
6. **4. Ön işlem:** yoksa atlayın; varsa önce işaretlenmesi gereken kutuyu seçin.
7. **5. Limitler:** maksimum tıklama (`0` = sınırsız) ve tıklamalar arası bekleme (ör. `3000` ms).
8. **Kaydet ve Bitir.** Kurs sekmesini yenileyin.

Sayfadan seç çalışmazsa **site sekmesini** yenileyip tekrar deneyin.

## Profil alanları

| Alan | Anlamı |
| --- | --- |
| Site URL kalıbı | Örnek: `*://example.com/*` — `*` herhangi bir metin |
| Sayaç | İsteğe bağlı. CSS selector + hedef (`00:00`). Kapalıysa buton aktif olur olmaz tıklanır |
| Ön işlem | Ana butondan önce tıkla / işaretle / seç |
| Buton | CSS selector **veya** metin (`İleri`, `Devam`, `Next`…). Önce selector denenir |
| Kontrol aralığı | Sayfanın tarama sıklığı (varsayılan 1000 ms) |
| Tıklama gecikmesi | Tıklamadan önce ek bekleme (varsayılan 500 ms) |
| Maksimum tıklama | Oturum limiti; `0` = sınırsız |
| Bekleme | İki tıklama arasındaki minimum süre |

### Selector’ı elle bulmak

Elemente sağ tık → **İncele** → vurgulanan HTML’e sağ tık → **Copy** → **Copy selector**. Profile yapıştırın. Sihirbazdaki **Sayfadan seç** bunu sizin yerinize yapar.

## Durum balonu ve durdurma

Profil eşleşince **sağ altta** kutu görünür:

- Sayaç bekleniyor / kalan süre / buton bekleniyor / tıklandı / bekleme / limit / durduruldu

**Hemen durdurmak**

- Balondaki **Durdur**, popup’taki **Acil Durdur** veya **Ctrl+Shift+X**
- Balondaki **Devam Et** yeniden başlatır (durdurma, devam edene kadar o sekmede kalır)

Popup’taki ana anahtar uzantıyı **tüm sitelerde** kapatır.

## İzinler (neden istenir)

| İzin | Neden |
| --- | --- |
| `storage` | Profil, dil ve tıklama sayısı |
| `tabs` | Sihirbazda açık sekmeleri listeler; doğru siteyi seçersiniz |
| `scripting` | Sayfa uzantıdan önce açıldıysa yardımcı script’i yükler |
| Site erişimi (`<all_urls>`) | Yalnızca eşleşen profilde çalışır; diğer sitelerde bekler |

## Sorun giderme

| Sorun | Deneyin |
| --- | --- |
| İkon işe yaramıyor | Sabitleyin; anahtarın açık olduğundan emin olun |
| “Bu site için profil yok” | URL kalıbı eşleşmeli (ör. `*://adbs.uab.gov.tr/*`). Sayfayı yenileyin |
| Balon görünmüyor | Uzantıyı yenileyin, sitede `F5` |
| Sayfadan seç çalışmıyor | 1. adımda doğru sekmeyi seçin, siteyi yenileyin, tekrar deneyin |
| Buton tıklanmıyor | Sayaç bitmemiş; buton disabled; yanlış selector/metin; cooldown veya limit |
| Çok hızlı tıklıyor | **Bekleme**yi artırın (ör. 3000–5000) |
| Eğitim bitince de tıklıyor | **Maksimum tıklama** koyun veya acil durdurun |

Uzantı içi kılavuz: popup → **Nasıl Kullanılır?**

## Sorumluluk

Yalnızca otomatikleştirmeye yetkili olduğunuz site ve hesaplarda kullanın. Site kullanım şartları ve eğitim / sınav kuralları sizin sorumluluğunuzdadır.
