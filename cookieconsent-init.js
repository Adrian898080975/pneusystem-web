/* Pneusystem — CookieConsent v3 konfiguracia
   GA: dopln merace ID (G-XXXXXXXXXX) do GA_MEASUREMENT_ID.
   Kym je prazdne, analytika sa nenacita ani po suhlase. */

var GA_MEASUREMENT_ID = '';

var gaLoaded = false;
function loadAnalytics() {
  if (!GA_MEASUREMENT_ID || gaLoaded) return;
  gaLoaded = true;
  gtag('consent', 'update', { analytics_storage: 'granted' });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

function unloadAnalytics() {
  gtag('consent', 'update', { analytics_storage: 'denied' });
}

function loadMaps() {
  var f = document.getElementById('gmapsEmbed');
  var p = document.getElementById('gmapsPlaceholder');
  if (f && !f.src && f.dataset.src) f.src = f.dataset.src;
  if (f) f.style.display = '';
  if (p) p.style.display = 'none';
}

function unloadMaps() {
  var f = document.getElementById('gmapsEmbed');
  var p = document.getElementById('gmapsPlaceholder');
  if (f) { f.removeAttribute('src'); f.style.display = 'none'; }
  if (p) p.style.display = 'flex';
}

function applyConsent() {
  if (CookieConsent.acceptedCategory('analytics')) loadAnalytics();
  else unloadAnalytics();
  if (CookieConsent.acceptedCategory('functional')) loadMaps();
  else unloadMaps();
}

CookieConsent.run({
  cookie: {
    name: 'cc_pneusystem',
    expiresAfterDays: 182
  },
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom left',
      equalWeightButtons: true,
      flipButtons: false
    },
    preferencesModal: {
      layout: 'box',
      equalWeightButtons: true
    }
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true
    },
    functional: {},
    analytics: {
      autoClear: {
        cookies: [
          { name: /^_ga/ },
          { name: '_gid' }
        ]
      }
    }
  },
  onConsent: applyConsent,
  onChange: applyConsent,
  language: {
    default: 'sk',
    translations: {
      sk: {
        consentModal: {
          title: 'Cookies na tomto webe',
          description: 'Používame nevyhnutné cookies na fungovanie stránky. S vaším súhlasom aj funkčné cookies (mapa Google) a analytické cookies na meranie návštevnosti. Podrobnosti nájdete v dokumente <a href="ochrana-osobnych-udajov.html">Ochrana osobných údajov</a>.',
          acceptAllBtn: 'Prijať všetky',
          acceptNecessaryBtn: 'Iba nevyhnutné',
          showPreferencesBtn: 'Nastavenia'
        },
        preferencesModal: {
          title: 'Nastavenia cookies',
          acceptAllBtn: 'Prijať všetky',
          acceptNecessaryBtn: 'Iba nevyhnutné',
          savePreferencesBtn: 'Uložiť výber',
          closeIconLabel: 'Zavrieť',
          sections: [
            {
              title: 'Nevyhnutné cookies',
              description: 'Technické úložisko potrebné na fungovanie stránky a zapamätanie vašej voľby súhlasu. Nedajú sa vypnúť.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Funkčné cookies',
              description: 'Umožňujú načítanie mapy Google v sekcii Kontakt. Pri načítaní mapy sa prenášajú údaje (IP adresa) spoločnosti Google.',
              linkedCategory: 'functional'
            },
            {
              title: 'Analytické cookies',
              description: 'Google Analytics — anonymné meranie návštevnosti stránky. Pomáha nám zlepšovať web.',
              linkedCategory: 'analytics'
            },
            {
              title: 'Viac informácií',
              description: 'Podrobnosti o spracúvaní osobných údajov nájdete na stránke <a href="ochrana-osobnych-udajov.html">Ochrana osobných údajov</a>.'
            }
          ]
        }
      }
    }
  }
});
