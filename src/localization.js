/* ================================================================
   Weverse Online Shop — Worldwide Localization Engine
   ================================================================
   Detects visitor country, region, timezone, language, currency.
   Supports VPN/proxy detection with polite notice.
   Persists all preferences. Provides live clock + formatters.
   Works across website, Android, iOS, tablets, desktop.
   ================================================================ */

import { COUNTRIES, COUNTRY_CURRENCY, SUPPORTED_CURRENCIES, getCountryByCode } from './country-data.js';

// ── Currency symbols & locale maps ────────────────────────────
export const CURRENCY_INFO = {
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
  EUR: { symbol: '€', locale: 'de-DE' },
  CAD: { symbol: 'C$', locale: 'en-CA' },
  AUD: { symbol: 'A$', locale: 'en-AU' },
  SGD: { symbol: 'S$', locale: 'en-SG' },
  JPY: { symbol: '¥', locale: 'ja-JP' },
  MXN: { symbol: 'Mex$', locale: 'es-MX' },
  IDR: { symbol: 'Rp', locale: 'id-ID' },
  CHF: { symbol: 'CHF', locale: 'de-CH' },
  CNY: { symbol: '¥', locale: 'zh-CN' },
  INR: { symbol: '₹', locale: 'hi-IN' },
  BRL: { symbol: 'R$', locale: 'pt-BR' },
  ZAR: { symbol: 'R', locale: 'en-ZA' },
  NGN: { symbol: '₦', locale: 'en-NG' },
  AED: { symbol: 'د.إ', locale: 'ar-AE' },
  SAR: { symbol: '﷼', locale: 'ar-SA' },
  RUB: { symbol: '₽', locale: 'ru-RU' },
  TRY: { symbol: '₺', locale: 'tr-TR' },
  KRW: { symbol: '₩', locale: 'ko-KR' },
  THB: { symbol: '฿', locale: 'th-TH' },
  PLN: { symbol: 'zł', locale: 'pl-PL' },
  SEK: { symbol: 'kr', locale: 'sv-SE' },
  NOK: { symbol: 'kr', locale: 'nb-NO' },
  DKK: { symbol: 'kr', locale: 'da-DK' },
  NZD: { symbol: 'NZ$', locale: 'en-NZ' },
  HKD: { symbol: 'HK$', locale: 'zh-HK' },
  TWD: { symbol: 'NT$', locale: 'zh-TW' },
  MYR: { symbol: 'RM', locale: 'ms-MY' },
  PHP: { symbol: '₱', locale: 'en-PH' },
  VND: { symbol: '₫', locale: 'vi-VN' },
  EGP: { symbol: 'E£', locale: 'ar-EG' },
  KES: { symbol: 'KSh', locale: 'sw-KE' },
  GHS: { symbol: 'GH₵', locale: 'en-GH' },
  ARS: { symbol: '$', locale: 'es-AR' },
  CLP: { symbol: '$', locale: 'es-CL' },
  COP: { symbol: 'Col$', locale: 'es-CO' },
  PEN: { symbol: 'S/', locale: 'es-PE' },
  UAH: { symbol: '₴', locale: 'uk-UA' },
  ILS: { symbol: '₪', locale: 'he-IL' },
  PKR: { symbol: '₨', locale: 'ur-PK' },
  BDT: { symbol: '৳', locale: 'bn-BD' },
  CZK: { symbol: 'Kč', locale: 'cs-CZ' },
  HUF: { symbol: 'Ft', locale: 'hu-HU' },
  RON: { symbol: 'lei', locale: 'ro-RO' },
  BGN: { symbol: 'лв', locale: 'bg-BG' },
  HRK: { symbol: 'kn', locale: 'hr-HR' },
  ISK: { symbol: 'kr', locale: 'is-IS' },
  JOD: { symbol: 'JD', locale: 'ar-JO' },
  QAR: { symbol: '﷼', locale: 'ar-QA' },
  KWD: { symbol: 'د.ك', locale: 'ar-KW' },
  BHD: { symbol: 'BD', locale: 'ar-BH' },
  OMR: { symbol: '﷼', locale: 'ar-OM' },
  MAD: { symbol: 'د.م.', locale: 'ar-MA' },
  DZD: { symbol: 'د.ج', locale: 'ar-DZ' },
  TND: { symbol: 'د.ت', locale: 'ar-TN' },
  LBP: { symbol: 'ل.ل', locale: 'ar-LB' },
  IQD: { symbol: 'ع.د', locale: 'ar-IQ' },
  LKR: { symbol: 'Rs', locale: 'si-LK' },
  NRS: { symbol: 'रू', locale: 'ne-NP' },
  UGX: { symbol: 'USh', locale: 'sw-UG' },
  TZS: { symbol: 'TSh', locale: 'sw-TZ' },
  ETB: { symbol: 'Br', locale: 'am-ET' },
  XOF: { symbol: 'CFA', locale: 'fr-SN' },
  XAF: { symbol: 'FCFA', locale: 'fr-CM' },
  GEL: { symbol: '₾', locale: 'ka-GE' },
  AZN: { symbol: '₼', locale: 'az-AZ' },
  AMD: { symbol: '֏', locale: 'hy-AM' },
  BYN: { symbol: 'Br', locale: 'be-BY' },
  UZS: { symbol: 'soʻm', locale: 'uz-UZ' },
  KZT: { symbol: '₸', locale: 'kk-KZ' },
  RSD: { symbol: 'дин', locale: 'sr-RS' },
  MKD: { symbol: 'ден', locale: 'mk-MK' },
  ALL: { symbol: 'L', locale: 'sq-AL' },
  BAM: { symbol: 'KM', locale: 'bs-BA' },
  VEF: { symbol: 'Bs', locale: 'es-VE' },
  BOB: { symbol: 'Bs', locale: 'es-BO' },
  PYG: { symbol: '₲', locale: 'es-PY' },
  UYU: { symbol: '$U', locale: 'es-UY' },
  DOP: { symbol: 'RD$', locale: 'es-DO' },
  GTQ: { symbol: 'Q', locale: 'es-GT' },
  HNL: { symbol: 'L', locale: 'es-HN' },
  NIO: { symbol: 'C$', locale: 'es-NI' },
  CRC: { symbol: '₡', locale: 'es-CR' },
  PAB: { symbol: 'B/.', locale: 'es-PA' },
  GTQ2: { symbol: 'Q', locale: 'es-GT' },
};

// Extend supported currencies with all from CURRENCY_INFO
export const ALL_CURRENCIES = [...new Set([...SUPPORTED_CURRENCIES, ...Object.keys(CURRENCY_INFO)])];

// ── Language data (ISO 639-1 — all major world languages) ──────
export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'bg', name: 'Bulgarian', native: 'Български' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'ha', name: 'Hausa', native: 'Hausa' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  { code: 'ig', name: 'Igbo', native: 'Igbo' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', native: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'si', name: 'Sinhala', native: 'සිංහල' },
  { code: 'my', name: 'Burmese', native: 'ဗမာ' },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ' },
  { code: 'lo', name: 'Lao', native: 'ລາວ' },
  { code: 'ka', name: 'Georgian', native: 'ქართული' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ' },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbek' },
  { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча' },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
  { code: 'tk', name: 'Turkmen', native: 'Türkmen' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол' },
  { code: 'et', name: 'Estonian', native: 'Eesti' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  { code: 'eu', name: 'Basque', native: 'Euskara' },
  { code: 'ca', name: 'Catalan', native: 'Català' },
  { code: 'gl', name: 'Galician', native: 'Galego' },
  { code: 'mt', name: 'Maltese', native: 'Malti' },
  { code: 'sq', name: 'Albanian', native: 'Shqip' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
  { code: 'be', name: 'Belarusian', native: 'Беларуская' },
  { code: 'fo', name: 'Faroese', native: 'Føroyskt' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
  { code: 'rm', name: 'Romansh', native: 'Rumantsch' },
  { code: 'fy', name: 'Frisian', native: 'Frysk' },
  { code: 'oc', name: 'Occitan', native: 'Occitan' },
  { code: 'la', name: 'Latin', native: 'Latina' },
  { code: 'eo', name: 'Esperanto', native: 'Esperanto' },
  { code: 'jv', name: 'Javanese', native: 'Basa Jawa' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda' },
  { code: 'tl', name: 'Filipino', native: 'Filipino' },
  { code: 'ceb', name: 'Cebuano', native: 'Cebuano' },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy' },
  { code: 'sm', name: 'Samoan', native: 'Gagana Samoa' },
  { code: 'to', name: 'Tongan', native: 'Lea Faka-Tonga' },
  { code: 'mi', name: 'Maori', native: 'Māori' },
  { code: 'qu', name: 'Quechua', native: 'Runa Simi' },
  { code: 'gn', name: 'Guarani', native: 'Avañeẽ' },
  { code: 'ay', name: 'Aymara', native: 'Aymar aru' },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl Ayisyen' },
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש' },
  { code: 'ku', name: 'Kurdish', native: 'Kurdî' },
  { code: 'ps', name: 'Pashto', native: 'پښتو' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'dv', name: 'Dhivehi', native: 'ދިވެހި' },
  { code: 'wo', name: 'Wolof', native: 'Wolof' },
  { code: 'st', name: 'Sesotho', native: 'Sesotho' },
  { code: 'tn', name: 'Setswana', native: 'Setswana' },
  { code: 'rw', name: 'Kinyarwanda', native: 'Kinyarwanda' },
  { code: 'rn', name: 'Kirundi', native: 'Ikirundi' },
  { code: 'ln', name: 'Lingala', native: 'Lingala' },
  { code: 'sg', name: 'Sango', native: 'Sängö' },
  { code: 'ee', name: 'Ewe', native: 'Eʋegbe' },
  { code: 'tt', name: 'Tatar', native: 'Татар' },
  { code: 'ba', name: 'Bashkir', native: 'Башҡорт' },
  { code: 'ce', name: 'Chechen', native: 'Нохчийн' },
  { code: 'os', name: 'Ossetian', native: 'Ирон' },
];

// ── Country → default language mapping ────────────────────────
const COUNTRY_LANGUAGE = {
  US: 'en', GB: 'en', AU: 'en', NZ: 'en', CA: 'en', IE: 'en',
  ZA: 'en', NG: 'en', GH: 'en', KE: 'sw', TZ: 'sw', UG: 'sw',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  VE: 'es', BO: 'es', PY: 'es', UY: 'es', CR: 'es', PA: 'es',
  GT: 'es', HN: 'es', SV: 'es', NI: 'es', CU: 'es', DO: 'es',
  EC: 'es', GQ: 'es',
  FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr', HT: 'fr', SN: 'fr',
  CI: 'fr', ML: 'fr', BF: 'fr', NE: 'fr', TG: 'fr', BJ: 'fr',
  GA: 'fr', CG: 'fr', CD: 'fr', MG: 'fr', CM: 'fr',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de',
  IT: 'it', SM: 'it', VA: 'it',
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt', GW: 'pt', TL: 'pt',
  NL: 'nl', BE2: 'nl',
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
  AR2: 'ar', SA: 'ar', AE: 'ar', EG: 'ar', DZ: 'ar', MA: 'ar',
  TN: 'ar', LY: 'ar', SY: 'ar', JO: 'ar', LB: 'ar', IQ: 'ar',
  KW: 'ar', QA: 'ar', BH: 'ar', OM: 'ar', YE: 'ar', SD: 'ar',
  MR: 'ar', DJ: 'ar', SO: 'ar', KM: 'ar',
  CN: 'zh', TW: 'zh', HK: 'zh', SG2: 'zh',
  JP: 'ja', KR: 'ko', KP: 'ko',
  IN: 'hi', PK: 'ur', BD: 'bn', LK: 'si', NP: 'ne',
  IR: 'fa', AF: 'fa',
  TR: 'tr', AZ: 'az', UZ: 'uz', TM: 'tk', KZ2: 'kk', KG2: 'ky',
  ID: 'id', MY: 'ms', BN: 'ms',
  TH: 'th', VN: 'vi', KH: 'km', LA: 'lo', MM: 'my',
  PL: 'pl', CZ: 'cs', SK: 'sk', HU: 'hu', RO: 'ro',
  BG: 'bg', HR: 'hr', SR: 'sr', SI: 'sl', MK: 'mk', BA: 'bs',
  SE: 'sv', DK: 'da', FI: 'fi', NO: 'no', IS: 'is',
  UA: 'uk', EL: 'el', GR: 'el', CY: 'el',
  IL: 'he', ET: 'am', GE: 'ka', AM: 'hy',
};

// ── Country → timezone mapping (major countries) ──────────────
const COUNTRY_TIMEZONE = {
  US: 'America/New_York', GB: 'Europe/London', IE: 'Europe/Dublin',
  FR: 'Europe/Paris', DE: 'Europe/Berlin', IT: 'Europe/Rome',
  ES: 'Europe/Madrid', PT: 'Europe/Lisbon', NL: 'Europe/Amsterdam',
  BE: 'Europe/Brussels', LU: 'Europe/Luxembourg', CH: 'Europe/Zurich',
  AT: 'Europe/Vienna', SE: 'Europe/Stockholm', NO: 'Europe/Oslo',
  DK: 'Europe/Copenhagen', FI: 'Europe/Helsinki', IS: 'Atlantic/Reykjavik',
  PL: 'Europe/Warsaw', CZ: 'Europe/Prague', SK: 'Europe/Bratislava',
  HU: 'Europe/Budapest', RO: 'Europe/Bucharest', BG: 'Europe/Sofia',
  HR: 'Europe/Zagreb', SI: 'Europe/Ljubljana', SR: 'Europe/Belgrade',
  GR: 'Europe/Athens', CY: 'Europe/Nicosia', MT: 'Europe/Malta',
  RU: 'Europe/Moscow', UA: 'Europe/Kyiv', BY: 'Europe/Minsk',
  MD: 'Europe/Chisinau', LT: 'Europe/Vilnius', LV: 'Europe/Riga',
  EE: 'Europe/Tallinn',
  CA: 'America/Toronto', US2: 'America/Chicago', US3: 'America/Denver',
  US4: 'America/Los_Angeles', US5: 'America/Anchorage', US6: 'Pacific/Honolulu',
  MX: 'America/Mexico_City', BR: 'America/Sao_Paulo', AR: 'America/Argentina/Buenos_Aires',
  CL: 'America/Santiago', CO: 'America/Bogota', PE: 'America/Lima',
  VE: 'America/Caracas', BO: 'America/La_Paz', PY: 'America/Asuncion',
  UY: 'America/Montevideo', EC: 'America/Guayaquil', GY: 'America/Guyana',
  SR: 'America/Paramaribo', CR: 'America/Costa_Rica', PA: 'America/Panama',
  GT: 'America/Guatemala', HN: 'America/Tegucigalpa', SV: 'America/El_Salvador',
  NI: 'America/Managua', BZ: 'America/Belize', CU: 'America/Havana',
  DO: 'America/Santo_Domingo', HT: 'America/Port-au-Prince', JM: 'America/Jamaica',
  BS: 'America/Nassau', BB: 'America/Barbados', TT: 'America/Port_of_Spain',
  PR: 'America/Puerto_Rico',
  AU: 'Australia/Sydney', NZ: 'Pacific/Auckland', FJ: 'Pacific/Fiji',
  PG: 'Pacific/Port_Moresby', SB: 'Pacific/Guadalcanal', VU: 'Pacific/Efate',
  WS: 'Pacific/Apia', TO: 'Pacific/Tongatapu', KI: 'Pacific/Tarawa',
  CN: 'Asia/Shanghai', HK: 'Asia/Hong_Kong', TW: 'Asia/Taipei',
  JP: 'Asia/Tokyo', KR: 'Asia/Seoul', KP: 'Asia/Pyongyang',
  IN: 'Asia/Kolkata', PK: 'Asia/Karachi', BD: 'Asia/Dhaka',
  LK: 'Asia/Colombo', NP: 'Asia/Kathmandu', BT: 'Asia/Thimphu',
  MV: 'Indian/Maldives',
  TH: 'Asia/Bangkok', VN: 'Asia/Ho_Chi_Minh', MY: 'Asia/Kuala_Lumpur',
  SG: 'Asia/Singapore', PH: 'Asia/Manila', KH: 'Asia/Phnom_Penh',
  LA: 'Asia/Vientiane', MM: 'Asia/Yangon', BN: 'Asia/Brunei',
  ID: 'Asia/Jakarta', TL: 'Asia/Dili',
  MN: 'Asia/Ulaanbaatar', KZ: 'Asia/Almaty', UZ: 'Asia/Tashkent',
  TM: 'Asia/Ashgabat', KG: 'Asia/Bishkek', TJ: 'Asia/Dushanbe',
  AF: 'Asia/Kabul', IR: 'Asia/Tehran', IQ: 'Asia/Baghdad',
  SY: 'Asia/Damascus', JO: 'Asia/Amman', LB: 'Asia/Beirut',
  IL: 'Asia/Jerusalem', PS: 'Asia/Gaza', SA: 'Asia/Riyadh',
  AE: 'Asia/Dubai', QA: 'Asia/Qatar', KW: 'Asia/Kuwait',
  BH: 'Asia/Bahrain', OM: 'Asia/Muscat', YE: 'Asia/Aden',
  TR: 'Europe/Istanbul', GE: 'Asia/Tbilisi', AM: 'Asia/Yerevan',
  AZ: 'Asia/Baku',
  EG: 'Africa/Cairo', LY: 'Africa/Tripoli', TN: 'Africa/Tunis',
  DZ: 'Africa/Algiers', MA: 'Africa/Casablanca', EH: 'Africa/El_Aaiun',
  MR: 'Africa/Nouakchott', ML: 'Africa/Bamako', NE: 'Africa/Niamey',
  TD: 'Africa/Ndjamena', SD: 'Africa/Khartoum', SS: 'Africa/Juba',
  ER: 'Africa/Asmara', DJ: 'Africa/Djibouti', ET: 'Africa/Addis_Ababa',
  SO: 'Africa/Mogadishu', KE: 'Africa/Nairobi', UG: 'Africa/Kampala',
  TZ: 'Africa/Dar_es_Salaam', RW: 'Africa/Kigali', BI: 'Africa/Bujumbura',
  CD: 'Africa/Kinshasa', CG: 'Africa/Brazzaville', CF: 'Africa/Bangui',
  CM: 'Africa/Douala', GA: 'Africa/Libreville', GQ: 'Africa/Malabo',
  ST: 'Africa/Sao_Tome', AO: 'Africa/Luanda', ZM: 'Africa/Lusaka',
  ZW: 'Africa/Harare', MW: 'Africa/Lilongwe', MZ: 'Africa/Maputo',
  BW: 'Africa/Gaborone', NA: 'Africa/Windhoek', ZA: 'Africa/Johannesburg',
  LS: 'Africa/Maseru', SZ: 'Africa/Mbabane', MG: 'Indian/Antananarivo',
  MU: 'Indian/Mauritius', SC: 'Indian/Mahe', KM: 'Indian/Comoro',
  RE: 'Indian/Reunion', YT: 'Indian/Mayotte',
  GH: 'Africa/Accra', NG: 'Africa/Lagos', BJ: 'Africa/Porto-Novo',
  TG: 'Africa/Lome', CI: 'Africa/Abidjan', BF: 'Africa/Ouagadougou',
  SL: 'Africa/Freetown', LR: 'Africa/Monrovia', GN: 'Africa/Conakry',
  GW: 'Africa/Bissau', SN: 'Africa/Dakar', GM: 'Africa/Banjul',
  CV: 'Atlantic/Cape_Verde',
};

// ── State ──────────────────────────────────────────────────────
let currentLocale = {
  country: 'US',
  countryName: 'United States',
  flag: '🇺🇸',
  language: 'en',
  currency: 'USD',
  timezone: 'America/New_York',
  city: null,
  region: null,
  isVPN: false,
  detectionSource: 'default',
};

let clockInterval = null;
let listeners = [];

// ── Persistence ───────────────────────────────────────────────
const STORAGE_KEY = 'kco_locale';

function saveLocale() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentLocale));
  } catch (e) { /* noop */ }
}

function loadSavedLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      currentLocale = { ...currentLocale, ...parsed };
      return true;
    }
  } catch (e) { /* noop */ }
  return false;
}

// ── Browser language detection ────────────────────────────────
function detectBrowserLanguage() {
  const browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
  const supported = LANGUAGES.find(l => l.code === browserLang);
  return supported ? browserLang : 'en';
}

// ── Timezone detection ────────────────────────────────────────
function detectTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz;
  } catch (e) { /* noop */ }
  return null;
}

// ── Country → default timezone ────────────────────────────────
function getDefaultTimezone(countryCode) {
  return COUNTRY_TIMEZONE[countryCode] || COUNTRY_TIMEZONE[countryCode + '2'] || 'UTC';
}

// ── Country → default language ────────────────────────────────
export function getDefaultLanguage(countryCode) {
  return COUNTRY_LANGUAGE[countryCode] || 'en';
}

// ── Country → currency ────────────────────────────────────────
export function getCurrencyForCountry(countryCode) {
  return COUNTRY_CURRENCY[countryCode] || 'USD';
}

// ── Geolocation via free API (no key required) ─────────────────
async function detectLocation() {
  // Try multiple free geolocation services for reliability
  const services = [
    'https://ipapi.co/json/',
    'https://ipwho.is/',
    'https://get.geojs.io/v1/ip/geo.json',
  ];

  for (const url of services) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) continue;
      const data = await res.json();

      // Normalize response from different providers
      let countryCode, countryName, city, region, timezone, isVPN;

      if (url.includes('ipapi.co')) {
        countryCode = data.country_code;
        countryName = data.country_name;
        city = data.city;
        region = data.region;
        timezone = data.timezone;
        isVPN = false; // ipapi.co free tier doesn't expose VPN
      } else if (url.includes('ipwho.is')) {
        countryCode = data.country_code;
        countryName = data.country;
        city = data.city;
        region = data.region;
        timezone = data.timezone?.id;
        isVPN = data.security?.vpn || data.security?.proxy || false;
      } else if (url.includes('geojs.io')) {
        countryCode = data.country_code;
        countryName = data.country;
        city = data.city;
        region = data.region;
        timezone = data.timezone;
        isVPN = false;
      }

      if (countryCode && countryCode.length === 2) {
        const country = getCountryByCode(countryCode);
        return {
          country: countryCode,
          countryName: country?.name || countryName || countryCode,
          flag: country?.flag || '🏳️',
          city: city || null,
          region: region || null,
          timezone: timezone || detectTimezone() || getDefaultTimezone(countryCode),
          isVPN: !!isVPN,
          detectionSource: 'geo',
        };
      }
    } catch (e) {
      continue;
    }
  }

  // Fallback: use browser timezone to guess country
  const tz = detectTimezone();
  if (tz) {
    const tzCountry = Object.entries(COUNTRY_TIMEZONE).find(([, t]) => t === tz);
    if (tzCountry) {
      const code = tzCountry[0].replace(/\d+$/, '');
      const country = getCountryByCode(code);
      if (country) {
        return {
          country: code,
          countryName: country.name,
          flag: country.flag,
          city: null,
          region: null,
          timezone: tz,
          isVPN: false,
          detectionSource: 'timezone',
        };
      }
    }
  }

  return {
    country: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    city: null,
    region: null,
    timezone: detectTimezone() || 'America/New_York',
    isVPN: false,
    detectionSource: 'default',
  };
}

// ── Initialize localization ───────────────────────────────────
export async function initLocalization() {
  // Step 1: Load saved preferences (highest priority)
  const hasSaved = loadSavedLocale();

  if (!hasSaved) {
    // Step 2: Auto-detect location
    const detected = await detectLocation();
    const browserLang = detectBrowserLanguage();
    const detectedTz = detectTimezone();

    // Prefer the detected country's native language so a visitor from a
    // non-English country always sees the site in their own language even if
    // their browser is set to English. Only a manual choice overrides this.
    const countryLang = getDefaultLanguage(detected.country);
    const isSupported = LANGUAGES.some(l => l.code === countryLang);
    const preferredLanguage = isSupported ? countryLang : browserLang;

    currentLocale = {
      ...currentLocale,
      ...detected,
      language: preferredLanguage,
      timezone: detectedTz || detected.timezone || getDefaultTimezone(detected.country),
      currency: getCurrencyForCountry(detected.country),
    };
    saveLocale();
  }

  // Always update timezone from browser if available and not manually set
  if (!hasSaved || !currentLocale.timezoneManuallySet) {
    const browserTz = detectTimezone();
    if (browserTz) currentLocale.timezone = browserTz;
  }

  notifyListeners();
  return currentLocale;
}

// ── Getters ────────────────────────────────────────────────────
export function getLocale() {
  return { ...currentLocale };
}

export function getCountry() { return currentLocale.country; }
export function getLanguage() { return currentLocale.language; }
export function getCurrency() { return currentLocale.currency; }
export function getTimezone() { return currentLocale.timezone; }
export function isVPN() { return currentLocale.isVPN; }
export function getCountryName() { return currentLocale.countryName; }
export function getFlag() { return currentLocale.flag; }
export function getCity() { return currentLocale.city; }

// ── Setters (persist + notify) ─────────────────────────────────
export function setCountry(code) {
  const country = getCountryByCode(code);
  if (!country) return;
  currentLocale.country = code;
  currentLocale.countryName = country.name;
  currentLocale.flag = country.flag;
  // Auto-update currency and language to match new country
  currentLocale.currency = getCurrencyForCountry(code);
  if (!currentLocale.languageManuallySet) {
    currentLocale.language = getDefaultLanguage(code);
  }
  if (!currentLocale.timezoneManuallySet) {
    currentLocale.timezone = getDefaultTimezone(code);
  }
  saveLocale();
  notifyListeners();
}

export function setLanguage(code) {
  currentLocale.language = code;
  currentLocale.languageManuallySet = true;
  saveLocale();
  notifyListeners();
  // Dispatch event for AI widget and other components
  window.dispatchEvent(new CustomEvent('kco-language-changed', { detail: { language: code } }));
}

export function setCurrency(code) {
  currentLocale.currency = code;
  currentLocale.currencyManuallySet = true;
  saveLocale();
  notifyListeners();
  window.dispatchEvent(new CustomEvent('kco-currency-changed', { detail: { currency: code } }));
}

export function setTimezone(tz) {
  currentLocale.timezone = tz;
  currentLocale.timezoneManuallySet = true;
  saveLocale();
  notifyListeners();
}

// ── Formatters ─────────────────────────────────────────────────
export function formatCurrency(amount, currency) {
  const cur = currency || currentLocale.currency;
  const info = CURRENCY_INFO[cur] || CURRENCY_INFO.USD;
  try {
    return new Intl.NumberFormat(info.locale, {
      style: 'currency',
      currency: cur,
      minimumFractionDigits: cur === 'JPY' || cur === 'KRW' ? 0 : 2,
      maximumFractionDigits: cur === 'JPY' || cur === 'KRW' ? 0 : 2,
    }).format(amount);
  } catch (e) {
    const symbol = info.symbol || '$';
    return `${symbol}${amount.toFixed(2)}`;
  }
}

export function formatDate(date, options) {
  const d = date instanceof Date ? date : new Date(date);
  try {
    return new Intl.DateTimeFormat(currentLocale.language, {
      timeZone: currentLocale.timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    }).format(d);
  } catch (e) {
    return d.toLocaleDateString();
  }
}

export function formatTime(date, options) {
  const d = date instanceof Date ? date : new Date(date);
  try {
    return new Intl.DateTimeFormat(currentLocale.language, {
      timeZone: currentLocale.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      ...options,
    }).format(d);
  } catch (e) {
    return d.toLocaleTimeString();
  }
}

export function formatDateTime(date) {
  return `${formatDate(date)} · ${formatTime(date)}`;
}

// ── Live clock ─────────────────────────────────────────────────
export function startLiveClock(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date();
    try {
      const formatted = new Intl.DateTimeFormat(currentLocale.language, {
        timeZone: currentLocale.timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      el.textContent = formatted;
    } catch (e) {
      el.textContent = now.toLocaleString();
    }
  }

  update();
  if (clockInterval) clearInterval(clockInterval);
  clockInterval = setInterval(update, 1000);
}

// ── Listener pattern ──────────────────────────────────────────
export function onLocaleChange(callback) {
  listeners.push(callback);
  return () => { listeners = listeners.filter(l => l !== callback); };
}

function notifyListeners() {
  listeners.forEach(cb => {
    try { cb(currentLocale); } catch (e) { /* noop */ }
  });
  window.dispatchEvent(new CustomEvent('kco-locale-changed', { detail: currentLocale }));
}

// ── Get all timezones ──────────────────────────────────────────
export function getAllTimezones() {
  try {
    const zones = Intl.supportedValuesOf('timeZone');
    return zones.sort();
  } catch (e) {
    return Object.values(COUNTRY_TIMEZONE).filter((v, i, a) => a.indexOf(v) === i).sort();
  }
}

// ── Get language info ──────────────────────────────────────────
export function getLanguageInfo(code) {
  return LANGUAGES.find(l => l.code === code) || { code, name: code, native: code };
}

// ── Get currency info ──────────────────────────────────────────
export function getCurrencyInfo(code) {
  return CURRENCY_INFO[code] || { symbol: code, locale: 'en-US' };
}

// ── Get all currencies sorted ──────────────────────────────────
export function getAllCurrencies() {
  return ALL_CURRENCIES.sort();
}

// ── Voice configuration ───────────────────────────────────────
export const VOICE_CONFIG = {
  default: { lang: 'en-US', gender: 'female', accent: 'US English', rate: 1, pitch: 1.05 },
  uk: { lang: 'en-GB', gender: 'female', accent: 'UK English', rate: 1, pitch: 1.05 },
};

export function getVoiceForLanguage(lang) {
  const langInfo = LANGUAGES.find(l => l.code === lang);
  if (!langInfo) return VOICE_CONFIG.default;

  // Map language to BCP-47 locale for TTS
  const localeMap = {
    en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT',
    pt: 'pt-PT', nl: 'nl-NL', ru: 'ru-RU', ar: 'ar-SA', zh: 'zh-CN',
    ja: 'ja-JP', ko: 'ko-KR', hi: 'hi-IN', bn: 'bn-IN', ur: 'ur-PK',
    fa: 'fa-IR', tr: 'tr-TR', id: 'id-ID', ms: 'ms-MY', th: 'th-TH',
    vi: 'vi-VN', pl: 'pl-PL', uk: 'uk-UA', cs: 'cs-CZ', sk: 'sk-SK',
    hu: 'hu-HU', ro: 'ro-RO', bg: 'bg-BG', hr: 'hr-HR', sr: 'sr-RS',
    sv: 'sv-SE', da: 'da-DK', fi: 'fi-FI', no: 'nb-NO', el: 'el-GR',
    he: 'he-IL', sw: 'sw-KE', am: 'am-ET', ta: 'ta-IN', te: 'te-IN',
    mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN',
    ne: 'ne-NP', si: 'si-LK', my: 'my-MM', km: 'km-KH', lo: 'lo-LA',
    ka: 'ka-GE', hy: 'hy-AM', az: 'az-AZ', kk: 'kk-KZ', uz: 'uz-UZ',
  };

  const locale = localeMap[lang] || 'en-US';
  return {
    lang: locale,
    gender: 'female',
    accent: langInfo.native,
    rate: 1,
    pitch: 1.05,
  };
}

// ── Select best available TTS voice ────────────────────────────
export function selectBestVoice(lang) {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const voiceConfig = getVoiceForLanguage(lang);
  const targetLang = voiceConfig.lang.toLowerCase();

  // Try exact match first
  let voice = voices.find(v => v.lang.toLowerCase() === targetLang);

  // Try partial match (language prefix)
  if (!voice) {
    const prefix = targetLang.split('-')[0];
    voice = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
  }

  // Prefer female voices
  if (voice) {
    const femaleVoice = voices.find(v =>
      v.lang.toLowerCase() === voice.lang.toLowerCase() &&
      (v.name.toLowerCase().includes('female') ||
       v.name.toLowerCase().includes('woman') ||
       v.name.toLowerCase().includes('samantha') ||
       v.name.toLowerCase().includes('google') ||
       v.name.toLowerCase().includes('zira') ||
       v.name.toLowerCase().includes('karen') ||
       v.name.toLowerCase().includes('moira') ||
       v.name.toLowerCase().includes('tessa') ||
       v.name.toLowerCase().includes('fiona'))
    );
    if (femaleVoice) voice = femaleVoice;
  }

  return voice || voices[0];
}
