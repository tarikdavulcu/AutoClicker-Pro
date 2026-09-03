# ADBS Otomatik İleri Butonu - Chrome Extension

## Amaç
`adbs.uab.gov.tr` sitesindeki eğitim sayfalarında geri sayım sayacı **00:00**'a ulaştığında **"İleri"** butonunu otomatik olarak tıklayan bir Chrome/Edge uzantısı.

## Sayfadan Tespit Edilen Gerçek Selector'lar

### Sayaç (Timer)
```html
<div class="dx-item dx-toolbar-item dx-toolbar-button d-flex align-items-center h-100">
  <b class="me-2">Kalan Zaman: </b>
  <h5 class="mb-0" style="min-width: 50px;">00:00</h5>
  <i class="fa fa-clock-o ms-2"></i>
</div>
```
- **Selector:** `h5.mb-0` (Angular component: `_ngcontent-*-c108`)
- **Parent label:** `"Kalan Zaman: "` ifadesinin yanındaki `<h5>` elementi
- **Format:** `MM:SS` (örn: `05:00`, `00:00`)

### İleri Butonu
```html
<dx-button class="dx-button dx-button-success dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text"
           aria-label="İleri" role="button">
  <div class="dx-button-content">
    <i class="dx-icon dx-icon-chevronright"></i>
    <span class="dx-button-text">İleri</span>
  </div>
</dx-button>
```
- **Selector:** `dx-button[aria-label="İleri"]`
- **Tıklanacak element:** `dx-button[aria-label="İleri"]` (DevExtreme widget)
- **Disabled durumu:** `dx-state-disabled` CSS class'ı eklenir

### Geri Butonu (referans)
- **Selector:** `dx-button[aria-label="Geri"]`

## Dosya Yapısı

```
chrome-extension/
├── IMPLEMENTATION_PLAN.md   ← Bu dosya
├── manifest.json            ← Extension manifest (Manifest V3)
├── content.js               ← Sayfaya enjekte edilen ana script
├── popup.html               ← Uzantı popup arayüzü (açma/kapama + log)
├── popup.js                 ← Popup mantığı
└── icons/
    └── icon48.png           ← Uzantı ikonu (basit SVG/PNG)
```

## Nasıl Çalışacak

### 1. `manifest.json`
- **Manifest V3** formatında (Chrome & Edge uyumlu).
- `content_scripts` ile `*://adbs.uab.gov.tr/*` adreslerinde `content.js` otomatik yüklenir.
- `storage` permission ile açma/kapama durumu hatırlanır.

### 2. `content.js` (Ana Mantık)
Her **1 saniyede** bir çalışan `setInterval` döngüsü:

1. **Sayaç Tespiti:**
   - **Birincil:** `h5.mb-0` elementini bul, yanındaki `<b>` etiketinde `"Kalan Zaman"` yazıyorsa doğru element.
   - **Yedek:** Tüm `h5` elementlerini tara, `MM:SS` formatında metin içereni bul.

2. **Sayaç 00:00 Kontrolü:** Sayaç metni `"00:00"` veya `"0:00"` ise sonraki adıma geç.

3. **İleri Butonu Tespiti:**
   - **Birincil:** `dx-button[aria-label="İleri"]` selector'ı.
   - **Yedek:** `span.dx-button-text` içinde "İleri" yazan elementin parent `dx-button`'ı.

4. **Disabled Kontrolü:** `dx-state-disabled` class'ı yoksa buton aktiftir.

5. **Tıklama:** Buton aktifse `.click()` ile tıkla.

6. **Yeni Sayfa/Bölüm:** Angular route değişiminde DOM güncellenir. `setInterval` zaten çalıştığı için yeni sayacı otomatik algılar.

7. **Hata Yönetimi:** Element bulunamazsa sessizce `continue`, hata fırlatmaz.

8. **Console Log:** Her tıklama ve durum değişikliğinde `console.log('[ADBS-Auto]', ...)` ile bilgi yazar.

### 3. `popup.html` + `popup.js`
- Toggle switch: **Aktif / Pasif**.
- Son tıklama zamanı ve toplam tıklama sayısı gösterilir.
- Durum `chrome.storage.local`'da saklanır.

## Teknik Detaylar

| Özellik | Değer |
|---------|-------|
| Manifest versiyonu | V3 |
| Tarayıcı desteği | Chrome 88+, Edge 88+ |
| Kontrol aralığı | 1000ms (1 saniye) |
| Site filtresi | `*://adbs.uab.gov.tr/*` |
| Sayaç selector | `h5.mb-0` (parent: "Kalan Zaman") |
| Buton selector | `dx-button[aria-label="İleri"]` |
| Disabled class | `dx-state-disabled` |
| UI framework | DevExtreme + Angular 11 |

## Kurulum (Kullanıcı İçin)
1. `chrome://extensions` sayfasını aç.
2. **Geliştirici modu**'nu aç.
3. **Paketlenmemiş uzantı yükle** → `chrome-extension` klasörünü seç.
4. Uzantı ikonuna tıkla → **Aktif** yap.
5. `adbs.uab.gov.tr` eğitim sayfasına git — otomatik çalışacak.

## Onay Bekleniyor
> ⚠️ Bu plan onaylandıktan sonra kod dosyaları oluşturulacaktır.
