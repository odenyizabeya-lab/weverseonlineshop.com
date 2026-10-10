/* ================================================================
   KCO GLOBAL ONLINE MARKETPLACE â€” PREMIUM HOMEPAGE ENGINE
   ================================================================ */

// ---- DATA: Countries (full global list, alphabetically sorted) ----
const COUNTRIES = [
  {code:"AF",name:"Afghanistan"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},
  {code:"AS",name:"American Samoa"},{code:"AD",name:"Andorra"},{code:"AO",name:"Angola"},
  {code:"AI",name:"Anguilla"},{code:"AG",name:"Antigua and Barbuda"},{code:"AR",name:"Argentina"},
  {code:"AM",name:"Armenia"},{code:"AW",name:"Aruba"},{code:"AU",name:"Australia"},
  {code:"AT",name:"Austria"},{code:"AZ",name:"Azerbaijan"},{code:"BS",name:"Bahamas"},
  {code:"BH",name:"Bahrain"},{code:"BD",name:"Bangladesh"},{code:"BB",name:"Barbados"},
  {code:"BY",name:"Belarus"},{code:"BE",name:"Belgium"},{code:"BZ",name:"Belize"},
  {code:"BJ",name:"Benin"},{code:"BM",name:"Bermuda"},{code:"BT",name:"Bhutan"},
  {code:"BO",name:"Bolivia"},{code:"BQ",name:"Bonaire, Sint Eustatius and Saba"},
  {code:"BA",name:"Bosnia and Herzegovina"},{code:"BW",name:"Botswana"},
  {code:"BV",name:"Bouvet Island"},{code:"BR",name:"Brazil"},
  {code:"IO",name:"British Indian Ocean Territory"},{code:"VG",name:"British Virgin Islands"},
  {code:"BN",name:"Brunei"},{code:"BG",name:"Bulgaria"},{code:"BF",name:"Burkina Faso"},
  {code:"BI",name:"Burundi"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},
  {code:"CA",name:"Canada"},{code:"CV",name:"Cape Verde"},{code:"KY",name:"Cayman Islands"},
  {code:"CF",name:"Central African Republic"},{code:"TD",name:"Chad"},
  {code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CX",name:"Christmas Island"},
  {code:"CC",name:"Cocos (Keeling) Islands"},{code:"CO",name:"Colombia"},
  {code:"KM",name:"Comoros"},{code:"CG",name:"Republic of the Congo"},
  {code:"CD",name:"Democratic Republic of the Congo"},{code:"CK",name:"Cook Islands"},
  {code:"CR",name:"Costa Rica"},{code:"CI",name:"Ivory Coast"},{code:"HR",name:"Croatia"},
  {code:"CU",name:"Cuba"},{code:"CW",name:"CuraÃ§ao"},{code:"CY",name:"Cyprus"},
  {code:"CZ",name:"Czech Republic"},{code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},
  {code:"DM",name:"Dominica"},{code:"DO",name:"Dominican Republic"},{code:"EC",name:"Ecuador"},
  {code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},{code:"GQ",name:"Equatorial Guinea"},
  {code:"ER",name:"Eritrea"},{code:"EE",name:"Estonia"},{code:"ET",name:"Ethiopia"},
  {code:"FK",name:"Falkland Islands"},{code:"FO",name:"Faroe Islands"},{code:"FJ",name:"Fiji"},
  {code:"FI",name:"Finland"},{code:"FR",name:"France"},{code:"GF",name:"French Guiana"},
  {code:"PF",name:"French Polynesia"},{code:"TF",name:"French Southern Territories"},
  {code:"GA",name:"Gabon"},{code:"GM",name:"Gambia"},{code:"GE",name:"Georgia"},
  {code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GI",name:"Gibraltar"},
  {code:"GR",name:"Greece"},{code:"GL",name:"Greenland"},{code:"GD",name:"Grenada"},
  {code:"GP",name:"Guadeloupe"},{code:"GU",name:"Guam"},{code:"GT",name:"Guatemala"},
  {code:"GG",name:"Guernsey"},{code:"GN",name:"Guinea"},{code:"GW",name:"Guinea-Bissau"},
  {code:"GY",name:"Guyana"},{code:"HT",name:"Haiti"},
  {code:"HM",name:"Heard Island and McDonald Islands"},{code:"HN",name:"Honduras"},
  {code:"HK",name:"Hong Kong"},{code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},
  {code:"IN",name:"India"},{code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},
  {code:"IQ",name:"Iraq"},{code:"IE",name:"Ireland"},{code:"IM",name:"Isle of Man"},
  {code:"IL",name:"Israel"},{code:"IT",name:"Italy"},{code:"JM",name:"Jamaica"},
  {code:"JP",name:"Japan"},{code:"JE",name:"Jersey"},{code:"JO",name:"Jordan"},
  {code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KI",name:"Kiribati"},
  {code:"KP",name:"North Korea"},{code:"KR",name:"South Korea"},{code:"KW",name:"Kuwait"},
  {code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Laos"},{code:"LV",name:"Latvia"},
  {code:"LB",name:"Lebanon"},{code:"LS",name:"Lesotho"},{code:"LR",name:"Liberia"},
  {code:"LY",name:"Libya"},{code:"LI",name:"Liechtenstein"},{code:"LT",name:"Lithuania"},
  {code:"LU",name:"Luxembourg"},{code:"MO",name:"Macao"},{code:"MK",name:"North Macedonia"},
  {code:"MG",name:"Madagascar"},{code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},
  {code:"MV",name:"Maldives"},{code:"ML",name:"Mali"},{code:"MT",name:"Malta"},
  {code:"MH",name:"Marshall Islands"},{code:"MQ",name:"Martinique"},{code:"MR",name:"Mauritania"},
  {code:"MU",name:"Mauritius"},{code:"YT",name:"Mayotte"},{code:"MX",name:"Mexico"},
  {code:"FM",name:"Micronesia"},{code:"MD",name:"Moldova"},{code:"MC",name:"Monaco"},
  {code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MS",name:"Montserrat"},
  {code:"MA",name:"Morocco"},{code:"MZ",name:"Mozambique"},{code:"MM",name:"Myanmar"},
  {code:"NA",name:"Namibia"},{code:"NR",name:"Nauru"},{code:"NP",name:"Nepal"},
  {code:"NL",name:"Netherlands"},{code:"NC",name:"New Caledonia"},{code:"NZ",name:"New Zealand"},
  {code:"NI",name:"Nicaragua"},{code:"NE",name:"Niger"},{code:"NG",name:"Nigeria"},
  {code:"NU",name:"Niue"},{code:"NF",name:"Norfolk Island"},{code:"MP",name:"Northern Mariana Islands"},
  {code:"NO",name:"Norway"},{code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},
  {code:"PW",name:"Palau"},{code:"PS",name:"Palestine"},{code:"PA",name:"Panama"},
  {code:"PG",name:"Papua New Guinea"},{code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},
  {code:"PH",name:"Philippines"},{code:"PN",name:"Pitcairn Islands"},{code:"PL",name:"Poland"},
  {code:"PT",name:"Portugal"},{code:"PR",name:"Puerto Rico"},{code:"QA",name:"Qatar"},
  {code:"RE",name:"RÃ©union"},{code:"RO",name:"Romania"},{code:"RU",name:"Russia"},
  {code:"RW",name:"Rwanda"},{code:"BL",name:"Saint BarthÃ©lemy"},
  {code:"SH",name:"Saint Helena"},{code:"KN",name:"Saint Kitts and Nevis"},
  {code:"LC",name:"Saint Lucia"},{code:"MF",name:"Saint Martin (French)"},
  {code:"PM",name:"Saint Pierre and Miquelon"},
  {code:"VC",name:"Saint Vincent and the Grenadines"},{code:"WS",name:"Samoa"},
  {code:"SM",name:"San Marino"},{code:"ST",name:"SÃ£o TomÃ© and PrÃ­ncipe"},
  {code:"SA",name:"Saudi Arabia"},{code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},
  {code:"SC",name:"Seychelles"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},
  {code:"SX",name:"Sint Maarten"},{code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},
  {code:"SB",name:"Solomon Islands"},{code:"SO",name:"Somalia"},{code:"ZA",name:"South Africa"},
  {code:"GS",name:"South Georgia and the South Sandwich Islands"},
  {code:"SS",name:"South Sudan"},{code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},
  {code:"SD",name:"Sudan"},{code:"SR",name:"Suriname"},{code:"SJ",name:"Svalbard and Jan Mayen"},
  {code:"SZ",name:"Eswatini"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},
  {code:"SY",name:"Syria"},{code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},
  {code:"TZ",name:"Tanzania"},{code:"TH",name:"Thailand"},{code:"TL",name:"Timor-Leste"},
  {code:"TG",name:"Togo"},{code:"TK",name:"Tokelau"},{code:"TO",name:"Tonga"},
  {code:"TT",name:"Trinidad and Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Turkey"},
  {code:"TM",name:"Turkmenistan"},{code:"TC",name:"Turks and Caicos Islands"},
  {code:"TV",name:"Tuvalu"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},
  {code:"AE",name:"United Arab Emirates"},{code:"GB",name:"United Kingdom"},
  {code:"US",name:"United States"},{code:"UM",name:"United States Minor Outlying Islands"},
  {code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},{code:"VU",name:"Vanuatu"},
  {code:"VA",name:"Vatican City"},{code:"VE",name:"Venezuela"},{code:"VN",name:"Vietnam"},
  {code:"VI",name:"United States Virgin Islands"},{code:"WF",name:"Wallis and Futuna"},
  {code:"EH",name:"Western Sahara"},{code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},
  {code:"ZW",name:"Zimbabwe"},{code:"AX",name:"Ã…land Islands"},{code:"AQ",name:"Antarctica"},
];

const LANGUAGES = [
  {code:"aa",name:"Afar"},{code:"ab",name:"Abkhazian"},{code:"af",name:"Afrikaans"},
  {code:"ak",name:"Akan"},{code:"am",name:"Amharic"},{code:"ar",name:"Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©"},
  {code:"as",name:"Assamese"},{code:"az",name:"AzÉ™rbaycan"},{code:"ba",name:"Bashkir"},
  {code:"be",name:"Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÐ°Ñ"},{code:"bg",name:"Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸"},{code:"bm",name:"Bambara"},
  {code:"bn",name:"à¦¬à¦¾à¦‚à¦²à¦¾"},{code:"bo",name:"à½–à½¼à½‘à¼‹à½¦à¾à½‘"},{code:"br",name:"Breton"},
  {code:"bs",name:"Bosanski"},{code:"ca",name:"CatalÃ "},{code:"ce",name:"Chechen"},
  {code:"cs",name:"ÄŒeÅ¡tina"},{code:"cy",name:"Cymraeg"},{code:"da",name:"Dansk"},
  {code:"de",name:"Deutsch"},{code:"dv",name:"Dhivehi"},{code:"dz",name:"Dzongkha"},
  {code:"ee",name:"Ewe"},{code:"el",name:"Î•Î»Î»Î·Î½Î¹ÎºÎ¬"},{code:"en",name:"English"},
  {code:"eo",name:"Esperanto"},{code:"es",name:"EspaÃ±ol"},{code:"et",name:"Eesti"},
  {code:"eu",name:"Euskara"},{code:"fa",name:"ÙØ§Ø±Ø³ÛŒ"},{code:"ff",name:"Fulah"},
  {code:"fi",name:"Suomi"},{code:"fo",name:"FÃ¸royskt"},{code:"fr",name:"FranÃ§ais"},
  {code:"fy",name:"Frysk"},{code:"ga",name:"Gaeilge"},{code:"gd",name:"GÃ idhlig"},
  {code:"gl",name:"Galego"},{code:"gn",name:"Guarani"},{code:"gu",name:"àª—à«àªœàª°àª¾àª¤à«€"},
  {code:"gv",name:"Gaelg"},{code:"ha",name:"Hausa"},{code:"he",name:"×¢×‘×¨×™×ª"},
  {code:"hi",name:"à¤¹à¤¿à¤¨à¥à¤¦à¥€"},{code:"hr",name:"Hrvatski"},{code:"hu",name:"Magyar"},
  {code:"hy",name:"Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶"},{code:"ia",name:"Interlingua"},{code:"id",name:"Bahasa Indonesia"},
  {code:"ig",name:"Igbo"},{code:"is",name:"Ãslenska"},{code:"it",name:"Italiano"},
  {code:"iu",name:"Inuktitut"},{code:"ja",name:"æ—¥æœ¬èªž"},{code:"jv",name:"Basa Jawa"},
  {code:"ka",name:"áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜"},{code:"kk",name:"ÒšÐ°Ð·Ð°Ò›"},{code:"kl",name:"Kalaallisut"},
  {code:"km",name:"ážáŸ’áž˜áŸ‚ážš"},{code:"kn",name:"à²•à²¨à³à²¨à²¡"},{code:"ko",name:"í•œêµ­ì–´"},
  {code:"ks",name:"à¤•à¤¶à¥à¤®à¥€à¤°à¥€"},{code:"ku",name:"KurdÃ®"},{code:"kw",name:"Kernewek"},
  {code:"ky",name:"ÐšÑ‹Ñ€Ð³Ñ‹Ð·Ñ‡Ð°"},{code:"la",name:"Latina"},{code:"lb",name:"LÃ«tzebuergesch"},
  {code:"lg",name:"Luganda"},{code:"ln",name:"Lingala"},{code:"lo",name:"àº¥àº²àº§"},
  {code:"lt",name:"LietuviÅ³"},{code:"lv",name:"LatvieÅ¡u"},{code:"mg",name:"Malagasy"},
  {code:"mi",name:"MÄori"},{code:"mk",name:"ÐœÐ°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸"},{code:"ml",name:"à´®à´²à´¯à´¾à´³à´‚"},
  {code:"mn",name:"ÐœÐ¾Ð½Ð³Ð¾Ð»"},{code:"mr",name:"à¤®à¤°à¤¾à¤ à¥€"},{code:"ms",name:"Bahasa Melayu"},
  {code:"mt",name:"Malti"},{code:"my",name:"á€—á€™á€¬"},{code:"ne",name:"à¤¨à¥‡à¤ªà¤¾à¤²à¥€"},
  {code:"nl",name:"Nederlands"},{code:"nn",name:"Nynorsk"},{code:"no",name:"Norsk"},
  {code:"nr",name:"isiNdebele"},{code:"ny",name:"Chichewa"},{code:"oc",name:"Occitan"},
  {code:"om",name:"Oromoo"},{code:"or",name:"à¬“à¬¡à¬¼à¬¿à¬†"},{code:"os",name:"Ð˜Ñ€Ð¾Ð½"},
  {code:"pa",name:"à¨ªà©°à¨œà¨¾à¨¬à©€"},{code:"pl",name:"Polski"},{code:"ps",name:"Ù¾ÚšØªÙˆ"},
  {code:"pt",name:"PortuguÃªs"},{code:"qu",name:"Runa Simi"},{code:"rm",name:"Rumantsch"},
  {code:"rn",name:"Kirundi"},{code:"ro",name:"RomÃ¢nÄƒ"},{code:"ru",name:"Ð ÑƒÑÑÐºÐ¸Ð¹"},
  {code:"rw",name:"Kinyarwanda"},{code:"sa",name:"à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤"},{code:"sc",name:"Sardu"},
  {code:"sd",name:"Ø³Ù†ÚŒÙŠ"},{code:"se",name:"SÃ¡megiella"},{code:"sg",name:"SÃ¤ngÃ¶"},
  {code:"si",name:"à·ƒà·’à¶‚à·„à¶½"},{code:"sk",name:"SlovenÄina"},{code:"sl",name:"SlovenÅ¡Äina"},
  {code:"sn",name:"chiShona"},{code:"so",name:"Soomaali"},{code:"sq",name:"Shqip"},
  {code:"sr",name:"Ð¡Ñ€Ð¿ÑÐºÐ¸"},{code:"ss",name:"SiSwati"},{code:"st",name:"Sesotho"},
  {code:"su",name:"Basa Sunda"},{code:"sv",name:"Svenska"},{code:"sw",name:"Kiswahili"},
  {code:"ta",name:"à®¤à®®à®¿à®´à¯"},{code:"te",name:"à°¤à±†à°²à±à°—à±"},{code:"tg",name:"Ð¢Ð¾Ò·Ð¸ÐºÓ£"},
  {code:"th",name:"à¹„à¸—à¸¢"},{code:"ti",name:"á‰µáŒáˆ­áŠ›"},{code:"tk",name:"TÃ¼rkmen"},
  {code:"tl",name:"Filipino"},{code:"tn",name:"Setswana"},{code:"to",name:"Lea Faka-Tonga"},
  {code:"tr",name:"TÃ¼rkÃ§e"},{code:"ts",name:"Xitsonga"},{code:"tt",name:"Ð¢Ð°Ñ‚Ð°Ñ€"},
  {code:"ty",name:"Reo Tahiti"},{code:"ug",name:"Ø¦Û‡ÙŠØºÛ‡Ø±Ú†Û•"},{code:"uk",name:"Ð£ÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ°"},
  {code:"ur",name:"Ø§Ø±Ø¯Ùˆ"},{code:"uz",name:"OÊ»zbek"},{code:"ve",name:"Tshivená¸“a"},
  {code:"vi",name:"Tiáº¿ng Viá»‡t"},{code:"wa",name:"Walon"},{code:"wo",name:"Wolof"},
  {code:"xh",name:"isiXhosa"},{code:"yi",name:"×™×™Ö´×“×™×©"},{code:"yo",name:"YorÃ¹bÃ¡"},
  {code:"zh",name:"ä¸­æ–‡"},{code:"zu",name:"isiZulu"},
];

// ---- DATA: Categories ----
// The customer marketplace sells HOUSES ONLY, so the bar is built from the
// property chips (All Houses, For Sale, For Rent, Villas, Apartments, …).
// Vehicles and products are no longer offered; their data stays untouched.
const CATEGORIES = [
  {name:"All Houses",icon:"home",color:"blue"},
  {name:"For Sale",icon:"tag",color:"emerald"},
  {name:"For Rent",icon:"key",color:"amber"},
  {name:"Villas",icon:"castle",color:"violet"},
  {name:"Apartments",icon:"building-2",color:"sky"},
  {name:"Mansions",icon:"landmark",color:"indigo"},
  {name:"Beach Houses",icon:"waves",color:"cyan"},
  {name:"Luxury Homes",icon:"gem",color:"rose"},
  {name:"Commercial Property",icon:"store",color:"slate"},
  {name:"Land",icon:"map-pin",color:"lime"},
];

// Tailwind color class maps for category accents (text + bg + border + glow)
const CAT_COLORS = {
  blue:{text:"text-blue-600",bg:"from-blue-100",to:"to-blue-50",border:"border-blue-200",glow:"0 0 18px rgba(59,130,246,0.2)",hoverBorder:"hover:border-blue-400"},
  pink:{text:"text-pink-600",bg:"from-pink-100",to:"to-pink-50",border:"border-pink-200",glow:"0 0 18px rgba(236,72,153,0.2)",hoverBorder:"hover:border-pink-400"},
  amber:{text:"text-amber-600",bg:"from-amber-100",to:"to-amber-50",border:"border-amber-200",glow:"0 0 18px rgba(245,158,11,0.2)",hoverBorder:"hover:border-amber-400"},
  emerald:{text:"text-emerald-600",bg:"from-emerald-100",to:"to-emerald-50",border:"border-emerald-200",glow:"0 0 18px rgba(16,185,129,0.2)",hoverBorder:"hover:border-emerald-400"},
  lime:{text:"text-lime-600",bg:"from-lime-100",to:"to-lime-50",border:"border-lime-200",glow:"0 0 18px rgba(132,204,22,0.2)",hoverBorder:"hover:border-lime-400"},
  cyan:{text:"text-cyan-600",bg:"from-cyan-100",to:"to-cyan-50",border:"border-cyan-200",glow:"0 0 18px rgba(34,211,238,0.2)",hoverBorder:"hover:border-cyan-400"},
  sky:{text:"text-sky-600",bg:"from-sky-100",to:"to-sky-50",border:"border-sky-200",glow:"0 0 18px rgba(14,165,233,0.2)",hoverBorder:"hover:border-sky-400"},
  red:{text:"text-red-600",bg:"from-red-100",to:"to-red-50",border:"border-red-200",glow:"0 0 18px rgba(239,68,68,0.2)",hoverBorder:"hover:border-red-400"},
  violet:{text:"text-violet-600",bg:"from-violet-100",to:"to-violet-50",border:"border-violet-200",glow:"0 0 18px rgba(139,92,246,0.2)",hoverBorder:"hover:border-violet-400"},
  indigo:{text:"text-indigo-600",bg:"from-indigo-100",to:"to-indigo-50",border:"border-indigo-200",glow:"0 0 18px rgba(99,102,241,0.2)",hoverBorder:"hover:border-indigo-400"},
  teal:{text:"text-teal-600",bg:"from-teal-100",to:"to-teal-50",border:"border-teal-200",glow:"0 0 18px rgba(20,184,166,0.2)",hoverBorder:"hover:border-teal-400"},
  rose:{text:"text-rose-600",bg:"from-rose-100",to:"to-rose-50",border:"border-rose-200",glow:"0 0 18px rgba(244,63,94,0.2)",hoverBorder:"hover:border-rose-400"},
  fuchsia:{text:"text-fuchsia-600",bg:"from-fuchsia-100",to:"to-fuchsia-50",border:"border-fuchsia-200",glow:"0 0 18px rgba(217,70,239,0.2)",hoverBorder:"hover:border-fuchsia-400"},
  slate:{text:"text-slate-600",bg:"from-slate-200",to:"to-slate-100",border:"border-slate-300",glow:"0 0 18px rgba(148,163,184,0.2)",hoverBorder:"hover:border-slate-400"},
  green:{text:"text-green-600",bg:"from-green-100",to:"to-green-50",border:"border-green-200",glow:"0 0 18px rgba(34,197,94,0.2)",hoverBorder:"hover:border-green-400"},
  yellow:{text:"text-yellow-600",bg:"from-yellow-100",to:"to-yellow-50",border:"border-yellow-200",glow:"0 0 18px rgba(234,179,8,0.2)",hoverBorder:"hover:border-yellow-400"},
  brown:{text:"text-amber-700",bg:"from-amber-100",to:"to-amber-50",border:"border-amber-300",glow:"0 0 18px rgba(180,83,9,0.2)",hoverBorder:"hover:border-amber-400"},
  purple:{text:"text-purple-600",bg:"from-purple-100",to:"to-purple-50",border:"border-purple-200",glow:"0 0 18px rgba(168,85,247,0.2)",hoverBorder:"hover:border-purple-400"},
  gray:{text:"text-gray-600",bg:"from-gray-100",to:"to-gray-50",border:"border-gray-300",glow:"0 0 18px rgba(156,163,175,0.2)",hoverBorder:"hover:border-gray-400"},
};

// ---- DATA: Search Suggestions ----
const SEARCH_SUGGESTIONS = [
  "Luxury Houses","Family Houses","Beach Houses","Smart Homes","Villas","Mansions",
  "Apartments","Luxury Apartments","Townhouses","Condos","Lofts","Penthouses",
  "Farm Houses","Cottages","Waterfront Homes","Land for Sale","Plots","Acreage",
  "Commercial Buildings","Office Buildings","Retail Spaces","Hotels","Resorts",
  "Houses for Rent","Apartments for Rent","Houses for Sale","New Build Homes","Modern Homes",
];

// ---- DATA: Holiday Engine ----
const HOLIDAYS = {
  US:[{date:"01-01",name:"New Year's Day"},{date:"07-04",name:"Independence Day"},{date:"11-11",name:"Veterans Day"},{date:"11-28",name:"Thanksgiving Day"},{date:"12-25",name:"Christmas Day"}],
  GB:[{date:"01-01",name:"New Year's Day"},{date:"12-26",name:"Boxing Day"},{date:"11-05",name:"Guy Fawkes Night"},{date:"12-25",name:"Christmas Day"}],
  JP:[{date:"01-01",name:"New Year (Shogatsu)"},{date:"04-29",name:"Golden Week Begins"},{date:"05-03",name:"Constitution Day"},{date:"05-04",name:"Greenery Day"},{date:"05-05",name:"Children's Day"},{date:"11-03",name:"Culture Day"},{date:"12-23",name:"Emperor's Birthday"}],
  DE:[{date:"01-01",name:"Neujahr"},{date:"10-03",name:"Tag der Deutschen Einheit"},{date:"12-25",name:"Erster Weihnachtstag"},{date:"12-26",name:"Zweiter Weihnachtstag"}],
  FR:[{date:"01-01",name:"Jour de l'An"},{date:"07-14",name:"FÃªte Nationale"},{date:"11-11",name:"Armistice Day"},{date:"12-25",name:"NoÃ«l"}],
  CN:[{date:"01-01",name:"New Year's Day"},{date:"02-10",name:"Spring Festival"},{date:"10-01",name:"National Day"},{date:"12-25",name:"Christmas"}],
  IN:[{date:"01-01",name:"New Year's Day"},{date:"01-26",name:"Republic Day"},{date:"08-15",name:"Independence Day"},{date:"10-02",name:"Gandhi Jayanti"},{date:"11-01",name:"Diwali"}],
  BR:[{date:"01-01",name:"Ano Novo"},{date:"09-07",name:"IndependÃªncia"},{date:"12-25",name:"Natal"}],
  AE:[{date:"01-01",name:"New Year's Day"},{date:"12-02",name:"National Day"},{date:"12-03",name:"National Day Holiday"}],
  CA:[{date:"01-01",name:"New Year's Day"},{date:"07-01",name:"Canada Day"},{date:"11-11",name:"Remembrance Day"},{date:"12-25",name:"Christmas Day"},{date:"12-26",name:"Boxing Day"}],
  AU:[{date:"01-01",name:"New Year's Day"},{date:"01-26",name:"Australia Day"},{date:"12-25",name:"Christmas Day"},{date:"12-26",name:"Boxing Day"}],
  NG:[{date:"01-01",name:"New Year's Day"},{date:"10-01",name:"Independence Day"},{date:"12-25",name:"Christmas Day"}],
  ZA:[{date:"01-01",name:"New Year's Day"},{date:"04-27",name:"Freedom Day"},{date:"12-16",name:"Day of Reconciliation"},{date:"12-25",name:"Christmas Day"}],
  MX:[{date:"01-01",name:"AÃ±o Nuevo"},{date:"09-16",name:"DÃ­a de la Independencia"},{date:"11-02",name:"DÃ­a de los Muertos"},{date:"12-25",name:"Navidad"}],
  IT:[{date:"01-01",name:"Capodanno"},{date:"06-02",name:"Festa della Repubblica"},{date:"12-25",name:"Natale"}],
  ES:[{date:"01-01",name:"AÃ±o Nuevo"},{date:"10-12",name:"Fiesta Nacional"},{date:"12-25",name:"Navidad"}],
  SA:[{date:"02-22",name:"Founding Day"},{date:"09-23",name:"Saudi National Day"}],
  KR:[{date:"01-01",name:"New Year's Day"},{date:"03-01",name:"Samiljeol"},{date:"08-15",name:"Gwangbokjeol"},{date:"10-03",name:"Gaecheonjeol"}],
  EG:[{date:"01-01",name:"New Year's Day"},{date:"07-23",name:"Revolution Day"},{date:"10-06",name:"Armed Forces Day"}],
  RU:[{date:"01-01",name:"New Year's Day"},{date:"06-12",name:"Day of Russia"},{date:"11-04",name:"Unity Day"}],
};

// ---- DATA: Ad Copy Dictionary ----
const AD_COPY = {
  en:{shopNow:"Shop Collection",explore:"Explore Category",learnMore:"Learn More",worldwide:"Worldwide Shipping",worldwideSub:"200+ countries served",delivery:"Fast Delivery",deliverySub:"Express options available",secure:"Secure Shopping",secureSub:"SSL encrypted checkout",support:"24/7 Customer Support",supportSub:"Always here for you"},
  es:{shopNow:"Comprar ColecciÃ³n",explore:"Explorar CategorÃ­a",learnMore:"MÃ¡s InformaciÃ³n",worldwide:"EnvÃ­o Mundial",worldwideSub:"200+ paÃ­ses atendidos",delivery:"Entrega RÃ¡pida",deliverySub:"Opciones exprÃ©s disponibles",secure:"Compra Segura",secureSub:"Pago cifrado SSL",support:"Soporte 24/7",supportSub:"Siempre aquÃ­ para ti"},
  fr:{shopNow:"Acheter Collection",explore:"Explorer CatÃ©gorie",learnMore:"En Savoir Plus",worldwide:"Livraison Mondiale",worldwideSub:"200+ pays desservis",delivery:"Livraison Rapide",deliverySub:"Options express disponibles",secure:"Achat SÃ©curisÃ©",secureSub:"Paiement chiffrÃ© SSL",support:"Support 24/7",supportSub:"Toujours lÃ  pour vous"},
  de:{shopNow:"Kollektion Kaufen",explore:"Kategorie Entdecken",learnMore:"Mehr Erfahren",worldwide:"Weltweiter Versand",worldwideSub:"200+ LÃ¤nder bedient",delivery:"Schnelle Lieferung",deliverySub:"Express-Optionen verfÃ¼gbar",secure:"Sicheres Einkaufen",secureSub:"SSL-verschlÃ¼sselte Kasse",support:"24/7 Kundenservice",supportSub:"Immer fÃ¼r Sie da"},
  ja:{shopNow:"ã‚³ãƒ¬ã‚¯ã‚·ãƒ§ãƒ³ã‚’è¦‹ã‚‹",explore:"ã‚«ãƒ†ã‚´ãƒªãƒ¼ã‚’æŽ¢ã‚‹",learnMore:"è©³ç´°ã‚’è¦‹ã‚‹",worldwide:"ä¸–ç•Œä¸­ã®é…é€",worldwideSub:"200ã‚«å›½ä»¥ä¸Šã«å¯¾å¿œ",delivery:"é«˜é€Ÿé…é€",deliverySub:"ã‚¨ã‚¯ã‚¹ãƒ—ãƒ¬ã‚¹ã‚ªãƒ—ã‚·ãƒ§ãƒ³",secure:"å®‰å…¨ãªã‚·ãƒ§ãƒƒãƒ”ãƒ³ã‚°",secureSub:"SSLæš—å·åŒ–æ±ºæ¸ˆ",support:"24æ™‚é–“ã‚µãƒãƒ¼ãƒˆ",supportSub:"ã„ã¤ã‚‚ãã°ã«"},
  ar:{shopNow:"ØªØ³ÙˆÙ‚ Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø©",explore:"Ø§Ø³ØªÙƒØ´Ù Ø§Ù„ÙØ¦Ø©",learnMore:"Ø§Ø¹Ø±Ù Ø§Ù„Ù…Ø²ÙŠØ¯",worldwide:"Ø´Ø­Ù† Ø¹Ø§Ù„Ù…ÙŠ",worldwideSub:"Ø£ÙƒØ«Ø± Ù…Ù† 200 Ø¯ÙˆÙ„Ø©",delivery:"ØªÙˆØµÙŠÙ„ Ø³Ø±ÙŠØ¹",deliverySub:"Ø®ÙŠØ§Ø±Ø§Øª Ø³Ø±ÙŠØ¹Ø©",secure:"ØªØ³ÙˆÙ‚ Ø¢Ù…Ù†",secureSub:"Ø¯ÙØ¹ Ù…Ø´ÙØ± SSL",support:"Ø¯Ø¹Ù… 24/7",supportSub:"Ù†Ø­Ù† Ù‡Ù†Ø§ Ø¯Ø§Ø¦Ù…Ø§Ù‹"},
  zh:{shopNow:"é€‰è´­ç³»åˆ—",explore:"æŽ¢ç´¢ç±»åˆ«",learnMore:"äº†è§£æ›´å¤š",worldwide:"å…¨çƒé…é€",worldwideSub:"æœåŠ¡200+å›½å®¶",delivery:"å¿«é€Ÿé…é€",deliverySub:"æä¾›åŠ æ€¥é€‰é¡¹",secure:"å®‰å…¨è´­ç‰©",secureSub:"SSLåŠ å¯†ç»“ç®—",support:"24/7å®¢æœ",supportSub:"éšæ—¶ä¸ºæ‚¨æœåŠ¡"},
  pt:{shopNow:"Comprar ColeÃ§Ã£o",explore:"Explorar Categoria",learnMore:"Saber Mais",worldwide:"Envio Mundial",worldwideSub:"200+ paÃ­ses atendidos",delivery:"Entrega RÃ¡pida",deliverySub:"OpÃ§Ãµes express disponÃ­veis",secure:"Compra Segura",secureSub:"Pagamento criptografado SSL",support:"Suporte 24/7",supportSub:"Sempre aqui para vocÃª"},
  ru:{shopNow:"ÐšÑƒÐ¿Ð¸Ñ‚ÑŒ ÐšÐ¾Ð»Ð»ÐµÐºÑ†Ð¸ÑŽ",explore:"Ð˜ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ñ‚ÑŒ ÐšÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸ÑŽ",learnMore:"Ð£Ð·Ð½Ð°Ñ‚ÑŒ Ð‘Ð¾Ð»ÑŒÑˆÐµ",worldwide:"Ð”Ð¾ÑÑ‚Ð°Ð²ÐºÐ° Ð¿Ð¾ Ð²ÑÐµÐ¼Ñƒ Ð¼Ð¸Ñ€Ñƒ",worldwideSub:"200+ ÑÑ‚Ñ€Ð°Ð½",delivery:"Ð‘Ñ‹ÑÑ‚Ñ€Ð°Ñ Ð´Ð¾ÑÑ‚Ð°Ð²ÐºÐ°",deliverySub:"Ð­ÐºÑÐ¿Ñ€ÐµÑÑ-Ð¾Ð¿Ñ†Ð¸Ð¸",secure:"Ð‘ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ñ‹Ðµ Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ¸",secureSub:"SSL-ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ",support:"ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ° 24/7",supportSub:"Ð’ÑÐµÐ³Ð´Ð° Ð´Ð»Ñ Ð²Ð°Ñ"},
  hi:{shopNow:"à¤¸à¤‚à¤—à¥à¤°à¤¹ à¤–à¤°à¥€à¤¦à¥‡à¤‚",explore:"à¤¶à¥à¤°à¥‡à¤£à¥€ à¤¦à¥‡à¤–à¥‡à¤‚",learnMore:"à¤”à¤° à¤œà¤¾à¤¨à¥‡à¤‚",worldwide:"à¤µà¤¿à¤¶à¥à¤µà¤µà¥à¤¯à¤¾à¤ªà¥€ à¤¶à¤¿à¤ªà¤¿à¤‚à¤—",worldwideSub:"200+ à¤¦à¥‡à¤¶à¥‹à¤‚ à¤®à¥‡à¤‚ à¤¸à¥‡à¤µà¤¾",delivery:"à¤¤à¥‡à¤œ à¤¡à¤¿à¤²à¥€à¤µà¤°à¥€",deliverySub:"à¤à¤•à¥à¤¸à¤ªà¥à¤°à¥‡à¤¸ à¤µà¤¿à¤•à¤²à¥à¤ª",secure:"à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤–à¤°à¥€à¤¦",secureSub:"SSL à¤à¤¨à¥à¤•à¥à¤°à¤¿à¤ªà¥à¤Ÿà¥‡à¤¡ à¤šà¥‡à¤•à¤†à¤‰à¤Ÿ",support:"24/7 à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾",supportSub:"à¤¹à¤®à¥‡à¤¶à¤¾ à¤†à¤ªà¤•à¥‡ à¤²à¤¿à¤"},
};

// ---- DATA: Carousel slides ----
// The hero now shows ONLY the owner's own media: the promo banner they
// upload in Content Settings (image or video) plus any image/video they
// create through the Advertisements manager. All built-in stock videos and
// old showroom images have been removed.
const CAROUSEL_SLIDES = [];

// Clean brand fallback shown only when no promo banner or ad is uploaded.
const BRAND_FALLBACK_SLIDE = {
  brandOnly: true,
  badge: "Weverse Online Shop",
  titles: { en: "Weverse Online Shop" },
  descs: { en: "Premium houses, available worldwide." },
};


// The single word shown over each hero slide. The marketplace sells houses
// only, so every slide is labeled with the Home category name.
function carouselCategoryName(slide) {
  return 'Home';
}

// ---- STATE ----
let currentSlide = 0, carouselTimer = null, currentLang = "en", currentCountry = "US";
let voiceRecognition = null, isListening = false;
let adminAdSlides = [];
let promoBannerSlide = null;
let heroVideoSlides = [];
let activeCarouselSlides = CAROUSEL_SLIDES;

// Continuous rotation: remember the showcase position so the carousel
// never restarts from the first slide on reload.
const SHOWCASE_POSITION_KEY = 'kco_showcase_position_v1';
function saveShowcasePosition() {
  try { localStorage.setItem(SHOWCASE_POSITION_KEY, String(currentSlide)); } catch (e) {}
}
function restoreShowcasePosition(total) {
  if (!total) return 0;
  try {
    const saved = parseInt(localStorage.getItem(SHOWCASE_POSITION_KEY), 10);
    if (!isNaN(saved) && saved >= 0) return saved % total;
  } catch (e) {}
  return 0;
}

function cleanAdLabel(s){
  if(!s)return s;
  return String(s)
    .replace(/AI Advertisement/gi,'Featured')
    .replace(/AI Marketing Studio Campaign/gi,'Featured Campaign')
    .replace(/AI[- ]powered/gi,'')
    .replace(/AI Assistant/gi,'')
    .replace(/\bAI\b/gi,'')
    .replace(/\s{2,}/g,' ')
    .replace(/^\s+|\s+$/g,'');
}

function dedupSlides(arr, seen) {
  return arr.filter(s => {
    const key = s.adId || s.video || s.image || (s.images && s.images[0]) || s.listingId;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Build the showcase: admin advertisements (by sort order) first, then
// live marketplace listings, then the default brand collection as fallback.
// The marketplace sells houses only, so only Home slides ever show — vehicles
// and products are never promoted on the hero.
function isAllowedHeroSlide(s) {
  const text = [s.badge, s.titles && s.titles.en, s.descs && s.descs.en, s.category].filter(Boolean).join(' ').toLowerCase();
  return /\b(house|houses|homes|apartment|apartments|villa|villas|condo|condominium|townhouse|townhouses|bungalow|mansion|mansions|penthouse|duplex|resort|resorts|hotels?|estates?|property|real estate|commercial buildings?|office buildings?|shopping malls?|vacation home|waterfront home|farm house|land for sale)\b/.test(text);
}
function mergeAdSlides(){
  const seen = new Set();
  // Owner hero slides (rotating promo videos) come first.
  const hero = dedupSlides([...heroVideoSlides], seen);
  const banner = promoBannerSlide ? [promoBannerSlide] : [];
  const ads = (window._ads || adminAdSlides).filter(Boolean).filter(isAllowedHeroSlide);
  const priority = dedupSlides(ads, seen);
  const rest = dedupSlides(CAROUSEL_SLIDES, seen);
  activeCarouselSlides = [...hero, ...banner, ...priority, ...rest];
}

window.addEventListener('hero-videos-updated', (e) => {
  const detail = e.detail || {};
  heroVideoSlides = Array.isArray(detail.slides) ? detail.slides : (Array.isArray(detail) ? detail : []);
  mergeAdSlides();
  renderCarousel();
  var hc=document.getElementById('hero-carousel');if(hc){hc.style.opacity='1';}
});

window.addEventListener('promo-banner-updated', (e) => {
  promoBannerSlide = e.detail || null;
  mergeAdSlides();
  renderCarousel();
});

// ---- INIT: Populate Selectors ----
function populateSelectors(){
  const cs=document.getElementById("country"),ls=document.getElementById("language");
  COUNTRIES.forEach(c=>{const o=document.createElement("option");o.value=c.code;o.textContent=c.name;cs.appendChild(o)});
  LANGUAGES.forEach(l=>{const o=document.createElement("option");o.value=l.code;o.textContent=l.name;ls.appendChild(o)});
}

// ---- INIT: Render Categories (data-driven mega-menu departments) ----
// The customer marketplace sells houses only, so there is a single Real
// Estate department holding every property chip.
const STATIC_DEPARTMENTS = [
  { id:'realestate', label:'Real Estate', icon:'building-2', color:'blue', cats:['All Houses','For Sale','For Rent','Villas','Apartments','Mansions','Beach Houses','Luxury Homes','Commercial Property','Land'] },
];

let _activeCategory="All";
let _panelDept=null;
let _allPanel=false;
let _deptLabels={};

// Exact marketplace category order shown in the customer category bar.
// The authoritative list lives in src/categories.js (window.MARKETPLACE_CATEGORIES
// on the homepage); this fallback guarantees the bar renders correctly even
// before the ES modules have executed. Houses only.
const CATEGORY_BAR_FALLBACK=[
  'All Houses','For Sale','For Rent','Villas','Apartments','Mansions',
  'Beach Houses','Luxury Homes','Commercial Property','Land',
];

function getBarCategories(){
  const list=window.MARKETPLACE_CATEGORIES;
  if(list&&Array.isArray(list)&&list.length)return list;
  return CATEGORY_BAR_FALLBACK.map(name=>({name,icon:"shopping-bag",color:"blue"}));
}

async function getCategoryInventory(){
  if(window._getShowroomCategoryInventory){
    try{ const inv=await window._getShowroomCategoryInventory(); if(inv&&inv.length)return inv; }catch(e){}
  }
  return STATIC_DEPARTMENTS.map(d=>({id:d.id,label:d.label,icon:d.icon,color:d.color,categories:d.cats.map(c=>{const base=CATEGORIES.find(x=>x.name===c);return{name:c,count:0,subs:[],icon:base?base.icon:d.icon,color:base?base.color:d.color};})}));
}

let _catRenderToken=0;

function renderCategories(){
  const c=document.getElementById("category-list");
  if(!c)return;
  const token=++_catRenderToken;
  const prevScroll=c.scrollLeft;
  if(!window.MARKETPLACE_CATEGORIES){
    window.addEventListener("marketplace-categories-ready",function once(){
      window.removeEventListener("marketplace-categories-ready",once);
      renderCategories();
    },{once:true});
  }
  c.innerHTML="";
  _deptLabels={};
  const all=document.createElement("button");
  all.dataset.dept="all";
  all.className="nav-cat-chip active";
  all.innerHTML='<i data-lucide="layout-grid" class="w-3.5 h-3.5"></i><span class="whitespace-nowrap">All</span>';
  all.addEventListener("click",()=>{filterByCategory("All",all);});
  c.appendChild(all);

  // Only categories that actually have products appear in the bar. The old
  // hardcoded marketplace list (Women, Men, Kids, Home, Trucks, …) had no
  // items behind it, so every chip is now driven by the live showroom
  // inventory. Empty categories never show — the bar only ever lists what the
  // owner really sells.
  getCategoryInventory().then(inv=>{
    if(token!==_catRenderToken)return;
    const seen=new Set();
    const chips=[];
    (inv||[]).forEach(d=>(d.categories||[]).forEach(entry=>{
      const n=String(entry.name||"").trim();
      if(!n||(entry.count||0)<=0||seen.has(n.toLowerCase()))return;
      seen.add(n.toLowerCase());
      const meta=(CATEGORIES.find(x=>x.name.toLowerCase()===n.toLowerCase()))||{name:n,icon:"shopping-bag",color:"blue"};
      chips.push({name:n,icon:meta.icon||"shopping-bag",color:meta.color||"blue"});
    }));
    chips.forEach(cat=>{
      _deptLabels[cat.name]=cat.name;
      const chip=document.createElement("button");
      chip.dataset.dept=cat.name;
      chip.className="nav-cat-chip";
      chip.innerHTML='<i data-lucide="'+(cat.icon||"shopping-bag")+'" class="w-3.5 h-3.5"></i><span class="whitespace-nowrap">'+cat.name+'</span>';
      chip.addEventListener("click",()=>{filterByCategory(cat.name,chip);});
      c.appendChild(chip);
    });
    if(chips.length>6){c.appendChild(makeMoreChip({icon:"grid"}));}
    if(window.lucide)lucide.createIcons();
    setNavActive(_activeCategory==="All"?"all":_activeCategory);
  }).catch(()=>{});
  setupCategoryRowScroll(c);
  c.scrollLeft=prevScroll;
  if(_activeCategory)setNavActive(_activeCategory==="All"?"all":_activeCategory);
}

function makeMoreChip(d){
  const chip=document.createElement("button");
  chip.dataset.dept="more";
  chip.className="nav-cat-chip";
  chip.innerHTML='<i data-lucide="'+(d.icon||"grid")+'" class="w-3.5 h-3.5"></i><span class="whitespace-nowrap">More</span><i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>';
  chip.addEventListener("click",()=>{toggleAllPanel(chip);});
  return chip;
}

function setupCategoryRowScroll(row){
  if(row._catScrollReady)return;
  row._catScrollReady=true;
  let isDown=false,startX=0,scrollLeft=0;
  row.addEventListener("pointerdown",(e)=>{
    if(e.pointerType!=="mouse")return;
    isDown=true;startX=e.clientX;scrollLeft=row.scrollLeft;row._dragMoved=0;
  });
  window.addEventListener("pointermove",(e)=>{
    if(!isDown||e.pointerType!=="mouse")return;
    const dx=e.clientX-startX;
    row._dragMoved=Math.max(row._dragMoved||0,Math.abs(dx));
    row.scrollLeft=scrollLeft-dx;
  });
  const endDrag=()=>{isDown=false;};
  window.addEventListener("pointerup",endDrag);
  window.addEventListener("pointercancel",endDrag);
  row.addEventListener("pointerleave",endDrag);
  row.addEventListener("click",(e)=>{
    if(row._dragMoved&&row._dragMoved>8){e.preventDefault();e.stopPropagation();row._dragMoved=0;}
  },true);
  row.addEventListener("wheel",(e)=>{
    if(row.scrollWidth<=row.clientWidth)return;
    const dy=Math.abs(e.deltaY),dx=Math.abs(e.deltaX);
    if(dy>dx)return;
    e.preventDefault();
    row.scrollLeft+=e.deltaX;
  },{passive:false});
}

function setNavActive(deptId){
  document.querySelectorAll("#category-list button").forEach(b=>{
    const on=b.dataset.dept===deptId;
    b.classList.toggle("active",on);
    b.classList.toggle("border-blue-500/40",on);
    b.classList.toggle("bg-blue-500/10",on);
    b.classList.toggle("text-blue-600",on);
  });
}

function fmtCount(n){ if(n>=1000000)return (n/1000000).toFixed(1).replace(/\.0$/,'')+'M+'; if(n>=1000)return Math.round(n/1000)+'K+'; return n||0; }

function openDeptPanel(dept,btn){
  _panelDept=dept;
  const panel=document.getElementById("category-panel");
  if(!panel)return;
  const sorted=[...(dept.categories||[])].sort((a,b)=>b.count-a.count);
  const catCards=sorted.slice(0,16).map(c=>{
    const meta=(CATEGORIES.find(x=>x.name.toLowerCase()===String(c.name).toLowerCase()))||{icon:dept.icon,color:dept.color};
    const icon=meta.icon||dept.icon; const color=meta.color||dept.color;
    const col=CAT_COLORS[color]||CAT_COLORS.blue;
    return '<button data-category="'+c.name+'" class="dept-cat flex flex-col items-start gap-2 p-3 rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/60 shadow-sm text-left transition group">'
      +'<div class="flex items-center gap-2.5 w-full">'
        +'<span class="w-8 h-8 rounded-lg bg-gradient-to-br '+col.bg+' '+col.to+' border '+col.border+' flex items-center justify-center shrink-0"><i data-lucide="'+icon+'" class="w-4 h-4 '+col.text+'"></i></span>'
        +'<span class="flex-1 min-w-0"><span class="block text-[13px] font-bold text-gray-900 truncate">'+c.name+'</span>'
        +(c.count>0?'<span class="text-[10px] text-gray-500">'+fmtCount(c.count)+' items</span>':'<span class="text-[10px] text-gray-600">Explore</span>')
        +'</span>'
        +'<i data-lucide="arrow-right" class="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition"></i>'
      +'</div>'
      +(c.subs&&c.subs.length?'<span class="text-[10px] text-gray-500 truncate w-full">'+c.subs.slice(0,3).join(' Â· ')+'</span>':'')
    +'</button>';
  }).join('');
  panel.innerHTML='<div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-4">'
    +'<div class="flex items-center justify-between mb-3">'
      +'<div class="flex items-center gap-2.5">'
        +'<span class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 flex items-center justify-center"><i data-lucide="'+dept.icon+'" class="w-4 h-4 text-blue-600"></i></span>'
        +'<div><h3 class="text-sm font-black text-gray-900 tracking-wide">'+dept.label+'</h3><p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Shop the department</p></div>'
      +'</div>'
      +'<button data-dept-view="'+dept.id+'" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">View all <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></button>'
    +'</div>'
    +'<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">'+catCards+'</div>'
  +'</div>';
  panel.classList.remove("hidden");void panel.offsetWidth;panel.classList.add("panel-in");
  panel.querySelectorAll('[data-category]').forEach(el=>{ el.onclick=()=>{filterByCategory(el.dataset.category,el);closeCategoryPanel();}; });
  const viewAll=panel.querySelector('[data-dept-view]');
  if(viewAll)viewAll.onclick=()=>{filterByDepartment(dept.id);closeCategoryPanel();};
  if(window.lucide)lucide.createIcons();
  setNavActive(dept.id);
}
function toggleDeptPanel(dept,btn){
  const panel=document.getElementById("category-panel");
  if(panel&&!panel.classList.contains("hidden")&&_panelDept&&_panelDept.id===dept.id){closeCategoryPanel();}
  else openDeptPanel(dept,btn);
}
function closeCategoryPanel(){
  const panel=document.getElementById("category-panel");
  if(panel){panel.classList.add("hidden");panel.classList.remove("panel-in");}
  const backTop=document.getElementById("category-back-top");
  if(backTop)backTop.classList.remove("flex");
  setNavActive(null);
  _panelDept=null;_allPanel=false;
}
function getAllCategoryEntries(){
  return getCategoryInventory().then(inv=>{
    const map=new Map();
    inv.forEach(d=>(d.categories||[]).forEach(c=>{
      const key=String(c.name).toLowerCase();
      if(!map.has(key))map.set(key,{name:c.name,count:0,subs:[]});
      const e=map.get(key);
      e.count+=c.count||0;
      (c.subs||[]).forEach(s=>{ if(!e.subs.includes(s))e.subs.push(s); });
    }));
    return [...map.values()].sort((a,b)=>b.count-a.count);
  });
}
function openAllPanel(btn){
  _allPanel=true;_panelDept=null;
  const panel=document.getElementById("category-panel");
  const scroller=document.getElementById("category-panel-scroll");
  if(!panel||!scroller)return;
  getAllCategoryEntries().then(sorted=>{
  const catCards=sorted.slice(0,40).map(c=>{
    const meta=(CATEGORIES.find(x=>x.name.toLowerCase()===String(c.name).toLowerCase()))||{icon:"shopping-bag",color:"blue"};
    const icon=meta.icon||"shopping-bag"; const color=meta.color||"blue";
    const col=CAT_COLORS[color]||CAT_COLORS.blue;
    return '<button data-category="'+c.name+'" class="dept-cat flex flex-col items-start justify-between gap-3 p-4 min-h-[104px] rounded-2xl border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/60 active:bg-blue-50 shadow-sm text-left transition group">'
      +'<div class="flex items-center gap-3 w-full">'
        +'<span class="w-11 h-11 rounded-xl bg-gradient-to-br '+col.bg+' '+col.to+' border '+col.border+' flex items-center justify-center shrink-0"><i data-lucide="'+icon+'" class="w-5 h-5 '+col.text+'"></i></span>'
        +'<span class="flex-1 min-w-0"><span class="block text-[15px] font-bold text-gray-900 truncate">'+c.name+'</span>'
        +(c.count>0?'<span class="text-[11px] text-gray-500">'+fmtCount(c.count)+' items</span>':'<span class="text-[11px] text-gray-600">Explore</span>')
        +'</span>'
        +'<i data-lucide="arrow-right" class="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0"></i>'
      +'</div>'
      +(c.subs&&c.subs.length?'<span class="text-[11px] text-gray-500 truncate w-full">'+c.subs.slice(0,3).join(' Â· ')+'</span>':'')
    +'</button>';
  }).join('');
  scroller.innerHTML='<div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-24">'
    +'<div class="sticky top-0 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 pt-1 pb-3 bg-white/95 backdrop-blur-xl border-b border-gray-200 mb-4 z-10 flex items-center justify-between gap-3">'
      +'<div class="flex items-center gap-3 min-w-0">'
        +'<span class="w-11 h-11 rounded-xl bg-black flex items-center justify-center overflow-hidden shrink-0"><svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" aria-hidden="true"><path d="M3 5l4.5 14L12 8l4.5 11L21 5" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
        +'<div class="min-w-0"><h3 class="text-base font-black text-gray-900 tracking-wide truncate">All Categories</h3><p class="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Shop every category</p></div>'
      +'</div>'
      +'<div class="flex items-center gap-2 shrink-0">'
        +'<button data-all-view="1" class="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">View all <i data-lucide="arrow-right" class="w-4 h-4"></i></button>'
        +'<button id="category-panel-close" class="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 flex items-center justify-center active:scale-95"><i data-lucide="x" class="w-4 h-4"></i></button>'
      +'</div>'
    +'</div>'
    +'<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">'+catCards+'</div>'
  +'</div>';
  panel.classList.remove("hidden");void panel.offsetWidth;panel.classList.add("panel-in");
  scroller.scrollTop=0;
  scroller.querySelectorAll('[data-category]').forEach(el=>{ el.onclick=()=>{filterByCategory(el.dataset.category,el);closeCategoryPanel();}; });
  const viewAll=scroller.querySelector('[data-all-view]');
  if(viewAll)viewAll.onclick=()=>{filterByCategory("All");closeCategoryPanel();};
  const closeBtn=scroller.querySelector('#category-panel-close');
  if(closeBtn)closeBtn.onclick=()=>{closeCategoryPanel();};
  const backTop=document.getElementById("category-back-top");
  const onScroll=()=>{ if(backTop)backTop.classList.toggle("flex",scroller.scrollTop>260); };
  scroller.addEventListener("scroll",onScroll,{passive:true}); onScroll();
  if(backTop)backTop.onclick=()=>{ scroller.scrollTo({top:0,behavior:"smooth"}); };
  if(window.lucide)lucide.createIcons();
  setNavActive("all");
  });
}
function toggleAllPanel(btn){
  const panel=document.getElementById("category-panel");
  if(panel&&!panel.classList.contains("hidden")&&_allPanel){closeCategoryPanel();}
  else openAllPanel(btn);
}
document.addEventListener("click",(e)=>{ if(e.target.closest("#site-categories-nav"))return; closeCategoryPanel(); });

function filterByDepartment(deptId){
  _activeCategory=deptId;
  closeSearchResults();
  if(window._filterShowroomByDepartment){window._filterShowroomByDepartment(deptId);}
  else if(window._filterShowroomByCategory){window._filterShowroomByCategory(deptId);}
  setNavActive(deptId);
  showToast("Exploring: "+(_deptLabels[deptId]||deptId));
}

function filterByCategory(name,el){
  _activeCategory=name;
  closeSearchResults();
  if(name==="All"){if(window._clearShowroomFilter)window._clearShowroomFilter();}
  else if(window._filterShowroomByCategory){window._filterShowroomByCategory(name);}
  showToast("Exploring: "+name);
  closeCategoryPanel();
  setNavActive(name==="All"?"all":name);
}

// ---- SMART SEARCH ----
let _suggToken=0;
function setupSearchSuggestions(){
  const inp=document.getElementById("search-input"),dd=document.getElementById("search-suggestions");
  inp.addEventListener("input",()=>{
    const q=inp.value.trim();if(q.length<1){dd.classList.add("hidden");return}
    const myToken=++_suggToken;
    if(window._getLiveSuggestions){
      window._getLiveSuggestions(q,8).then(function(results){
        if(myToken!==_suggToken)return;
        if(!results||results.length===0){
          const m=SEARCH_SUGGESTIONS.filter(s=>s.toLowerCase().includes(q.toLowerCase())).slice(0,8);
          if(!m.length){dd.classList.add("hidden");return}
          renderSuggestionDropdown(dd,m.map(function(s){return{title:s,category:""}}));
          return;
        }
        renderSuggestionDropdown(dd,results);
      }).catch(function(){
        if(myToken!==_suggToken)return;
        const m=SEARCH_SUGGESTIONS.filter(s=>s.toLowerCase().includes(q.toLowerCase())).slice(0,8);
        if(m.length)renderSuggestionDropdown(dd,m.map(function(s){return{title:s,category:""}}));
        else dd.classList.add("hidden");
      });
    } else {
      const m=SEARCH_SUGGESTIONS.filter(s=>s.toLowerCase().includes(q.toLowerCase())).slice(0,8);
      if(!m.length){dd.classList.add("hidden");return}
      renderSuggestionDropdown(dd,m.map(function(s){return{title:s,category:""}}));
    }
  });
  inp.addEventListener("blur",()=>setTimeout(()=>dd.classList.add("hidden"),200));
  inp.addEventListener("focus",()=>{if(inp.value.trim().length>0)inp.dispatchEvent(new Event("input"))});
}
function renderSuggestionDropdown(dd,results){
  dd.innerHTML=results.map(function(r){
    const t=escapeHtmlAttr(r.title||"");
    const c=r.category?escapeHtmlAttr(r.category):"";
    const thumb=r.thumbnail?(/\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(r.thumbnail.split('?')[0])||/^data:video\//i.test(r.thumbnail)?'<video src="'+escapeHtmlAttr(r.thumbnail)+'" muted playsinline preload="metadata" class="w-11 h-11 rounded-lg object-cover shrink-0"></video>':'<div class="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><i data-lucide="video-off" class="w-5 h-5 text-gray-400"></i></div>'):'<div class="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><i data-lucide="package" class="w-5 h-5 text-gray-400"></i></div>';
    const price=r.price!=null?'<span class="text-sm font-bold text-blue-600 ml-auto">'+(r.currency||"USD")+" "+Number(r.price).toLocaleString()+"</span>":"";
    return '<button onclick="selectSuggestion(\''+t.replace(/'/g,"\\'")+'\')" class="w-full text-left px-4 py-3.5 text-[15px] text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition flex items-center gap-3 border-b border-gray-100 last:border-0">'+thumb+'<div class="flex-1 min-w-0"><p class="truncate font-semibold">'+t+"</p>"+(c?'<p class="text-xs text-gray-500 truncate">'+c+"</p>":"")+"</div>"+price+"</button>";
  }).join("");
  lucide.createIcons();dd.classList.remove("hidden");
}
function selectSuggestion(t){document.getElementById("search-input").value=t;document.getElementById("search-suggestions").classList.add("hidden");executeSearch()}

let _searching=false;
let _searchToken=0;
function executeSearch(){
  const q=document.getElementById("search-input").value.trim();
  if(!q)return;
  if(typeof gtag!=='undefined')gtag('event','search',{search_term:q});
  document.getElementById("search-suggestions").classList.add("hidden");
  if(_searching)return;
  _searching=true;
  const myToken=++_searchToken;
  showSearchResultsLoading(q);
  if(window._smartSearch){
    let marketplaceRendered=false;
    window._smartSearch(q,30,function(partialResults,meta){
      if(myToken!==_searchToken)return;
      if(!marketplaceRendered&&partialResults&&partialResults.length>0){
        marketplaceRendered=true;
        renderSearchResults(q,partialResults,meta);
      } else if(marketplaceRendered&&partialResults){
        renderSearchResults(q,partialResults,meta);
      }
    }).then(function(res){
      _searching=false;
      if(myToken!==_searchToken)return;
      if(window._saveRecentSearch)window._saveRecentSearch(q);
      renderSearchResults(q,res.results||[],res);
    }).catch(function(){
      _searching=false;
      if(myToken!==_searchToken)return;
      renderSearchResults(q,[]);
    });
  } else {
    _searching=false;if(myToken===_searchToken)renderSearchResults(q,[]);
  }
}

function showSearchResultsLoading(q){
  let panel=document.getElementById("search-results-overlay");
  if(!panel){
    panel=document.createElement("div");
    panel.id="search-results-overlay";
    panel.className="fixed inset-0 z-[55] bg-black/85 backdrop-blur-sm overflow-y-auto";
    document.body.appendChild(panel);
  }
  let skeletonHtml='<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">';
  for(let i=0;i<12;i++){
    skeletonHtml+=`<div class="bg-white border border-gray-200 rounded-xl overflow-hidden"><div class="aspect-square bg-gray-100 animate-pulse"></div><div class="p-2.5 space-y-2"><div class="h-3 bg-gray-100 rounded animate-pulse"></div><div class="h-2 bg-gray-100 rounded w-2/3 animate-pulse"></div><div class="h-3 bg-gray-100 rounded w-1/3 animate-pulse"></div></div></div>`;
  }
  skeletonHtml+='</div>';
  panel.innerHTML=`<div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6"><div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3"><i data-lucide="search" class="w-5 h-5 text-blue-600"></i><h3 class="text-lg font-bold text-gray-900">Searching for "${escapeHtmlAttr(q)}"</h3></div><button onclick="closeSearchResults()" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><span>ðŸ”™ Back</span></button></div>${skeletonHtml}</div>`;
  panel.style.display="block";
  document.body.style.overflow="hidden";
  if(window.lucide)lucide.createIcons();
}

function renderSearchResults(query,results,meta){
  let panel=document.getElementById("search-results-overlay");
  if(!panel){
    panel=document.createElement("div");
    panel.id="search-results-overlay";
    panel.className="fixed inset-0 z-[55] bg-black/85 backdrop-blur-sm overflow-y-auto";
    document.body.appendChild(panel);
  }
  const hasResults=results&&results.length>0;
  const safeQuery=escapeHtmlAttr(query);
  const isPartial=meta&&meta.supplierCount===0&&meta.marketplaceCount>0&&!meta._final;
  let html=`<div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6">`;
  html+=`<div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3"><i data-lucide="search" class="w-5 h-5 text-blue-600"></i><h3 class="text-lg font-bold text-gray-900">`;
  if(hasResults){html+=`${results.length} result${results.length>1?"s":""} for "${safeQuery}"`}
  else{html+=`No results for "${safeQuery}"`}
  if(isPartial){html+=` <span class="text-xs text-gray-500 font-normal flex items-center gap-1"><i data-lucide="loader-2" class="w-3 h-3 animate-spin"></i> checking suppliers...</span>`}
  html+=`</h3></div><button onclick="closeSearchResults()" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><span>ðŸ”™ Back</span></button></div>`;
  if(hasResults){
    html+=`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">`;
    results.forEach(function(r){
      const imgsArr=Array.isArray(r.images)?r.images:[];
      const videoCover=imgsArr.find(function(u){return u&&/\.(mp4|webm|mov)(\?|#|$)/i.test(u);})||(r.video&&/\.(mp4|webm|mov)(\?|#|$)/i.test(r.video)?r.video:"")||(r.video_url&&/\.(mp4|webm|mov)(\?|#|$)/i.test(r.video_url)?r.video_url:"");
      const img=videoCover||r.thumbnail||imgsArr[0]||"";
      const price=r.price!=null?(r.currency||"USD")+" "+Number(r.price).toLocaleString():"";
      const isSpecial=r.is_special_order||r.entity_type==="special_order";
      const typeBadge=isSpecial?`<span class="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-blue-500/80 text-white border border-blue-400 z-10">Special Order</span>`:(r.entity_type?`<span class="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-white/90 text-blue-700 border border-blue-200 z-10">${escapeHtmlAttr(r.entity_type)}</span>`:"");
      const isVid=img&&/\.(mp4|webm|mov)(\?|#|$)/i.test(img);
      const imgHtml=img?(isVid?`<video src="${escapeHtmlAttr(img)}" muted loop autoplay playsinline preload="metadata" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.style.display='none'"></video><div class="absolute inset-0 flex items-center justify-center pointer-events-none"><div class="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow"><svg class="w-5 h-5 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>`:`<div class="w-full h-full flex items-center justify-center"><i data-lucide="video-off" class="w-10 h-10 text-gray-300"></i></div>`):`<div class="w-full h-full flex items-center justify-center"><i data-lucide="package" class="w-10 h-10 text-gray-700"></i></div>`;
      const deliveryInfo=isSpecial&&r.estimated_delivery_days?`<p class="text-[10px] text-gray-500 flex items-center gap-1"><i data-lucide="truck" class="w-3 h-3"></i>${r.estimated_delivery_days} days delivery</p>`:"";
      const brandText=r.brand?`<p class="text-[10px] text-gray-500 truncate">${escapeHtmlAttr(r.brand)}</p>`:"";
      const clickAction=isSpecial?`openSpecialOrderFromSearch('${escapeHtmlAttr(r.title||"").replace(/'/g,"\\'")}','${escapeHtmlAttr(r.brand||"").replace(/'/g,"\\'")}','${escapeHtmlAttr(r.category||"").replace(/'/g,"\\'")}',${r.price||0},'${escapeHtmlAttr(r.currency||"USD").replace(/'/g,"\\'")}')`:`openProductFromSearch('${escapeHtmlAttr(r.property_id||"").replace(/'/g,"\\'")}')`;
      html+=`<div class="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 cursor-pointer" onclick="${clickAction}">${typeBadge}<div class="aspect-square bg-gray-100 overflow-hidden">${imgHtml}</div><div class="p-2.5"><p class="text-xs font-bold text-gray-900 truncate mb-1">${escapeHtmlAttr(r.title||"Untitled")}</p>${brandText}${r.category?`<p class="text-[10px] text-gray-500 truncate mb-1">${escapeHtmlAttr(r.category)}</p>`:""}${price?`<p class="text-xs font-bold text-blue-600">${price}</p>`:""}${deliveryInfo}</div></div>`;
    });
    html+=`</div>`;
  } else {
    const popularHtml=(window.SEARCH_SUGGESTIONS||SEARCH_SUGGESTIONS||[]).slice(0,6).map(function(s){
      return `<button onclick="document.getElementById('search-input').value='${s.replace(/'/g,"\\'")}';executeSearch()" class="text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 transition">${s}</button>`;
    }).join("");
    html+=`<div class="max-w-2xl mx-auto"><div class="glass border border-blue-500/20 rounded-2xl p-6 sm:p-8 text-center">`;
    html+=`<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-200 mb-4"><i data-lucide="package-search" class="w-8 h-8 text-blue-600"></i></div>`;
    html+=`<h4 class="text-lg font-bold text-gray-900 mb-2">We couldn't find this item in our current marketplace</h4>`;
    html+=`<p class="text-sm text-gray-600 mb-5 leading-relaxed">But you can place a <span class="text-blue-600 font-bold">Special Order</span> and we will source it for you. Our team will review your request, find the best supplier, and get back to you with a quote.</p>`;
    html+=`<div class="flex flex-col sm:flex-row gap-3 justify-center">`;
    html+=`<button onclick="openSpecialOrderModal('${safeQuery.replace(/'/g,"\\'")}')" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"><i data-lucide="package-plus" class="w-4 h-4"></i> Request Product</button>`;
    html+=`<button onclick="closeSearchResults()" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm uppercase tracking-wide transition">Browse Marketplace</button>`;
    html+=`</div>`;
    html+=`<div class="mt-6 pt-6 border-t border-gray-200"><p class="text-xs text-gray-500 mb-3">Popular searches you might like:</p><div class="flex flex-wrap gap-2 justify-center">${popularHtml}</div></div>`;
    html+=`</div></div>`;
  }
  html+=`</div>`;
  panel.innerHTML=html;
  panel.style.display="block";
  document.body.style.overflow="hidden";
  if(window.lucide)lucide.createIcons();
}

function closeSearchResults(){
  const panel=document.getElementById("search-results-overlay");
  if(panel)panel.style.display="none";
  document.body.style.overflow="";
}

function escapeHtmlAttr(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

window.closeSearchResults=closeSearchResults;
window.executeSearch=executeSearch;
window.selectSuggestion=selectSuggestion;
window.openSpecialOrderFromSearch=function(title,brand,category,price,currency){
  closeSearchResults();
  if(window._openSpecialOrderFromSearch)window._openSpecialOrderFromSearch(title,brand,category,price,currency);
  else if(window.openSpecialOrderModal)window.openSpecialOrderModal(title);
};
window.openProductFromSearch=function(propertyId){
  closeSearchResults();
  if(propertyId)window.location.href="/details.html?id="+encodeURIComponent(propertyId);
  else showToast("Product not available");
};

// ---- VOICE SEARCH ----
function toggleVoiceSearch(){
  const btn=document.getElementById("voice-search-btn"),icon=document.getElementById("voice-icon");
  if(window._toggleVoiceSearch){
    const result=window._toggleVoiceSearch(
      (transcript)=>{document.getElementById("search-input").value=transcript},
      (listening)=>{
        if(listening){btn.classList.add("voice-listening","text-blue-500");icon.setAttribute("data-lucide","mic-off");lucide.createIcons();showToast("Listening...")}
        else{btn.classList.remove("voice-listening","text-blue-500");icon.setAttribute("data-lucide","mic");lucide.createIcons();const q=document.getElementById("search-input").value.trim();if(q)executeSearch()}
      }
    );
    if(!result.supported){showToast("Voice search not supported")}
    return;
  }
  // Fallback to old implementation
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){showToast("Voice search not supported");return}
  if(isListening){voiceRecognition.stop();return}
  voiceRecognition=new SR();voiceRecognition.continuous=false;voiceRecognition.interimResults=true;
  voiceRecognition.lang="en-US";
  voiceRecognition.onstart=()=>{isListening=true;btn.classList.add("voice-listening","text-blue-500");icon.setAttribute("data-lucide","mic-off");lucide.createIcons();showToast("Listening...")};
  voiceRecognition.onresult=(e)=>{let t="";for(let i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;document.getElementById("search-input").value=t};
  voiceRecognition.onerror=()=>showToast("Voice error. Try again.");
  voiceRecognition.onend=()=>{isListening=false;btn.classList.remove("voice-listening","text-blue-500");icon.setAttribute("data-lucide","mic");lucide.createIcons();const q=document.getElementById("search-input").value.trim();if(q)executeSearch()};
  voiceRecognition.start();
}

// ---- CAMERA SEARCH ----
function handleCameraSearch(e){
  const f=e.target.files[0];if(!f)return;
  if(!f.type.startsWith("image/")){showToast("Please select an image");return}
  const r=new FileReader();r.onload=(ev)=>{
    showToast("Photo received! Matching catalog...");
    document.getElementById("search-input").value="Photo: "+f.name.replace(/\.[^.]+$/,"");
    const dd=document.getElementById("search-suggestions");
    dd.innerHTML='<div class="p-4"><div class="flex items-center gap-3 mb-2"><img src="'+ev.target.result+'" class="w-16 h-16 rounded-lg object-cover border border-gray-200"><div><p class="text-sm text-gray-800 font-semibold">Image uploaded</p><p class="text-xs text-gray-500">Scanning visual catalog...</p></div></div><div class="flex gap-2 flex-wrap mt-2">'+SEARCH_SUGGESTIONS.slice(0,4).map(s=>'<span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-200">'+s+"</span>").join("")+"</div></div>";
    dd.classList.remove("hidden");lucide.createIcons();setTimeout(()=>dd.classList.add("hidden"),4000);
  };r.readAsDataURL(f);e.target.value="";
}

function escHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

function slideLink(slide){
  if(!slide)return null;
  if(slide.linkType==='product'&&slide.linkTarget)return {type:'product',target:slide.linkTarget};
  if(slide.linkType==='category'&&slide.linkTarget)return {type:'category',target:slide.linkTarget};
  if(slide.linkType==='section'&&slide.linkTarget)return {type:'section',target:slide.linkTarget};
  return null;
}

function slideCtaHtml(slide,idx){
  const link=slideLink(slide);
  if(!link)return '';
  return '<button id="slide-cta-'+idx+'" onclick="openSlideLink('+idx+')" class="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2.5 min-h-[44px] rounded-lg text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-blue-500/30 hover:scale-105 fade-in-up delay-3"></button>';
}

function slideCtaLabel(slide,copy){
  const link=slideLink(slide);
  if(!link)return '';
  if(link.type==='product')return copy.shopNow||'Shop Now';
  return copy.explore||'Explore';
}

window.openSlideLink=function(idx){
  const slide=activeCarouselSlides[idx];
  const link=slideLink(slide);
  if(!link)return;
  if(link.type==='product'){
    window.location.href='/details.html?id='+encodeURIComponent(link.target);
    return;
  }
  if(link.type==='category'){
    const catEl=Array.prototype.find.call(document.querySelectorAll('#category-list a[data-category],#category-panel [data-category]'),function(a){return a.dataset.category===link.target;});
    if(catEl){catEl.click();}
    else if(window._filterShowroomByCategory){window._filterShowroomByCategory(link.target);}
    showToast('Exploring: '+link.target);
  } else {
    if(window._clearShowroomFilter)window._clearShowroomFilter();
    showToast('Opening Showroom');
  }
  const showroom=document.getElementById('showroom-directory');
  if(showroom)showroom.scrollIntoView({behavior:'smooth',block:'start'});
};

// ---- HERO VIDEO CAROUSEL ----
function renderCarousel(){
  mergeAdSlides();
  if(!activeCarouselSlides.length) activeCarouselSlides=[BRAND_FALLBACK_SLIDE];
  const slides=activeCarouselSlides;
  const sc=document.getElementById("carousel-slides");
  if(!sc)return;
  sc.innerHTML="";
  slides.forEach((slide,idx)=>{
    const el=document.createElement("div");
    el.className="carousel-slide hidden-slide";
    el.id="slide-"+idx;
    var mediaHtml;
    if(slide.images&&slide.images.length>0){
      var kbClass="kb-"+(((idx%5))+1);
      var imgHtml=slide.images.map(function(u,i){return '<div class="ad-slideshow-img '+kbClass+'" data-src="'+u+'" style="position:absolute;inset:0;width:100%;height:100%;background-image:url(\''+u+'\');background-size:cover;background-position:center;opacity:'+(i===0?'1':'0')+';transition:opacity 1.5s ease-in-out"></div>';}).join('');
      mediaHtml='<div class="ad-slideshow" data-interval="4000" style="position:absolute;inset:0;width:100%;height:100%;overflow:hidden">'+imgHtml+'</div>';
    }else if(slide.image){
      var kbClass2="kb-"+(((idx%5))+1);
      mediaHtml='<div class="kb-img '+kbClass2+'" style="background-image:url(\''+slide.image+'\');background-size:cover;background-position:center"></div>';
    }else if(slide.brandOnly){
      mediaHtml='<div class="brand-hero-bg" style="position:absolute;inset:0;width:100%;height:100%;background:linear-gradient(135deg,#0b1226 0%,#1e3a8a 55%,#0369a1 100%)"></div>';
    }else{
      // Hero video: fill the whole banner, play muted/autoplay/loop/inline,
      // show the poster as a cover while it loads, hide the player chrome and
      // fall back to the poster image if the video ever fails to load.
      var posterBg=slide.poster?('<div class="hero-poster-bg" style="position:absolute;inset:0;width:100%;height:100%;background-image:url(\''+slide.poster+'\');background-size:cover;background-position:center"></div>'):'';
      mediaHtml=posterBg+
        '<video class="hero-video" muted autoplay loop playsinline webkit-playsinline preload="auto" data-src="'+slide.video+'" style="width:100%;height:100%;object-fit:cover;object-position:center;pointer-events:none"'+(slide.poster?' poster="'+slide.poster+'"':'')+
        ' onerror="this.style.display=&quot;none&quot;"></video>'+
        '<div class="hero-video-overlay" style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.22));pointer-events:none" aria-hidden="true"></div>';
    }
    el.innerHTML=mediaHtml+
      (slide.promoBanner
        ? '<div class="absolute inset-0 z-10 flex items-end justify-start p-5 sm:p-8 pointer-events-none">'+
          '<div class="max-w-md bg-black/45 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 pointer-events-auto">'+
          (slide.badge?'<span class="inline-block text-[10px] font-black uppercase tracking-widest text-amber-300 mb-1.5">'+escHtml(slide.badge)+'</span>':'')+
          '<h2 id="slide-title-'+idx+'" class="text-white text-2xl sm:text-3xl font-black leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]"></h2>'+
          '<p class="mt-1.5 text-white/90 text-sm sm:text-base font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"></p>'+
          (slide.buttonText&&slide.buttonLink?'<a href="'+escHtml(slide.buttonLink)+'" class="inline-flex items-center gap-2 mt-3 bg-white text-gray-900 text-xs font-black px-5 py-2.5 rounded-full hover:gap-3 transition-all shadow-lg">'+escHtml(slide.buttonText)+' <i data-lucide="arrow-right" class="w-4 h-4"></i></a>':'')+
          '</div>'+
        '</div>'
        : '<div class="absolute inset-0 z-10 flex items-center justify-center text-center p-6 sm:p-10">'+
        '<div class="glass-hero-panel">'+
        '<h2 id="slide-title-'+idx+'" class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"></h2>'+
        '<p class="mt-3 text-base sm:text-lg font-extrabold text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">Houses, villas and apartments &mdash; worldwide</p>'+
        '</div>'+
        '</div>');
    sc.appendChild(el);
  });
  currentSlide=restoreShowcasePosition(activeCarouselSlides.length);
  goToSlide(currentSlide);
  updateCarouselLanguage();
}

function updateCarouselLanguage(){
  activeCarouselSlides.forEach((slide,idx)=>{
    const t=document.getElementById("slide-title-"+idx);
    if(!t)return;
    if(slide.promoBanner){
      t.textContent=slide.title||'';
      const p=t.parentElement&&t.parentElement.querySelector('p');
      if(p)p.textContent=slide.subtitle||'';
    }else{
      t.textContent='Weverse Online Shop';
    }
  });
  updateBadgeLanguage();
}

window.addEventListener('ads-updated', (e) => {
  adminAdSlides = e.detail || [];
  mergeAdSlides();
  renderCarousel();
});

// AI-generated video advertisement override is permanently disabled.
// The runtime module (src/ai-ad-runtime.js) was removed, so no
// ai-ad-override-updated event is ever dispatched and no AI video can
// play over the hero carousel.

function initAds(){
  if(window._loadAds){
    window._loadAds().then(slides => { adminAdSlides=slides||[]; mergeAdSlides(); renderCarousel(); });
    window._subscribeAds && window._subscribeAds();
  }
}

function updateBadgeLanguage(){
  const copy=AD_COPY[currentLang]||AD_COPY.en;
  const bm={worldwide:{t:copy.worldwide,s:copy.worldwideSub},delivery:{t:copy.delivery,s:copy.deliverySub},secure:{t:copy.secure,s:copy.secureSub},support:{t:copy.support,s:copy.supportSub}};
  document.querySelectorAll("[data-badge]").forEach(el=>{const k=el.getAttribute("data-badge");if(bm[k])el.textContent=bm[k].t});
  document.querySelectorAll("[data-badge-sub]").forEach(el=>{const k=el.getAttribute("data-badge-sub");if(bm[k]){let s=bm[k].s;const c=COUNTRIES.find(c=>c.code===currentCountry);if(k==="worldwide"&&c)s="Shipping to "+c.name;el.textContent=s}});
}

function goToSlide(idx){
  const slides=document.querySelectorAll(".carousel-slide");
  slides.forEach(s=>{s.classList.remove("active-slide");s.classList.add("hidden-slide")});
  const sl=document.getElementById("slide-"+idx);
  if(sl){sl.classList.remove("hidden-slide");sl.classList.add("active-slide")}
  currentSlide=idx;resetCarouselTimer();playActiveVideo();updateShowcaseBadge();saveShowcasePosition();
}
function updateShowcaseBadge(){
  const b=document.getElementById('live-ad-badge');
  const t=document.getElementById('live-ad-badge-text');
  if(!b)return;
  const slide=activeCarouselSlides[currentSlide]||activeCarouselSlides[0]||{};
  if(t)t.textContent=cleanAdLabel(slide.badge)||'Featured';
  b.classList.remove('live-badge-in');
  void b.offsetWidth;
  b.classList.add('live-badge-in');
}

// Only the very first autoplay is deferred: on slow connections the hero
// video (~1MB) must not compete with the page's own scripts or keep the
// browser's loading indicator busy. It starts after the page has finished
// loading (with a fallback timer), or immediately if the user changes slides.
let heroVideoDeferred = true;
function playActiveVideo(){
  if (heroVideoDeferred) {
    heroVideoDeferred = false;
    if (document.readyState !== 'complete') {
      const startHeroVideo = () => playActiveVideo();
      window.addEventListener('load', startHeroVideo, { once: true });
      setTimeout(startHeroVideo, 3500);
      return;
    }
  }
  // Pause hidden videos
  const others=document.querySelectorAll(".carousel-slide.hidden-slide video");
  others.forEach(v=>{v.pause()});
  // Stop hidden slideshows
  document.querySelectorAll(".carousel-slide.hidden-slide .ad-slideshow").forEach(function(s){if(s._timer){clearInterval(s._timer);s._timer=null}});
  // Play active video
  const active=document.querySelector(".carousel-slide.active-slide video");
  if(active){
    if(!active.querySelector("source")){
      const src=document.createElement("source");
      src.src=active.getAttribute("data-src");src.type="video/mp4";
      active.appendChild(src);active.load();
    }
    active.currentTime=0;active.play().catch(()=>{});
  }
  // Start active slideshow
  const activeSS=document.querySelector(".carousel-slide.active-slide .ad-slideshow");
  if(activeSS&&!activeSS._timer){
    var imgs=activeSS.querySelectorAll(".ad-slideshow-img");
    if(imgs.length>1){
      var cur=0;var interval=parseInt(activeSS.getAttribute("data-interval"))||4000;
      activeSS._timer=setInterval(function(){
        imgs[cur].style.opacity='0';cur=(cur+1)%imgs.length;imgs[cur].style.opacity='1';
      },interval);
    }
  }
  preloadNextVideo();
}

function preloadNextVideo(){
  var n=activeCarouselSlides.length;
  for(var off=1;off<=3;off++){
    var idx=(currentSlide+off)%n;
    var el=document.getElementById("slide-"+idx);
    if(!el)continue;
    var v=el.querySelector("video");
    if(v&&!v.querySelector("source")){
      var src=document.createElement("source");
      src.src=v.getAttribute("data-src");src.type="video/mp4";
      v.appendChild(src);
      v.preload=(off<=2)?"auto":"metadata";
      v.load();
    }
    var ss=el.querySelector(".ad-slideshow");
    if(ss){ss.querySelectorAll(".ad-slideshow-img[data-src]").forEach(function(d){if(!d.style.backgroundImage&&d.getAttribute("data-src"))d.style.backgroundImage="url('"+d.getAttribute("data-src")+"')"})}
  }
}

function nextSlide(){goToSlide((currentSlide+1)%activeCarouselSlides.length)}
function prevSlide(){goToSlide((currentSlide-1+activeCarouselSlides.length)%activeCarouselSlides.length)}

function startCarouselTimer(){
  carouselTimer=setInterval(()=>nextSlide(),10000)
}
function resetCarouselTimer(){
  clearInterval(carouselTimer);
  startCarouselTimer();
}



// ---- LIVE CLOCK ----
// Renders in the detected location's timezone (from IP/GPS) so the day and time
// always match the user's real location, not the device's system clock setting.
// Falls back to the device timezone until a location is detected.
function updateClock(){
  const tz=detectedLocation&&detectedLocation.timezone&&detectedLocation.timezone!=="â€”"
    ?detectedLocation.timezone
    :Intl.DateTimeFormat().resolvedOptions().timeZone;
  const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const parts=new Intl.DateTimeFormat("en-US",{
    timeZone:tz,weekday:"short",day:"2-digit",month:"long",year:"numeric",
    hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false
  }).formatToParts(new Date());
  const get=t=>(parts.find(p=>p.type===t)||{}).value||"";
  const wd=get("weekday");
  const dayName=days.find(d=>d.slice(0,3)===wd.slice(0,3))||wd;
  document.getElementById("live-day").textContent=dayName;
  document.getElementById("live-date").textContent=get("day");
  document.getElementById("live-month").textContent=get("month");
  document.getElementById("live-year").textContent=get("year");
  let h=get("hour");if(h==="24")h="00";
  document.getElementById("live-time").textContent=h+":"+get("minute")+":"+get("second");
}

// ---- LIVE LOCATION DETECTION ----
let detectedLocation={country:"â€”",state:"",city:"â€”",timezone:"â€”",source:"none",vpn:false};
let locationDetected=false;

function setTimezoneDisplay(){
  try{
    // Only fall back to the device timezone when no location has been detected yet.
    // Never overwrite a timezone obtained from IP/GPS detection with the device clock.
    if(!locationDetected||detectedLocation.timezone==="â€”"){
      detectedLocation.timezone=Intl.DateTimeFormat().resolvedOptions().timeZone||"â€”";
    }
    const el=document.getElementById("live-timezone");
    if(el)el.textContent=detectedLocation.timezone;
  }catch(e){}
}

function applyLocationToBar(){
  const c=document.getElementById("live-country");
  const ci=document.getElementById("live-city");
  const v=document.getElementById("vpn-warning");
  if(c)c.textContent=detectedLocation.country||"â€”";
  if(ci){
    let label=detectedLocation.city||"â€”";
    if(detectedLocation.state&&detectedLocation.state!==detectedLocation.city)label=label+", "+detectedLocation.state;
    ci.textContent=label;
  }
  if(v)v.classList.toggle("hidden",!detectedLocation.vpn);
}

function detectLocationByIP(){
  // Reliable, no-key IP geolocation. Tries ipapi.co first, then ip-api.com.
  fetch("https://ipapi.co/json/").then(r=>r.json()).then(d=>{
    if(!d||(d.error||(d.country_code||d.country)===undefined))throw 0;
    detectedLocation={
      country:d.country_name||d.country||"â€”",
      state:d.region||d.regionName||"",
      city:d.city||"â€”",
      timezone:d.timezone||detectedLocation.timezone||"â€”",
      source:"ip",
      vpn:false
    };
    // VPN heuristic: ipapi.co sets org to hosting/VPN providers; ip-api.com sets proxy/hosting flags
    const org=(d.org||d.asn||"").toLowerCase();
    if(org.includes("vpn")||org.includes("proxy")||org.includes("hosting")||org.includes("datacenter"))detectedLocation.vpn=true;
    locationDetected=true;
    setTimezoneDisplay();
    applyLocationToBar();
    updateClock();
  }).catch(()=>{
    // Fallback: ip-api.com (http only on http pages, https on https)
    fetch("https://ip-api.com/json/?fields=status,country,regionName,city,timezone,proxy,hosting,isp").then(r=>r.json()).then(d=>{
      if(!d||d.status!=="success")throw 0;
      detectedLocation={
        country:d.country||"â€”",
        state:d.regionName||"",
        city:d.city||"â€”",
        timezone:d.timezone||detectedLocation.timezone||"â€”",
        source:"ip",
        vpn:!!(d.proxy||d.hosting)
      };
      locationDetected=true;
      setTimezoneDisplay();
      applyLocationToBar();
      updateClock();
    }).catch(()=>{
      // Final fallback: timezone-derived country only
      setTimezoneDisplay();
      try{
        const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";
        const tzCity=tz.split("/")[1]||"";
        const tzMap={"New_York":"US","Los_Angeles":"US","Chicago":"US","Denver":"US","London":"GB","Paris":"FR","Berlin":"DE","Madrid":"ES","Rome":"IT","Tokyo":"JP","Seoul":"KR","Shanghai":"CN","Beijing":"CN","Hong_Kong":"HK","Singapore":"SG","Sydney":"AU","Melbourne":"AU","Toronto":"CA","Vancouver":"CA","Mexico_City":"MX","Sao_Paulo":"BR","Buenos_Aires":"AR","Mumbai":"IN","Delhi":"IN","Dubai":"AE","Istanbul":"TR","Moscow":"RU","Cairo":"EG","Lagos":"NG","Nairobi":"KE","Johannesburg":"ZA","Stockholm":"SE","Oslo":"NO","Helsinki":"FI","Copenhagen":"DK","Amsterdam":"NL","Brussels":"BE","Vienna":"AT","Zurich":"CH","Dublin":"IE","Lisbon":"PT","Athens":"GR","Warsaw":"PL","Prague":"CZ","Budapest":"HU","Bucharest":"RO","Bangkok":"TH","Hanoi":"VN","Jakarta":"ID","Kuala_Lumpur":"MY","Manila":"PH","Taipei":"TW","Riyadh":"SA","Doha":"QA","Kuwait":"KW","Tehran":"IR","Karachi":"PK","Dhaka":"BD","Colombo":"LK"};
        const cc=tzMap[tzCity];
        if(cc){const c=COUNTRIES.find(x=>x.code===cc);detectedLocation.country=c?c.name:cc;}
        if(tzCity)detectedLocation.city=tzCity.replace(/_/g," ");
      }catch(e){}
      detectedLocation.source="tz";
      locationDetected=true;
      applyLocationToBar();
    });
  });
}

function detectLocationByGPS(){
  if(!navigator.geolocation)return false;
  navigator.geolocation.getCurrentPosition(pos=>{
    const{latitude:lat,longitude:lon}=pos.coords;
    // Reverse geocode via free OpenStreetMap Nominatim (rate-limited, no key)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,{headers:{"Accept-Language":"en"}}).then(r=>r.json()).then(d=>{
      if(!d||!d.address)throw 0;
      const a=d.address;
      detectedLocation={
        country:a.country||detectedLocation.country||"â€”",
        state:a.state||a.region||a.county||"",
        city:a.city||a.town||a.village||a.hamlet||a.municipality||detectedLocation.city||"â€”",
        timezone:detectedLocation.timezone||"â€”",
        source:"gps",
        vpn:false
      };
      locationDetected=true;
      setTimezoneDisplay();
      applyLocationToBar();
      updateClock();
    }).catch(()=>{});
  },()=>{},
  {enableHighAccuracy:true,timeout:8000,maximumAge:300000});
  return true;
}

function initLiveLocation(){
  setTimezoneDisplay();
  // Always run IP detection â€” it provides the authoritative timezone for the clock.
  // GPS (when available) refines city/country/state in parallel but does not override the timezone.
  detectLocationByIP();
  detectLocationByGPS();
  // Auto-refresh timezone if the browser reports a change (e.g. user travels)
  try{
    if("timeZone" in Intl.DateTimeFormat().resolvedOptions()){
      let lastTz=Intl.DateTimeFormat().resolvedOptions().timeZone;
      setInterval(()=>{
        const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
        if(tz!==lastTz){lastTz=tz;if(!locationDetected)setTimezoneDisplay();}
      },15000);
    }
  }catch(e){}
}

// ---- HOLIDAY ENGINE ----
function updateHolidayInfo(){
  const holidays=HOLIDAYS[currentCountry]||[];
  const now=new Date();
  const tk=String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
  const today=holidays.find(h=>h.date===tk);
  if(today){document.getElementById("holiday-text").textContent="Today: "+today.name;return}
  let next=null,minDiff=Infinity;
  holidays.forEach(h=>{const[mm,dd]=h.date.split("-");let hd=new Date(now.getFullYear(),parseInt(mm)-1,parseInt(dd));if(hd<now)hd.setFullYear(now.getFullYear()+1);const diff=hd-now;if(diff<minDiff){minDiff=diff;next=h}});
  const cn=COUNTRIES.find(c=>c.code===currentCountry)?.name||currentCountry;
  if(next){const days=Math.ceil(minDiff/(864e5));document.getElementById("holiday-text").textContent="Next event in "+cn+": "+next.name+" (in "+days+" days)"}
  else{document.getElementById("holiday-text").textContent="No upcoming events for "+cn}
}

// ---- REGION SETTINGS ----
function saveRegionSettings(){
  currentCountry=document.getElementById("country").value;
  currentLang=document.getElementById("language").value;
  localStorage.setItem("kco_country",currentCountry);localStorage.setItem("kco_language",currentLang);
  updateBadgeLanguage();
}
function loadRegionSettings(){
  const sc=localStorage.getItem("kco_country"),sl=localStorage.getItem("kco_language");
  if(sc){document.getElementById("country").value=sc;currentCountry=sc}else{currentCountry=document.getElementById("country").value||"US"}
  if(sl){document.getElementById("language").value=sl;currentLang=sl}else{currentLang=document.getElementById("language").value||"en"}
}

// ---- AUTO COUNTRY & LANGUAGE DETECTION ----
// Runs once on first visit (no saved preference). Detects from browser settings,
// shows a friendly notification, and is VPN-aware (never forces a change).
// Country -> native language map: a visitor from a non-English country always
// sees the site in their own language automatically (VPN included), and it only
// changes if they pick another language themselves.
var COUNTRY_LANG={US:"en",GB:"en",AU:"en",NZ:"en",CA:"en",IE:"en",ZA:"en",NG:"en",GH:"en",KE:"sw",TZ:"sw",UG:"sw",ES:"es",MX:"es",AR:"es",CO:"es",CL:"es",PE:"es",VE:"es",BO:"es",PY:"es",UY:"es",CR:"es",PA:"es",GT:"es",HN:"es",SV:"es",NI:"es",DO:"es",EC:"es",FR:"fr",BE:"fr",LU:"fr",MC:"fr",HT:"fr",SN:"fr",CI:"fr",ML:"fr",BF:"fr",NE:"fr",TG:"fr",BJ:"fr",MG:"fr",CM:"fr",DE:"de",AT:"de",CH:"de",LI:"de",IT:"it",SM:"it",PT:"pt",BR:"pt",AO:"pt",MZ:"pt",NL:"nl",RU:"ru",BY:"ru",KZ:"ru",KG:"ru",SA:"ar",AE:"ar",EG:"ar",DZ:"ar",MA:"ar",TN:"ar",LY:"ar",SY:"ar",JO:"ar",LB:"ar",IQ:"ar",KW:"ar",QA:"ar",BH:"ar",OM:"ar",YE:"ar",SD:"ar",MR:"ar",CN:"zh",TW:"zh",HK:"zh",SG:"zh",JP:"ja",KR:"ko",IN:"hi",PK:"ur",BD:"bn",LK:"si",NP:"ne",IR:"fa",AF:"fa",TR:"tr",AZ:"az",UZ:"uz",ID:"id",MY:"ms",BN:"ms",TH:"th",VN:"vi",KH:"km",LA:"lo",MM:"my",PL:"pl",CZ:"cs",SK:"sk",HU:"hu",RO:"ro",BG:"bg",HR:"hr",SR:"sr",SI:"sl",MK:"mk",BA:"bs",SE:"sv",DK:"da",FI:"fi",NO:"no",IS:"is",UA:"uk",GR:"el",CY:"el",IL:"he",ET:"am",GE:"ka",AM:"hy"};
function detectRegionAuto(){
  // Only auto-detect on first visit â€” if user already has a preference, respect it
  if(localStorage.getItem("kco_country")||localStorage.getItem("kco_language"))return;
  let detectedCountry=null,detectedLang=null,usedFallback=false;

  // 1) Try browser locale (navigator.language) â€” works even behind VPN
  try{
    const navLang=(navigator.language||navigator.userLanguage||"en").toLowerCase();
    const parts=navLang.split(/[-_]/);
    const langCode=parts[0];
    const regionCode=(parts[1]||"").toUpperCase();
    // Map browser region to our country list if present
    if(regionCode&&COUNTRIES.some(c=>c.code===regionCode))detectedCountry=regionCode;
    // Map browser language to our language list
    if(LANGUAGES.some(l=>l.code===langCode))detectedLang=langCode;
    // Common languageâ†’country fallback when region absent
    if(!detectedCountry){
      const langToCountry={en:"US",es:"ES",fr:"FR",de:"DE",ja:"JP",zh:"CN",pt:"PT",ru:"RU",hi:"IN",ar:"SA",it:"IT",ko:"KR",nl:"NL",sv:"SE",pl:"PL",tr:"TR",id:"ID",th:"TH",vi:"VN",uk:"UA",cs:"CZ",da:"DK",fi:"FI",no:"NO",el:"GR",he:"IL",ms:"MY"};
      if(langToCountry[langCode])detectedCountry=langToCountry[langCode];
    }
    if(!detectedLang)detectedLang="en"; // English as universal fallback
  }catch(e){detectedLang="en";usedFallback=true}

  // 2) Try timezone as a secondary signal (Intl API)
  let tzCountry=null;
  try{
    const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";
    const tzCity=tz.split("/")[1]||"";
    const tzMap={"New_York":"US","Los_Angeles":"US","Chicago":"US","Denver":"US","London":"GB","Paris":"FR","Berlin":"DE","Madrid":"ES","Rome":"IT","Tokyo":"JP","Seoul":"KR","Shanghai":"CN","Beijing":"CN","Hong_Kong":"HK","Singapore":"SG","Sydney":"AU","Melbourne":"AU","Toronto":"CA","Vancouver":"CA","Mexico_City":"MX","Sao_Paulo":"BR","Buenos_Aires":"AR","Mumbai":"IN","Delhi":"IN","Dubai":"AE","Istanbul":"TR","Moscow":"RU","Cairo":"EG","Lagos":"NG","Nairobi":"KE","Johannesburg":"ZA","Stockholm":"SE","Oslo":"NO","Helsinki":"FI","Copenhagen":"DK","Amsterdam":"NL","Brussels":"BE","Vienna":"AT","Zurich":"CH","Dublin":"IE","Lisbon":"PT","Athens":"GR","Warsaw":"PL","Prague":"CZ","Budapest":"HU","Bucharest":"RO","Bangkok":"TH","Hanoi":"VN","Jakarta":"ID","Kuala_Lumpur":"MY","Manila":"PH","Taipei":"TW","Riyadh":"SA","Doha":"QA","Kuwait":"KW","Tehran":"IR","Karachi":"PK","Dhaka":"BD","Colombo":"LK"};
    if(tzMap[tzCity])tzCountry=tzMap[tzCity];
  }catch(e){}

  // VPN awareness: if timezone country differs from browser-language country, likely VPN
  const vpnMismatch=tzCountry&&detectedCountry&&tzCountry!==detectedCountry;

  // Prefer timezone country when available (more reliable than browser language region)
  const finalCountry=tzCountry||detectedCountry||"US";
  // Use the detected country's native language automatically so every visitor
  // sees their own language (even with a VPN). Falls back to their browser
  // language, then English.
  const finalLang=COUNTRY_LANG[finalCountry]||detectedLang||"en";

  // Apply detected values to selectors
  const countrySel=document.getElementById("country");
  const langSel=document.getElementById("language");
  if(countrySel&&COUNTRIES.some(c=>c.code===finalCountry)){countrySel.value=finalCountry;currentCountry=finalCountry}
  if(langSel&&LANGUAGES.some(l=>l.code===finalLang)){langSel.value=finalLang;currentLang=finalLang}

  // Save so we don't re-detect on every visit
  localStorage.setItem("kco_country",currentCountry);
  localStorage.setItem("kco_language",currentLang);
  localStorage.setItem("kco_auto_detected","1");

  // Show friendly notification
  const countryName=COUNTRIES.find(c=>c.code===finalCountry)?.name||finalCountry;
  const langName=LANGUAGES.find(l=>l.code===finalLang)?.name||finalLang;
  let msg;
  if(vpnMismatch){
    const tzName=COUNTRIES.find(c=>c.code===tzCountry)?.name||tzCountry;
    msg="It looks like you're browsing from a different location. Your country has been detected as "+countryName+", but you can switch to your preferred country and language at any time.";
  }else{
    msg="Your location has been detected as "+countryName+". Language: "+langName+". You can change these settings at any time.";
  }
  showRegionNotification(msg);
}

function showRegionNotification(msg){
  // Non-blocking toast pinned to the bottom-left corner so it never covers the
  // page content, auto-hides, and can be dismissed instantly.
  let n=document.getElementById("region-detect-notification");
  if(!n){
    n=document.createElement("div");
    n.id="region-detect-notification";
    n.className="fixed bottom-5 left-4 z-[55] max-w-[320px] w-[calc(100vw-2rem)] bg-white border border-blue-200 rounded-2xl shadow-2xl px-4 py-3 flex items-start gap-3 transition-all duration-500";
    n.innerHTML='<i data-lucide="globe" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>'+
      '<div class="flex-1 min-w-0"><p class="text-xs text-gray-700 leading-snug" id="region-detect-text"></p>'+
      '<button onclick="document.getElementById(\'region-detect-notification\').classList.add(\'opacity-0\',\'translate-y-2\');setTimeout(()=>document.getElementById(\'region-detect-notification\').remove(),400)" class="text-[10px] text-blue-600 hover:text-blue-700 font-semibold mt-1.5">Dismiss</button></div>'+
      '<button onclick="document.getElementById(\'region-detect-notification\').remove()" class="text-gray-400 hover:text-gray-700 shrink-0 text-[10px] font-bold uppercase tracking-wide" aria-label="Close">✕</button>';
    document.body.appendChild(n);
    if(window.lucide)lucide.createIcons();
  }
  document.getElementById("region-detect-text").textContent=msg;
  n.classList.remove("opacity-0","translate-y-2");
  clearTimeout(n._t);
  n._t=setTimeout(()=>{n.classList.add("opacity-0","translate-y-2");setTimeout(()=>n.remove(),400)},8000);
}

// ---- UI HELPERS ----
function toggleNotifications(){document.getElementById("notification-panel").classList.toggle("hidden")}
function openAuthModal(){var cur=window.location.pathname+window.location.search;if(!cur||cur==="/"){window.location.href="/auth.html"}else{window.location.href="/auth.html?redirect="+encodeURIComponent(cur)}}
function showToast(msg){
  const t=document.getElementById("toast");document.getElementById("toast-message").textContent=msg;
  t.classList.remove("translate-y-20","opacity-0");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.add("translate-y-20","opacity-0"),3000);
}
window.showToast=showToast;
window._showToast=showToast;

// ---- HERO VIDEO LOADING (Supabase REST) ----
// homepage-promo.js is a Vite module that gets stripped during build, so we
// load hero video slides directly via a plain fetch() here in app.js.
(function loadHeroVideos(){
  const SUPABASE_URL='https://mzgrjwvwzgqgivwmlkno.supabase.co';
  const SUPABASE_ANON='sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX';
  function buildSlide(s,fallback){
    var video=String((s&&s.video)||'').trim();
    var poster=String((s&&s.poster)||'').trim();
    var title=String((s&&s.title)||'').trim();
    var subtitle=String((s&&s.subtitle)||'').trim();
    var slide={
      adId:(s&&s.id)||('hero-'+(video||poster||Math.random().toString(36).slice(2))),
      promoBanner:true,
      badge:title||'Feature',
      title:title||'Weverse Online Shop',
      subtitle:subtitle,
      buttonText:String((s&&s.buttonText)||'SHOP NOW').trim(),
      buttonLink:String((s&&s.buttonLink)||'/#showroom-directory').trim()
    };
    if(video){slide.video=video;if(poster)slide.poster=poster;}
    else if(poster){slide.image=poster;}
    return slide;
  }
  async function fetchAndPush(){
    try{
      var r=await fetch(SUPABASE_URL+'/rest/v1/site_settings?select=hero_video_slides,promo_banner_enabled,promo_banner_image,promo_banner_video,promo_banner_title,promo_banner_subtitle,promo_banner_button_text,promo_banner_button_link&limit=1',{
        headers:{apikey:SUPABASE_ANON,Authorization:'Bearer '+SUPABASE_ANON}
      });
      if(!r.ok)return;
      var rows=await r.json();
      var s=rows&&rows[0];
      if(!s)return;
      var raw=Array.isArray(s.hero_video_slides)?s.hero_video_slides:[];
      var slides=[];
      for(var i=0;i<raw.length;i++){
        var item=raw[i];
        if(!item||item.enabled===false)continue;
        var hasV=String(item.video||'').trim();
        var hasP=String(item.poster||'').trim();
        if(!hasV&&!hasP)continue;
        slides.push(buildSlide(item,s));
      }
      if(!slides.length){
        // Legacy single promo banner fallback
        if(s.promo_banner_enabled!==false){
          var img=(s.promo_banner_image||'').trim();
          var vid=(s.promo_banner_video||'').trim();
          if(img||vid){
            var legacy={
              promoBanner:true,
              badge:(s.promo_banner_title||'Promo Banner').trim(),
              title:(s.promo_banner_title||'Weverse Online Shop').trim(),
              subtitle:(s.promo_banner_subtitle||'').trim(),
              buttonText:(s.promo_banner_button_text||'').trim(),
              buttonLink:(s.promo_banner_button_link||'/#showroom-directory').trim()
            };
            if(vid){legacy.video=vid;if(img)legacy.poster=img;}
            else if(img){legacy.image=img;}
            slides.push(legacy);
          }
        }
      }
      if(slides.length){
        window.dispatchEvent(new CustomEvent('hero-videos-updated',{detail:{slides:slides}}));
      }
    }catch(e){}
  }
  fetchAndPush();
})();

// ---- BOOTSTRAP ----
document.addEventListener("DOMContentLoaded",()=>{
  populateSelectors();loadRegionSettings();detectRegionAuto();renderCategories();setupSearchSuggestions();
  renderCarousel();updateBadgeLanguage();
  lucide.createIcons();
  // Reveal hero carousel after timeout if hero-videos-updated hasn't fired yet
  // (no published media → show the blue fallback; published media → event handler above already revealed it)
  setTimeout(function(){var hc=document.getElementById('hero-carousel');if(hc&&hc.style.opacity==='0')hc.style.opacity='1';},2500);
  // The live date/time/location bar is intentionally hidden (not removed). When
  // hidden we skip the ticking clock and the IP/GPS location requests so they
  // never hang the network or distract the customer.
  const trustBar=document.getElementById("trust-bar");
  if(trustBar&&!trustBar.classList.contains("hidden")){
    updateClock();
    setInterval(updateClock,1000);
    initLiveLocation();
  }
  initAds();
});
// Re-render the category nav once the live showroom data (DB houses) is
// loaded so new categories appear automatically.
document.addEventListener("smart-search-ready",()=>{renderCategories();});
document.addEventListener("showroom-categories-ready",()=>{renderCategories();});
