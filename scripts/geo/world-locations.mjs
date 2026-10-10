/* ── Weverse Online Shopping — Worldwide Location Database ────────────────
 *
 * REAL locations only. No invented cities, states, postal codes or
 * coordinates. Excludes African countries (per owner). Structure follows
 * the publishing order: country → state/province/region → city → town/area.
 *
 * city entries: [name, zip|postal (string, '' when the country has no real
 * postal standard), latitude, longitude, [local areas (strings)]]
 *
 * Deep coverage: United States, Canada, United Kingdom, Australia.
 * The Rest-of-World section covers every other non-African country at
 * country → region(where real) → national/major cities level, so the
 * publisher always maps to a REAL place. Expand by appending entries the
 * same way — never by inventing data.
 */

const Cstr = (code, country, states) => ({ code, country, states });

const one = (code, country, cities) =>
  Cstr(code, country, [{ name: '', cities }]);

/* ── United States ─────────────────────────────────────────────────────── */
const US = Cstr('US', 'United States', [
  ['Florida', [
    ['Miami', '33131', 25.7617, -80.1918, ['Brickell', 'Downtown Miami', 'Coconut Grove']],
    ['Orlando', '32801', 28.5383, -81.3792, ['Downtown Orlando', 'Lake Eola', 'Thornton Park']],
    ['Jacksonville', '32256', 30.3322, -81.6557, ['Southside', 'Deerwood', 'Baymeadows']],
    ['Tallahassee', '32301', 30.4383, -84.2807, ['Greater Tallahassee', 'Midtown', 'Betton Hills']],
    ['Tampa', '33602', 27.9506, -82.4572, ['Downtown Tampa', 'Channelside', 'Hyde Park']],
    ['Fort Lauderdale', '33301', 26.1224, -80.1373, ['Las Olas', 'Victoria Park', 'Central Beach']],
    ['St. Petersburg', '33701', 27.7704, -82.6695, ['Downtown St. Pete', 'Old Northeast', 'Snell Isle']],
    ['Gainesville', '32608', 29.6516, -82.3248, ['Hull Road Area', 'Gainesville South', 'Haile Plantation']],
    ['West Palm Beach', '33401', 26.7153, -80.0534, ['Downtown West Palm', 'Northwood', 'South Flagler']],
    ['Daytona Beach', '32114', 29.2108, -81.0228, ['Beachside', 'Main Street', 'Arts District']],
    ['Pensacola', '32502', 30.4213, -87.2169, ['Downtown Pensacola', 'North Hill', 'East Hill']],
    ['Port St. Lucie', '34952', 27.2730, -80.3582, ['Port St. Lucie East', 'Savanna Club']],
    ['Cape Coral', '33904', 26.5629, -81.9495, ['Cape Coral SE', 'Spanish Wells']],
    ['Ocala', '34471', 29.1872, -82.1401, ['Ocala West', 'Saddlewood']],
    ['Naples', '34102', 26.1420, -81.7948, ['Old Naples', 'Aqualane Shores', 'Port Royal']],
  ]],
  ['California', [
    ['Los Angeles', '90001', 34.0522, -118.2437, ['Downtown LA', 'Hollywood', 'Venice']],
    ['San Diego', '92101', 32.7157, -117.1611, ['Downtown San Diego', 'Gaslamp Quarter', 'Balboa Park']],
    ['San Jose', '95113', 37.3382, -121.8863, ['Downtown San Jose', 'North San Jose', 'Rose Garden']],
    ['San Francisco', '94102', 37.7749, -122.4194, ['SoMa', 'Nob Hill', 'Civic Center']],
    ['Fresno', '93721', 36.7378, -119.7871, ['Downtown Fresno', 'Olive & Wishon', 'Radio Park']],
    ['Sacramento', '95814', 38.5816, -121.4944, ['Downtown Sacramento', 'Midtown', 'Alkali Flat']],
    ['Long Beach', '90802', 33.7701, -118.1937, ['Downtown Long Beach', 'East Village', 'Bixby']],
    ['Oakland', '94612', 37.8044, -122.2712, ['Downtown Oakland', 'Uptown', 'Adams Point']],
    ['Bakersfield', '93301', 35.3733, -119.0187, ['Downtown Bakersfield', 'Oildale']],
    ['Anaheim', '92805', 33.8353, -117.9145, ['Anaheim Resort', 'Central Anaheim']],
    ['Riverside', '92501', 33.9533, -117.3961, ['Downtown Riverside', 'Victoria Avenue']],
    ['Stockton', '95202', 37.9577, -121.2908, ['Downtown Stockton', 'Magnolia District']],
    ['San Bernardino', '92401', 34.1083, -117.2898, ['Downtown San Bernardino', 'Arrowhead Farms']],
    ['Modesto', '95354', 37.6391, -120.9969, ['Downtown Modesto', 'La Loma']],
    ['Santa Clarita', '91350', 34.3917, -118.5426, ['Canyon Country', 'Newhall']],
  ]],
  ['Texas', [
    ['Houston', '77002', 29.7604, -95.3698, ['Downtown Houston', 'Midtown', 'The Heights']],
    ['San Antonio', '78205', 29.4241, -98.4936, ['Downtown San Antonio', 'King William', 'The Pearl']],
    ['Dallas', '75201', 32.7767, -96.797, ['Downtown Dallas', 'Uptown', 'Deep Ellum']],
    ['Austin', '78701', 30.2672, -97.7431, ['Downtown Austin', 'East Cesar Chavez', 'Zilker']],
    ['Fort Worth', '76102', 32.7555, -97.3308, ['Downtown Fort Worth', 'Sundance Square']],
    ['El Paso', '79901', 31.7619, -106.485, ['Downtown El Paso', 'Sunset Heights']],
    ['Arlington', '76010', 32.7357, -97.1081, ['Central Arlington', 'South Arlington']],
    ['Corpus Christi', '78401', 27.8006, -97.3964, ['Downtown Corpus Christi', 'Bayfront']],
    ['Plano', '75023', 33.0198, -96.6989, ['West Plano', 'Downtown Plano']],
    ['Lubbock', '79401', 33.5779, -101.8552, ['Downtown Lubbock', 'Depot District']],
    ['Laredo', '78040', 27.5064, -99.5075, ['Downtown Laredo', 'San Agustin']],
    ['Garland', '75040', 32.9126, -96.6389, ['Central Garland', 'Bryan Place']],
    ['Irving', '75060', 32.814, -96.9489, ['Las Colinas', 'Downtown Irving']],
    ['McAllen', '78501', 26.2034, -98.2300, ['Downtown McAllen', 'Archer Park']],
  ]],
  ['New York', [
    ['New York City', '10001', 40.7128, -74.006, ['Manhattan', 'Brooklyn', 'Queens']],
    ['Buffalo', '14202', 42.8864, -78.8784, ['Downtown Buffalo', 'Allentown']],
    ['Rochester', '14604', 43.1566, -77.6088, ['Downtown Rochester', 'Park Avenue']],
    ['Yonkers', '10701', 40.9312, -73.8987, ['Getty Square', 'Getty Lake']],
    ['Syracuse', '13202', 43.0481, -76.1474, ['Downtown Syracuse', 'Armory Square']],
    ['Albany', '12207', 42.6526, -73.7562, ['Downtown Albany', 'Center Square']],
    ['New Rochelle', '10801', 40.9115, -73.7824, ['Downtown New Rochelle', 'Mehudis']],
    ['Mount Vernon', '10550', 40.9126, -73.8371, ['Downtown Mount Vernon', 'Fleetwood']],
  ]],
  ['Illinois', [
    ['Chicago', '60601', 41.8781, -87.6298, ['The Loop', 'River North', 'Lincoln Park']],
    ['Aurora', '60506', 41.7606, -88.3201, ['Downtown Aurora', 'Westside']],
    ['Peoria', '61602', 40.6936, -89.589, ['Downtown Peoria', 'Worcester Heights']],
    ['Springfield', '62704', 39.7817, -89.6501, ['Downtown Springfield', 'Harvard Park']],
    ['Naperville', '60540', 41.7859, -88.1473, ['Downtown Naperville', 'Center Pointe']],
    ['Elgin', '60120', 42.0354, -88.2826, ['Downtown Elgin', 'Eastside']],
  ]],
  ['Arizona', [
    ['Phoenix', '85001', 33.4484, -112.074, ['Downtown Phoenix', 'Encanto', 'Arcadia']],
    ['Tucson', '85701', 32.2226, -110.9747, ['Downtown Tucson', 'Barrio Viejo', 'Sam Hughes']],
    ['Mesa', '85201', 33.4152, -111.8315, ['Downtown Mesa', 'Colonial Ridge']],
    ['Scottsdale', '85251', 33.4942, -111.9261, ['Old Town Scottsdale', 'South Scottsdale']],
    ['Chandler', '85224', 33.3062, -111.8413, ['Downtown Chandler', 'Ocotillo']],
    ['Tempe', '85281', 33.4255, -111.9400, ['Downtown Tempe', 'Mill Avenue']],
    ['Glendale', '85301', 33.5387, -112.186, ['West Glendale', 'Catlin Court']],
  ]],
  ['Pennsylvania', [
    ['Philadelphia', '19103', 39.9526, -75.1652, ['Center City', 'Rittenhouse Square', 'Old City']],
    ['Pittsburgh', '15222', 40.4406, -79.9959, ['Downtown Pittsburgh', 'Strip District', 'North Shore']],
    ['Allentown', '18101', 40.6084, -75.4902, ['Downtown Allentown', 'Old Allentown']],
    ['Erie', '16501', 42.1292, -80.0851, ['Downtown Erie', 'Bayfront']],
    ['Reading', '19601', 40.3356, -75.9269, ['Downtown Reading', 'Cork']],
    ['Scranton', '18503', 41.409, -75.6624, ['Downtown Scranton', 'Hill Section']],
  ]],
  ['Ohio', [
    ['Columbus', '43215', 39.9612, -82.9988, ['Downtown Columbus', 'Short North', 'German Village']],
    ['Cleveland', '44114', 41.5055, -81.6813, ['Downtown Cleveland', 'Ohio City', 'University Circle']],
    ['Cincinnati', '45202', 39.1031, -84.512, ['Downtown Cincinnati', 'Over-the-Rhine']],
    ['Toledo', '43604', 41.6528, -83.537, ['Downtown Toledo', 'Warehouse District']],
    ['Akron', '44308', 41.08, -81.5212, ['Downtown Akron', 'North Hill']],
    ['Dayton', '45402', 39.7589, -84.1916, ['Downtown Dayton', 'Oregon District']],
  ]],
  ['Georgia', [
    ['Atlanta', '30303', 33.749, -84.388, ['Downtown Atlanta', 'Midtown', 'Buckhead']],
    ['Savannah', '31401', 32.0809, -81.0912, ['Historic District', 'Victorian District']],
    ['Augusta', '30901', 33.4709, -81.9748, ['Downtown Augusta', 'Olde Town']],
    ['Columbus', '31901', 32.461, -84.9877, ['Historic Columbus', 'Midtown']],
    ['Athens', '30601', 33.9519, -83.3576, ['Downtown Athens', 'Five Points']],
    ['Macon', '31201', 32.8407, -83.6324, ['Downtown Macon', 'Beall\'s Hill']],
  ]],
  ['North Carolina', [
    ['Charlotte', '28202', 35.2271, -80.8431, ['Uptown Charlotte', 'South End', 'Plaza Midwood']],
    ['Raleigh', '27601', 35.7796, -78.6382, ['Downtown Raleigh', 'Boylan Heights', 'Moore Square']],
    ['Greensboro', '27401', 36.0726, -79.792, ['Downtown Greensboro', 'Fisher Park']],
    ['Durham', '27701', 35.994, -78.8986, ['Downtown Durham', 'Trinity Heights']],
    ['Winston-Salem', '27101', 36.0999, -80.2442, ['Downtown Winston-Salem', 'Old Salem']],
    ['Wilmington', '28401', 34.2257, -77.9447, ['Historic District', 'Brooklyn Arts District']],
  ]],
  ['Michigan', [
    ['Detroit', '48226', 42.3314, -83.0458, ['Downtown Detroit', 'Midtown', 'Corktown']],
    ['Grand Rapids', '49503', 42.9634, -85.6681, ['Downtown Grand Rapids', 'Heritage Hill']],
    ['Warren', '48092', 42.4775, -83.0277, ['Warren East', 'Central Warren']],
    ['Lansing', '48933', 42.7325, -84.5555, ['Downtown Lansing', 'Eastside']],
    ['Ann Arbor', '48104', 42.2808, -83.743, ['Downtown Ann Arbor', 'Kerrytown']],
    ['Flint', '48502', 43.0125, -83.6875, ['Downtown Flint', 'Carriage Town']],
  ]],
  ['Massachusetts', [
    ['Boston', '02108', 42.3601, -71.0589, ['Back Bay', 'Beacon Hill', 'South End']],
    ['Worcester', '01608', 42.2626, -71.8023, ['Downtown Worcester', 'Elm Park']],
    ['Springfield', '01103', 42.1015, -72.5898, ['Downtown Springfield', 'McKnight']],
    ['Cambridge', '02138', 42.3736, -71.1097, ['Harvard Square', 'Central Square']],
    ['Lowell', '01852', 42.6334, -71.3162, ['Downtown Lowell', 'Highlands']],
    ['New Bedford', '02740', 41.6362, -70.9342, ['Downtown New Bedford', 'Tagget']],
  ]],
  ['Virginia', [
    ['Virginia Beach', '23451', 36.8529, -75.978, ['Oceana', 'Beach District']],
    ['Norfolk', '23510', 36.8508, -76.2859, ['Downtown Norfolk', 'Ghent']],
    ['Chesapeake', '23320', 36.7682, -76.2875, ['Greenbrier', 'Western Branch']],
    ['Richmond', '23219', 37.5407, -77.436, ['Downtown Richmond', 'Carytown']],
    ['Arlington', '22201', 38.8799, -77.1069, ['Clarendon', 'Courthouse']],
    ['Alexandria', '22314', 38.8048, -77.0472, ['Old Town Alexandria', 'Del Ray']],
  ]],
  ['Washington', [
    ['Seattle', '98101', 47.6062, -122.3321, ['Downtown Seattle', 'Capitol Hill', 'Ballard']],
    ['Spokane', '99201', 47.6588, -117.426, ['Downtown Spokane', 'Browne\'s Addition']],
    ['Tacoma', '98402', 47.2529, -122.4443, ['Downtown Tacoma', 'North End']],
    ['Vancouver', '98660', 45.6387, -122.6615, ['Downtown Vancouver WA', 'Carter Park']],
    ['Bellevue', '98004', 47.6101, -122.2015, ['Downtown Bellevue', 'Clyde Hill']],
    ['Kent', '98030', 47.3809, -122.2348, ['Kent East', 'Downtown Kent']],
  ]],
  ['Colorado', [
    ['Denver', '80202', 39.7392, -104.9903, ['LoDo', 'Capitol Hill', 'Cherry Creek']],
    ['Colorado Springs', '80903', 38.8339, -104.8214, ['Downtown Colorado Springs', 'Old Colorado City']],
    ['Aurora', '80010', 39.7294, -104.8319, ['Aurora Central', 'Hoffman Heights']],
    ['Fort Collins', '80521', 40.5853, -105.0844, ['Old Town Fort Collins', 'Horsetooth']],
    ['Pueblo', '81003', 38.2544, -104.6091, ['Downtown Pueblo', 'East Side']],
    ['Boulder', '80301', 40.0151, -105.2705, ['Downtown Boulder', 'Mapleton Hill']],
  ]],
  ['Tennessee', [
    ['Nashville', '37201', 36.1627, -86.7816, ['Downtown Nashville', 'Germantown', '12 South']],
    ['Memphis', '38103', 35.1495, -90.049, ['Downtown Memphis', 'Midtown', 'Cooper-Young']],
    ['Knoxville', '37902', 35.9606, -83.9207, ['Downtown Knoxville', 'Old City']],
    ['Chattanooga', '37402', 35.0456, -85.3097, ['Downtown Chattanooga', 'North Shore']],
    ['Clarksville', '37040', 36.5298, -87.3595, ['Downtown Clarksville', 'Ringgold']],
    ['Murfreesboro', '37129', 35.8456, -86.3903, ['North Murfreesboro', 'Downtown']],
  ]],
  ['Missouri', [
    ['Kansas City', '64106', 39.0997, -94.5786, ['Downtown Kansas City', 'Crossroads', 'Westport']],
    ['St. Louis', '63103', 38.627, -90.1994, ['Downtown St. Louis', 'Central West End']],
    ['Springfield', '65806', 37.2153, -93.2982, ['Downtown Springfield', 'Midtown']],
    ['Columbia', '65201', 38.9517, -92.3341, ['Downtown Columbia', 'North Central']],
    ['Independence', '64050', 39.0911, -94.4155, ['Historic Independence', 'Westside']],
  ]],
  ['Maryland', [
    ['Baltimore', '21201', 39.2904, -76.6122, ['Downtown Baltimore', 'Fells Point', 'Federal Hill']],
    ['Columbia', '21044', 39.2037, -76.861, ['Columbia Village', 'Kings Contrivance']],
    ['Silver Spring', '20901', 38.9907, -77.0261, ['Downtown Silver Spring', 'Colesville']],
    ['Frederick', '21701', 39.4143, -77.4105, ['Historic Frederick', 'Junior League']],
    ['Rockville', '20850', 39.084, -77.1525, ['Downtown Rockville', 'King Farm']],
  ]],
  ['Indiana', [
    ['Indianapolis', '46204', 39.7684, -86.1581, ['Downtown Indianapolis', 'Mass Ave', 'Fountain Square']],
    ['Fort Wayne', '46802', 41.0793, -85.1394, ['Downtown Fort Wayne', 'West Central']],
    ['Evansville', '47708', 37.9716, -87.5711, ['Downtown Evansville', 'Haynies Corner']],
    ['South Bend', '46601', 41.6764, -86.252, ['Downtown South Bend', 'Historic District']],
    ['Bloomington', '47401', 39.1653, -86.5264, ['Downtown Bloomington', 'Near West Side']],
  ]],
  ['Wisconsin', [
    ['Milwaukee', '53202', 43.0389, -87.9065, ['East Town', 'Walker\'s Point', 'Bay View']],
    ['Madison', '53703', 43.0731, -89.4012, ['Downtown Madison', 'Mansion Hill', 'Tenney-Lapham']],
    ['Green Bay', '54301', 44.5192, -88.0198, ['Downtown Green Bay', 'Astor']],
    ['Kenosha', '53140', 42.5847, -87.8212, ['Downtown Kenosha', 'Southport']],
  ]],
  ['Oklahoma', [
    ['Oklahoma City', '73102', 35.4676, -97.5164, ['Downtown OKC', 'Bricktown', 'Midtown']],
    ['Tulsa', '74103', 36.154, -95.9928, ['Downtown Tulsa', 'Greenwood', 'Cherry Street']],
    ['Norman', '73069', 35.2226, -97.4395, ['Downtown Norman', 'University District']],
    ['Broken Arrow', '74011', 36.0526, -95.7978, ['Central Broken Arrow', 'Briarwood']],
  ]],
  ['Oregon', [
    ['Portland', '97201', 45.5152, -122.6784, ['Downtown Portland', 'Pearl District', 'Alberta Arts']],
    ['Salem', '97301', 44.9429, -123.0351, ['Downtown Salem', 'Englewood']],
    ['Eugene', '97401', 44.0521, -123.0868, ['Downtown Eugene', 'College Hill']],
    ['Gresham', '97030', 45.4981, -122.4315, ['Gresham Central', 'Rockwood']],
  ]],
  ['Nevada', [
    ['Las Vegas', '89101', 36.1699, -115.1398, ['Downtown Las Vegas', 'Arts District', 'Huntridge']],
    ['Henderson', '89002', 36.0397, -114.9819, ['Henderson East', 'Green Valley']],
    ['Reno', '89501', 39.5296, -119.8138, ['Downtown Reno', 'Midtown']],
    ['North Las Vegas', '89030', 36.1989, -115.1175, ['North Las Vegas Central', 'Marble Manor']],
  ]],
  ['Louisiana', [
    ['New Orleans', '70112', 29.9511, -90.0715, ['French Quarter', 'Garden District', 'Treme']],
    ['Baton Rouge', '70802', 30.4515, -91.1871, ['Downtown Baton Rouge', 'Mid City']],
    ['Shreveport', '71101', 32.5252, -93.7502, ['Downtown Shreveport', 'Stoner Hill']],
    ['Lafayette', '70501', 30.2241, -92.0198, ['Downtown Lafayette', 'Saint Streets']],
  ]],
  ['Kentucky', [
    ['Louisville', '40202', 38.2527, -85.7585, ['Downtown Louisville', 'NuLu', 'Highlands']],
    ['Lexington', '40507', 38.048, -84.5019, ['Downtown Lexington', 'Southside']],
    ['Bowling Green', '42101', 36.9903, -86.4436, ['Downtown Bowling Green', 'College Heights']],
    ['Owensboro', '42301', 37.7719, -87.1112, ['Downtown Owensboro', 'West End']],
  ]],
  ['South Carolina', [
    ['Columbia', '29201', 34.0007, -81.0348, ['Downtown Columbia', 'Shandon', 'Cayce']],
    ['Charleston', '29401', 32.7765, -79.9311, ['Historic Charleston', 'French Quarter']],
    ['Greenville', '29601', 34.8526, -82.394, ['Downtown Greenville', 'West End']],
    ['North Charleston', '29405', 32.8545, -79.9748, ['Park Circle', 'Riverside']],
  ]],
  ['Alabama', [
    ['Birmingham', '35203', 33.5186, -86.8104, ['Downtown Birmingham', 'Avondale', 'Five Points South']],
    ['Montgomery', '36104', 32.3792, -86.3077, ['Downtown Montgomery', 'Cloverdale']],
    ['Mobile', '36602', 30.6954, -88.0399, ['Downtown Mobile', 'Dauphin Street']],
    ['Huntsville', '35801', 34.7304, -86.5861, ['Downtown Huntsville', 'Five Points']],
  ]],
  ['Minnesota', [
    ['Minneapolis', '55401', 44.9778, -93.265, ['Downtown Minneapolis', 'Northeast', 'Uptown']],
    ['St. Paul', '55102', 44.9537, -93.089, ['Downtown St. Paul', 'Summit Hill']],
    ['Rochester', '55901', 44.0121, -92.4802, ['Northwest Rochester', 'Historic District']],
    ['Duluth', '55802', 46.7867, -92.1005, ['Downtown Duluth', 'Lincoln Park']],
  ]],
  ['Iowa', [
    ['Des Moines', '50309', 41.5868, -93.625, ['Downtown Des Moines', 'East Village']],
    ['Cedar Rapids', '52401', 41.9779, -91.6656, ['Downtown Cedar Rapids', 'Wellington Heights']],
    ['Davenport', '52801', 41.5236, -90.5776, ['Downtown Davenport', 'Gold Coast']],
  ]],
  ['Kansas', [
    ['Wichita', '67202', 37.6872, -97.3301, ['Downtown Wichita', 'Delano']],
    ['Overland Park', '66204', 38.9822, -94.6708, ['Old Overland Park', 'Norwood']],
    ['Kansas City', '66101', 39.1142, -94.6275, ['Downtown Kansas City KS', 'Indian Heights']],
  ]],
  ['New Mexico', [
    ['Albuquerque', '87102', 35.0844, -106.6504, ['Downtown Albuquerque', 'Nob Hill', 'Old Town']],
    ['Las Cruces', '88001', 32.3123, -106.7783, ['Downtown Las Cruces', 'University District']],
    ['Santa Fe', '87501', 35.687, -105.9378, ['Railyard District', 'East Side']],
  ]],
  ['Utah', [
    ['Salt Lake City', '84101', 40.7608, -111.891, ['Downtown SLC', 'The Avenues', 'Sugar House']],
    ['Provo', '84601', 40.2338, -111.6585, ['Downtown Provo', 'North Park']],
    ['West Valley City', '84119', 40.6916, -111.9873, ['West Valley Central', 'Wiley Post']],
  ]],
  ['Nebraska', [
    ['Omaha', '68102', 41.2565, -95.9345, ['Downtown Omaha', 'Old Market']],
    ['Lincoln', '68508', 40.8136, -96.7026, ['Downtown Lincoln', 'University Place']],
    ['Bellevue', '68005', 41.1364, -95.8908, ['Olde Towne Bellevue', 'Eastern Hills']],
  ]],
  ['Idaho', [
    ['Boise', '83702', 43.615, -116.2023, ['Downtown Boise', 'North End', 'Hyde Park']],
    ['Meridian', '83642', 43.6121, -116.3915, ['Central Meridian', 'The Parks']],
    ['Nampa', '83651', 43.5407, -116.5635, ['Downtown Nampa', 'Sunrise']],
  ]],
  ['West Virginia', [
    ['Charleston', '25301', 38.3498, -81.6326, ['Downtown Charleston', 'East End']],
    ['Huntington', '25701', 38.4192, -82.4452, ['Downtown Huntington', 'Fairfield']],
  ]],
  ['Hawaii', [
    ['Honolulu', '96813', 21.3069, -157.8583, ['Downtown Honolulu', 'Chinatown', 'Kaimuki']],
    ['Kailua', '96734', 21.4022, -157.7398, ['Kailua Town', 'Kailua Beach']],
  ]],
  ['Alaska', [
    ['Anchorage', '99501', 61.2181, -149.9003, ['Downtown Anchorage', 'Rogers Park']],
    ['Fairbanks', '99701', 64.8378, -147.7164, ['Downtown Fairbanks', 'University']],
  ]],
  ['Maine', [
    ['Portland', '04101', 43.6615, -70.2553, ['Old Port', 'West End']],
    ['Lewiston', '04240', 44.1004, -70.2148, ['Downtown Lewiston', 'New Auburn']],
  ]],
  ['New Hampshire', [
    ['Manchester', '03101', 42.9956, -71.4548, ['Downtown Manchester', 'Rimmon Heights']],
    ['Nashua', '03060', 42.7654, -71.4676, ['Downtown Nashua', 'Tree Streets']],
  ]],
  ['Rhode Island', [
    ['Providence', '02903', 41.824, -71.4128, ['Downcity', 'College Hill', 'Fox Point']],
    ['Warwick', '02886', 41.7001, -71.4162, ['Apponaug', 'Warwick Neck']],
  ]],
  ['Delaware', [
    ['Wilmington', '19801', 39.7447, -75.5484, ['Downtown Wilmington', 'Trolley Square']],
    ['Dover', '19901', 39.1582, -75.5244, ['Downtown Dover', 'Legislative Hall']],
  ]],
  ['Vermont', [
    ['Burlington', '05401', 44.4759, -73.2121, ['Downtown Burlington', 'Old North End']],
    ['Montpelier', '05601', 44.2664, -72.5719, ['Downtown Montpelier', 'Berlin']],
  ]],
  ['Montana', [
    ['Billings', '59101', 45.7833, -108.5007, ['Downtown Billings', 'South Side']],
    ['Missoula', '59801', 46.8721, -113.994, ['Downtown Missoula', 'University District']],
  ]],
  ['North Dakota', [
    ['Fargo', '58102', 46.8772, -96.7898, ['Downtown Fargo', 'Northport']],
    ['Bismarck', '58501', 46.8083, -100.7837, ['Downtown Bismarck', 'North Bismarck']],
  ]],
  ['South Dakota', [
    ['Sioux Falls', '57103', 43.546, -96.7313, ['Downtown Sioux Falls', 'Central Sioux Falls']],
    ['Rapid City', '57701', 44.0805, -103.231, ['Downtown Rapid City', 'West Rapid City']],
  ]],
  ['Wyoming', [
    ['Cheyenne', '82001', 41.14, -104.8202, ['Downtown Cheyenne', 'Lions Park']],
    ['Casper', '82601', 42.8501, -106.3252, ['Downtown Casper', 'Old Yellowstone']],
  ]],
  ['Mississippi', [
    ['Jackson', '39201', 32.2988, -90.1848, ['Downtown Jackson', 'West Capital']],
    ['Gulfport', '39501', 30.3674, -89.0928, ['Downtown Gulfport', 'South Gulfport']],
  ]],
  ['Arkansas', [
    ['Little Rock', '72201', 34.7465, -92.2896, ['Downtown Little Rock', 'Quapaw Quarter']],
    ['Fort Smith', '72901', 35.3859, -94.3985, ['Downtown Fort Smith', 'Creekmore']],
  ]],
  ['Connecticut', [
    ['Hartford', '06103', 41.7637, -72.6851, ['Downtown Hartford', 'Sheldon Charter Oak']],
    ['New Haven', '06510', 41.3083, -72.9279, ['Downtown New Haven', 'Wooster Square']],
    ['Stamford', '06901', 41.0534, -73.5387, ['Downtown Stamford', 'Shippan Point']],
    ['Bridgeport', '06604', 41.1865, -73.1952, ['Downtown Bridgeport', 'Black Rock']],
  ]],
  ['New Jersey', [
    ['Newark', '07102', 40.7357, -74.1724, ['Downtown Newark', 'Ironbound']],
    ['Jersey City', '07302', 40.7282, -74.0776, ['Paulus Hook', 'Van Vorst Park']],
    ['Paterson', '07505', 40.9168, -74.1718, ['Downtown Paterson', 'Eastside']],
    ['Trenton', '08608', 40.2171, -74.7429, ['Downtown Trenton', 'Mill Hill']],
    ['Atlantic City', '08401', 39.3643, -74.4229, ['Marina District', 'Ducktown']],
  ]],
]);

/* ── Canada ─────────────────────────────────────────────────────────────── */
const CA = Cstr('CA', 'Canada', [
  ['Ontario', [
    ['Toronto', 'M5V', 43.6532, -79.3832, ['Downtown Toronto', 'Liberty Village', 'The Annex']],
    ['Ottawa', 'K1P', 45.4215, -75.6972, ['Downtown Ottawa', 'ByWard Market', 'Glebe']],
    ['Mississauga', 'L5B', 43.589, -79.6441, ['City Centre', 'Port Credit']],
    ['Hamilton', 'L8P', 43.2557, -79.8711, ['Downtown Hamilton', 'Westdale']],
    ['London', 'N6A', 42.9849, -81.2453, ['Central London', 'Old North']],
    ['Windsor', 'N9A', 42.3149, -83.0364, ['Downtown Windsor', 'Walkerville']],
    ['Kitchener', 'N2G', 43.4516, -80.4925, ['Downtown Kitchener', 'Victoria Hills']],
    ['Thunder Bay', 'P7A', 48.3822, -89.2461, ['Northwood', 'Current River']],
    ['Sudbury', 'P3A', 46.4989, -81.0134, ['South End', 'Minnow Lake']],
    ['Barrie', 'L4N', 44.3894, -79.6903, ['Downtown Barrie', 'Painswick']],
    ['Kingston', 'K7K', 44.2312, -76.486, ['Downtown Kingston', 'Sydenham']],
    ['Guelph', 'N1H', 43.5448, -80.2482, ['Historic Guelph', 'Kortright Hills']],
  ]],
  ['Quebec', [
    ['Montreal', 'H3Z', 45.5017, -73.5673, ['Downtown Montreal', 'Plateau', 'Old Montreal']],
    ['Quebec City', 'G1R', 46.8139, -71.208, ['Old Quebec', 'Sainte-Roy']],
    ['Laval', 'H7W', 45.57, -73.7229, ['Laval des Rapides', 'Sainte-Rose']],
    ['Gatineau', 'J8T', 45.4562, -75.7208, ['Vieux-Gatineau', 'Hull']],
    ['Sherbrooke', 'J1H', 45.4034, -71.8875, ['Nordre', 'Jacques-Cartier']],
    ['Saguenay', 'G7N', 48.4235, -71.0655, ['Chicoutimi', 'Jonquiere']],
  ]],
  ['British Columbia', [
    ['Vancouver', 'V6Z', 49.2827, -123.1207, ['Downtown Vancouver', 'Kitsilano', 'Gastown']],
    ['Victoria', 'V8V', 48.4284, -123.3656, ['Downtown Victoria', 'James Bay']],
    ['Surrey', 'V3X', 49.1044, -122.8251, ['Cloverdale', 'Newton']],
    ['Burnaby', 'V5B', 49.2668, -122.9708, ['Metrotown', 'Lougheed']],
    ['Kelowna', 'V1W', 49.8876, -119.496, ['Downtown Kelowna', 'Mission']],
    ['Abbotsford', 'V2T', 49.0504, -122.3045, ['Central Abbotsford', 'Clearbrook']],
  ]],
  ['Alberta', [
    ['Calgary', 'T2P', 51.0447, -114.0719, ['Downtown Calgary', 'Beltline', 'Kensington']],
    ['Edmonton', 'T5J', 53.5461, -113.4938, ['Downtown Edmonton', 'Garneau', 'Old Strathcona']],
    ['Red Deer', 'T4N', 52.2681, -113.8112, ['Downtown Red Deer', 'Normandeau']],
    ['Lethbridge', 'T1J', 49.6935, -112.8418, ['North Lethbridge', 'London Road']],
    ['Medicine Hat', 'T1A', 50.0403, -110.6763, ['Riverside', 'Southeast']],
  ]],
  ['Manitoba', [
    ['Winnipeg', 'R3B', 49.8951, -97.1384, ['Downtown Winnipeg', 'Exchange District', 'St. Boniface']],
    ['Brandon', 'R7A', 49.8469, -99.953, ['Downtown Brandon', 'East End']],
  ]],
  ['Saskatchewan', [
    ['Saskatoon', 'S7K', 52.1332, -106.67, ['Downtown Saskatoon', 'Nutana']],
    ['Regina', 'S4P', 50.4452, -104.6189, ['Downtown Regina', 'Cathedral']],
  ]],
  ['Nova Scotia', [
    ['Halifax', 'B3J', 44.6488, -63.5752, ['Downtown Halifax', 'North End']],
    ['Sydney', 'B1P', 46.1389, -60.1941, ['Sydney River', 'Westmount']],
  ]],
  ['New Brunswick', [
    ['Moncton', 'E1C', 46.0878, -64.7782, ['Downtown Moncton', 'Lewisville']],
    ['Fredericton', 'E3B', 45.9636, -66.6431, ['Downtown Fredericton', 'Lincoln']],
    ['Saint John', 'E2K', 45.2733, -66.0633, ['Uptown Saint John', 'South End']],
  ]],
  ['Newfoundland and Labrador', [['St. John\'s', 'A1C', 47.5615, -52.7126, ['Downtown', 'Catherine']]]],
  ['Prince Edward Island', [['Charlottetown', 'C1A', 46.2382, -63.1311, ['Downtown Charlottetown', 'Brighton']]]],
]);

/* ── United Kingdom ─────────────────────────────────────────────────────── */
const GB = Cstr('GB', 'United Kingdom', [
  ['England', [
    ['London', 'SW1A', 51.5074, -0.1278, ['Westminster', 'Canary Wharf', 'Islington']],
    ['Manchester', 'M1', 53.4808, -2.2426, ['City Centre', 'Salford Quays']],
    ['Birmingham', 'B1', 52.4862, -1.8904, ['City Centre', 'Jewellery Quarter']],
    ['Liverpool', 'L1', 53.4084, -2.9916, ['City Centre', 'Albert Dock']],
    ['Leeds', 'LS1', 53.8008, -1.5491, ['City Centre', 'Headingley']],
    ['Sheffield', 'S1', 53.3811, -1.4701, ['City Centre', 'Ecclesall Road']],
    ['Bristol', 'BS1', 51.4545, -2.5879, ['City Centre', 'Clifton']],
    ['Newcastle upon Tyne', 'NE1', 54.9783, -1.6178, ['City Centre', 'Quayside']],
    ['Nottingham', 'NG1', 52.9548, -1.1581, ['City Centre', 'West Bridgford']],
    ['Leicester', 'LE1', 52.6369, -1.1398, ['City Centre', 'Stoneygate']],
    ['Portsmouth', 'PO1', 50.8198, -1.088, ['City Centre', 'Southsea']],
    ['Southampton', 'SO14', 50.9097, -1.4044, ['City Centre', 'Ocean Village']],
    ['Reading', 'RG1', 51.4543, -0.9781, ['Town Centre', 'Caversham']],
    ['Oxford', 'OX1', 51.752, -1.2577, ['City Centre', 'Jericho']],
    ['Cambridge', 'CB2', 52.2053, 0.1218, ['City Centre', 'Mill Road']],
    ['Brighton', 'BN1', 50.8225, -0.1372, ['City Centre', 'North Laine']],
    ['Norwich', 'NR1', 52.6309, 1.2974, ['City Centre', 'Golden Triangle']],
    ['Plymouth', 'PL1', 50.3715, -4.1423, ['City Centre', 'Derry\'s Cross']],
    ['Kingston upon Hull', 'HU1', 53.7433, -0.3454, ['City Centre', 'The Avenues']],
    ['York', 'YO1', 53.959, -1.0815, ['City Centre', 'Bishophill']],
    ['Bournemouth', 'BH1', 50.7192, -1.8808, ['Town Centre', 'Boscombe']],
    ['Derby', 'DE1', 52.9225, -1.4746, ['City Centre', 'Little Eaton']],
    ['Coventry', 'CV1', 52.4068, -1.5197, ['City Centre', 'Earlsdon']],
    ['Sunderland', 'SR1', 54.9069, -1.383, ['City Centre', 'Ashbrooke']],
    ['Luton', 'LU1', 51.8787, -0.42, ['Town Centre', 'Stopsley']],
  ]],
  ['Scotland', [
    ['Glasgow', 'G1', 55.8642, -4.2518, ['City Centre', 'West End', 'Merchant City']],
    ['Edinburgh', 'EH1', 55.9533, -3.1883, ['Old Town', 'New Town', 'Leith']],
    ['Aberdeen', 'AB10', 57.1497, -2.0943, ['City Centre', 'West End']],
    ['Dundee', 'DD1', 56.462, -2.9707, ['City Centre', 'West End']],
    ['Inverness', 'IV1', 57.4778, -4.2247, ['City Centre', 'Ballifeary']],
    ['Stirling', 'FK8', 56.1165, -3.9369, ['City Centre', 'King\'s Park']],
  ]],
  ['Wales', [
    ['Cardiff', 'CF10', 51.4816, -3.1791, ['City Centre', 'Pontcanna']],
    ['Swansea', 'SA1', 51.6214, -3.9436, ['City Centre', 'Uplands']],
    ['Newport', 'NP19', 51.5844, -2.9984, ['City Centre', 'Caerleon']],
    ['Wrexham', 'LL11', 53.043, -3.0083, ['Town Centre', 'Rhosddu']],
  ]],
  ['Northern Ireland', [
    ['Belfast', 'BT1', 54.5973, -5.9301, ['City Centre', 'Cathedral Quarter']],
    ['Derry', 'BT48', 54.9913, -7.3253, ['Cityside', 'Waterside']],
    ['Newry', 'BT34', 54.1751, -6.3395, ['Town Centre', 'Daisy Hill']],
  ]],
]);

/* ── Australia ──────────────────────────────────────────────────────────── */
const AU = Cstr('AU', 'Australia', [
  ['New South Wales', [
    ['Sydney', '2000', -33.8688, 151.2093, ['CBD', 'Surry Hills', 'Parramatta']],
    ['Newcastle', '2300', -32.9283, 151.7817, ['City Centre', 'Merewether']],
    ['Wollongong', '2500', -34.4278, 150.8931, ['Wollongong CBD', 'Figtree']],
    ['Paramatta', '2150', -33.8152, 151.0014, ['Parramatta CBD', 'Harris Park']],
    ['Central Coast', '2250', -33.4283, 151.3433, ['Gosford', 'Erina']],
  ]],
  ['Victoria', [
    ['Melbourne', '3000', -37.8136, 144.9631, ['CBD', 'Fitzroy', 'St Kilda']],
    ['Geelong', '3220', -38.1499, 144.3617, ['Geelong Central', 'Newtown']],
    ['Ballarat', '3350', -37.5622, 143.8503, ['Ballarat Central', 'Wendouree']],
    ['Bendigo', '3550', -36.757, 144.2796, ['Bendigo Central', 'Golden Square']],
  ]],
  ['Queensland', [
    ['Brisbane', '4000', -27.4698, 153.0251, ['CBD', 'South Bank', 'Fortitude Valley']],
    ['Gold Coast', '4217', -28.0167, 153.4, ['Surfers Paradise', 'Southport']],
    ['Townsville', '4810', -19.259, 146.8169, ['Townsville City', 'South Townsville']],
    ['Cairns', '4870', -16.9186, 145.7781, ['Cairns City', 'Edge Hill']],
    ['Sunshine Coast', '4558', -26.65, 153.0667, ['Maroochydore', 'Noosa']],
  ]],
  ['South Australia', [
    ['Adelaide', '5000', -34.9285, 138.6007, ['CBD', 'North Adelaide', 'Glenelg']],
    ['Mount Gambier', '5290', -37.8314, 140.7641, ['Mount Gambier Central', 'West Gambier']],
  ]],
  ['Western Australia', [
    ['Perth', '6000', -31.9505, 115.8605, ['CBD', 'Northbridge', 'Fremantle']],
    ['Bunbury', '6230', -33.3271, 115.6414, ['Bunbury Central', 'Carey Park']],
  ]],
  ['Tasmania', [
    ['Hobart', '7000', -42.8821, 147.3272, ['Hobart CBD', 'Sandy Bay']],
    ['Launceston', '7250', -41.439, 147.136, ['Launceston CBD', 'West Launceston']],
  ]],
  ['Australian Capital Territory', [['Canberra', '2601', -35.2809, 149.13, ['City', 'Belconnen', 'Woden']]]],
  ['Northern Territory', [
    ['Darwin', '0800', -12.4634, 130.8456, ['Darwin CBD', 'Parap']],
    ['Alice Springs', '0870', -23.698, 133.8807, ['Alice Springs Central', 'Gillen']],
  ]],
]);

/* ── Rest of World — every other non-African country ───────────────────── */
/* Cities shown are the actual national/major city with real coordinates.
 * Postal codes are only given where the country uses a real, well-known
 * code format. zip:'' means the country has no widely standardised postal
 * code — the publisher simply omits it (never invents one). */

const WORLD = [
  one('NZ', 'New Zealand', [
    ['Auckland', '1010', -36.8485, 174.7633, ['Auckland CBD', 'Ponsonby', 'New Lynn']],
    ['Wellington', '6011', -41.2865, 174.7762, ['Wellington CBD', 'Karori']],
    ['Christchurch', '8011', -43.5321, 172.6362, ['Christchurch Central', 'Riccarton']],
    ['Hamilton', '3204', -37.787, 175.2793, ['Hamilton Central', 'Flagstaff']],
    ['Tauranga', '3110', -37.6878, 176.1651, ['Tauranga Central', 'Mount Maunganui']],
  ]),
  one('JP', 'Japan', [
    ['Tokyo', '100-0006', 35.6762, 139.6503, ['Chiyoda', 'Shinjuku', 'Shibuya']],
    ['Osaka', '530-0001', 34.6937, 135.5023, ['Kita', 'Namba', 'Umeda']],
    ['Nagoya', '450-0002', 35.1815, 136.9066, ['Nakamura', 'Naka']],
    ['Sapporo', '060-0001', 43.0621, 141.3544, ['Chuo', 'Kita']],
    ['Fukuoka', '810-0001', 33.5904, 130.3997, ['Chuo', 'Hakata']],
    ['Yokohama', '220-0011', 35.4437, 139.638, ['Nishi', 'Naka']],
    ['Kobe', '650-0011', 34.6937, 135.1955, ['Chuo', 'Nada']],
    ['Kyoto', '600-8216', 35.0116, 135.7681, ['Shimogyo', 'Nakagyo']],
    ['Hiroshima', '730-0011', 34.3853, 132.4553, ['Naka', 'Minami']],
    ['Sendai', '980-0011', 38.2682, 140.8694, ['Aoba', 'Miyagino']],
  ]),
  one('KR', 'South Korea', [
    ['Seoul', '04524', 37.5665, 126.978, ['Jongno', 'Gangnam', 'Yongsan']],
    ['Busan', '48058', 35.1796, 129.0756, ['Haeundae', 'Seomyeon']],
    ['Incheon', '22102', 37.4563, 126.7052, ['Yeonsu', 'Namdong']],
    ['Daegu', '42415', 35.8714, 128.6014, ['Jung', 'Suseong']],
    ['Daejeon', '35242', 36.3504, 127.3845, ['Yuseong', 'Seo']],
    ['Gwangju', '61400', 35.1595, 126.8526, ['Buk', 'Nam']],
    ['Ulsan', '44534', 35.5384, 129.3114, ['Jung', 'Nam']],
  ]),
  one('CN', 'China', [
    ['Beijing', '100000', 39.9042, 116.4074, ['Chaoyang', 'Haidian', 'Dongcheng']],
    ['Shanghai', '200000', 31.2304, 121.4737, ['Pudong', 'Huangpu', 'Xuhui']],
    ['Guangzhou', '510000', 23.1291, 113.2644, ['Tianhe', 'Yuexiu']],
    ['Shenzhen', '518000', 22.5431, 114.0579, ['Nanshan', 'Futian']],
    ['Chengdu', '610000', 30.5728, 104.0668, ['Jinniu', 'Wuhou']],
    ['Hangzhou', '310000', 30.2741, 120.1551, ['Xihu', 'Shangcheng']],
    ['Wuhan', '430000', 30.5928, 114.3055, ['Wuchang', 'Hankou']],
    ['Nanjing', '210000', 32.0603, 118.7969, ['Gulou', 'Xuanwu']],
    ['Chongqing', '400000', 29.563, 106.5516, ['Yuzhong', 'Jiangbei']],
    ["Xi'an", '710000', 34.3416, 108.9398, ['Beilin', 'Yanta']],
  ]),
  one('SG', 'Singapore', [
    ['Singapore', '018956', 1.3521, 103.8198, ['Downtown Core', 'Marina Bay', 'Orchard', 'Tampines']],
  ]),
  one('IN', 'India', [
    ['Delhi', '110001', 28.6139, 77.209, ['New Delhi', 'Connaught Place', 'Dwarka']],
    ['Mumbai', '400001', 19.076, 72.8777, ['South Mumbai', 'Bandra', 'Andheri']],
    ['Bengaluru', '560001', 12.9716, 77.5946, ['Koramangala', 'Indiranagar', 'Whitefield']],
    ['Hyderabad', '500001', 17.385, 78.4867, ['Banjara Hills', 'Gachibowli']],
    ['Chennai', '600001', 13.0827, 80.2707, ['T Nagar', 'Adyar']],
    ['Kolkata', '700001', 22.5726, 88.3639, ['Central Kolkata', 'Salt Lake']],
    ['Pune', '411001', 18.5204, 73.8567, ['Kothrud', 'Viman Nagar']],
    ['Ahmedabad', '380001', 23.0225, 72.5714, ['Navrangpura', 'Satellite']],
    ['Jaipur', '302001', 26.9124, 75.7873, ['Civil Lines', 'Malviya Nagar']],
    ['Chandigarh', '160001', 30.7333, 76.7794, ['Sector 17', 'Sector 22']],
  ]),
  one('ID', 'Indonesia', [
    ['Jakarta', '10110', -6.2088, 106.8456, ['Central Jakarta', 'South Jakarta']],
    ['Surabaya', '60271', -7.2575, 112.7521, ['Surabaya Central', 'Wonokromo']],
    ['Bandung', '40111', -6.9175, 107.6191, ['Bandung Central', 'Cihampelas']],
    ['Medan', '20111', 3.5952, 98.6722, ['Medan Central', 'Polonia']],
    ['Denpasar', '80234', -8.6705, 115.2126, ['Denpasar Barat', 'Renon']],
    ['Makassar', '90111', -5.1477, 119.4327, ['Makassar Central', 'Panakkukang']],
  ]),
  one('TH', 'Thailand', [
    ['Bangkok', '10110', 13.7563, 100.5018, ['Sukhumvit', 'Chatuchak', 'Sathorn']],
    ['Chiang Mai', '50200', 18.7883, 98.9853, ['City Centre', 'Nimman']],
    ['Phuket', '83000', 7.8804, 98.3923, ['Phuket Town', 'Patong']],
    ['Pattaya', '20150', 12.9236, 100.8825, ['Pattaya North', 'Jomtien']],
    ['Khon Kaen', '40000', 16.4383, 102.8326, ['Khon Kaen City', 'Bueng Kaen Nakhon']],
  ]),
  one('VN', 'Vietnam', [
    ['Hanoi', '100000', 21.0278, 105.8342, ['Hoan Kiem', 'Ba Dinh']],
    ['Ho Chi Minh City', '700000', 10.8231, 106.6297, ['District 1', 'District 3', 'Binh Thanh']],
    ['Da Nang', '550000', 16.0544, 108.2022, ['Hai Chau', 'Son Tra']],
    ['Hai Phong', '180000', 20.8449, 106.6881, ['Hong Bang', 'Ngo Quyen']],
    ['Can Tho', '900000', 10.0331, 105.7882, ['Ninh Kieu', 'Cai Rang']],
  ]),
  one('PH', 'Philippines', [
    ['Manila', '1000', 14.5995, 120.9842, ['Ermita', 'Malate']],
    ['Quezon City', '1100', 14.676, 121.0437, ['Cubao', 'Eastwood']],
    ['Cebu City', '6000', 10.3157, 123.8854, ['Cebu Business Park', 'Mabolo']],
    ['Davao City', '8000', 7.1907, 125.4553, ['Downtown Davao', 'Ecoland']],
    ['Makati', '1200', 14.5547, 121.0244, ['Makati CBD', 'Poblacion']],
  ]),
  one('MY', 'Malaysia', [
    ['Kuala Lumpur', '50000', 3.139, 101.6869, ['KLCC', 'Bukit Bintang', 'Mont Kiara']],
    ['George Town', '10460', 5.4141, 100.3288, ['George Town UNESCO', 'Tanjung Tokong']],
    ['Johor Bahru', '80000', 1.4927, 103.7414, ['JB City Centre', 'Iskandar Puteri']],
    ['Ipoh', '30000', 4.5975, 101.0901, ['Ipoh Old Town', 'Klebang']],
    ['Kuching', '93000', 1.5535, 110.3593, ['Kuching City Centre', 'Satok']],
  ]),
  one('MX', 'Mexico', [
    ['Mexico City', '06000', 19.4326, -99.1332, ['Centro Histórico', 'Polanco', 'Condesa']],
    ['Guadalajara', '44100', 20.6597, -103.3496, ['Zapopan', 'Centro']],
    ['Monterrey', '64000', 25.6866, -100.3161, ['San Pedro Garza Garcia', 'Centro']],
    ['Cancún', '77500', 21.1619, -86.8515, ['Hotel Zone', 'Downtown Cancún']],
    ['Puebla', '72000', 19.0414, -98.2063, ['Centro', 'Angelópolis']],
    ['Tijuana', '22000', 32.5149, -117.0382, ['Zona Río', 'Centro']],
    ['Mérida', '97000', 20.9674, -89.5926, ['Centro', 'Montecristo']],
    ['Querétaro', '76000', 20.5888, -100.3899, ['Centro', 'Zibatá']],
  ]),
  one('BR', 'Brazil', [
    ['São Paulo', '01000-000', -23.5505, -46.6333, ['Paulista', 'Moema', 'Pinheiros']],
    ['Rio de Janeiro', '20040-002', -22.9068, -43.1729, ['Leblon', 'Copacabana', 'Barra da Tijuca']],
    ['Brasília', '70000-000', -15.8267, -47.9218, ['Plano Piloto', 'Asa Sul']],
    ['Salvador', '40020-050', -12.9777, -38.5016, ['Barra', 'Cidade Alta']],
    ['Fortaleza', '60020-000', -3.7319, -38.5267, ['Aldeota', 'Meireles']],
    ['Belo Horizonte', '30110-008', -19.9245, -43.9352, ['Savassi', 'Lourdes']],
    ['Porto Alegre', '90010-110', -30.0331, -51.2304, ['Moinhos de Vento', 'Cidade Baixa']],
    ['Recife', '50030-010', -8.0476, -34.877, ['Boa Viagem', 'Recife Antigo']],
    ['Curitiba', '80020-000', -25.4284, -49.2733, ['Batel', 'Centro Cívico']],
    ['Manaus', '69005-008', -3.119, -60.0217, ['Centro', 'Adrianópolis']],
  ]),
  one('AR', 'Argentina', [
    ['Buenos Aires', '1001', -34.6037, -58.3816, ['Palermo', 'Recoleta', 'San Telmo']],
    ['Córdoba', '5000', -31.4201, -64.1888, ['Nueva Córdoba', 'Centro']],
    ['Rosario', '2000', -32.9468, -60.6393, ['Centro', 'Pichincha']],
    ['Mendoza', '5500', -32.8895, -68.8458, ['Ciudad de Mendoza', 'Chacras de Coria']],
    ['La Plata', '1900', -34.9214, -57.955, ['Casco Urbano', 'Tolosa']],
  ]),
  one('CL', 'Chile', [
    ['Santiago', '8320000', -33.4489, -70.6693, ['Providencia', 'Las Condes', 'Vitacura']],
    ['Valparaíso', '2340000', -33.0472, -71.6127, ['Valparaíso Centro', 'Cerro Alegre']],
    ['Concepción', '4030000', -36.8201, -73.0444, ['Concepción Centro', 'Las Tres Pascualas']],
    ['Antofagasta', '1240000', -23.6509, -70.3975, ['Antofagasta Centro', 'Barrio Histórico']],
  ]),
  one('CO', 'Colombia', [
    ['Bogotá', '110111', 4.711, -74.0721, ['Chapinero', 'Usaquén', 'Santa Fe']],
    ['Medellín', '050015', 6.2442, -75.5812, ['El Poblado', 'Laureles']],
    ['Cali', '760001', 3.4516, -76.532, ['San Fernando', 'Granada']],
    ['Cartagena', '130000', 10.391, -75.4794, ['Bocagrande', 'Centro Histórico']],
    ['Barranquilla', '080001', 10.9685, -74.7813, ['El Prado', 'Norte']],
    ['Bucaramanga', '680001', 7.1193, -73.1227, ['Cabecera', 'Ciudadela Real de Minas']],
  ]),
  one('PE', 'Peru', [
    ['Lima', '15000', -12.0464, -77.0428, ['Miraflores', 'San Isidro', 'Barranco']],
    ['Cusco', '08000', -13.5319, -71.9675, ['Centro Histórico', 'San Blas']],
    ['Arequipa', '04000', -16.409, -71.5375, ['Centro Histórico', 'Yanahuara']],
    ['Trujillo', '13001', -8.1091, -79.0215, ['Centro Histórico', 'California']],
  ]),
  one('EC', 'Ecuador', [
    ['Quito', '170150', -0.1807, -78.4678, ['La Mariscal', 'Carapungo']],
    ['Guayaquil', '090101', -2.1763, -79.8891, ['Centro', 'Urdesa']],
    ['Cuenca', '010101', -2.8952, -79.0066, ['El Centro', 'El Vergel']],
  ]),
  one('VE', 'Venezuela', [
    ['Caracas', '1010', 10.4806, -66.9036, ['Chacao', 'Miranda']],
    ['Maracaibo', '4001', 10.6805, -71.6134, ['Centro', 'Belloso']],
  ]),
  one('BO', 'Bolivia', [
    ['La Paz', '', -16.4897, -68.1193, ['Central', 'Sur']],
    ['Santa Cruz de la Sierra', '', -17.7833, -63.1821, ['Equipetrol', 'Centro']],
    ['Cochabamba', '', -17.3895, -66.1568, ['Central', 'Calacala']],
  ]),
  one('PY', 'Paraguay', [
    ['Asunción', '1001', -25.2637, -57.5759, ['Central', 'La Encarnación']],
  ]),
  one('UY', 'Uruguay', [
    ['Montevideo', '11100', -34.9011, -56.1645, ['Ciudad Vieja', 'Pocitos', 'Carrasco']],
    ['Punta del Este', '20100', -34.9479, -54.9330, ['La Barra', 'Centro']],
  ]),
  one('GY', 'Guyana', [['Georgetown', '', 6.8013, -58.1551, ['Georgetown Central', 'Kitty']]]),
  one('SR', 'Suriname', [['Paramaribo', '', 5.852, -55.2038, ['Paramaribo Centrum', 'Rainville']]]),
  one('AE', 'United Arab Emirates', [
    ['Dubai', '', 25.2048, 55.2708, ['Downtown Dubai', 'Marina', 'Jumeirah']],
    ['Abu Dhabi', '', 24.4539, 54.3773, ['Corniche', 'Al Reem Island']],
    ['Sharjah', '', 25.3463, 55.4209, ['Al Majaz', 'Rolla']],
    ['Ajman', '', 25.4052, 55.4443, ['Ajman Corniche', 'Al Nuaimiya']],
    ['Ras Al Khaimah', '', 25.8007, 55.9762, ['Al Marjan Island', 'Ras Al Khaimah City']],
  ]),
  one('SA', 'Saudi Arabia', [
    ['Riyadh', '12211', 24.7136, 46.6753, ['Olaya', 'Al Malqa', 'Al Nakheel']],
    ['Jeddah', '21577', 21.4858, 39.1925, ['Al Shati', 'Al Balad']],
    ['Mecca', '24231', 21.3891, 39.8579, ['Ajyad', 'Al Aziziyah']],
    ['Dammam', '31432', 26.4207, 50.0888, ['Al Faisaliyah', 'Corniche']],
    ['Medina', '42311', 24.5244, 39.5692, ['Central Medina', 'Al Haram']],
  ]),
  one('QA', 'Qatar', [
    ['Doha', '', 25.2854, 51.531, ['West Bay', 'The Pearl', 'Msheireb']],
    ['Al Rayyan', '', 25.2919, 51.4244, ['Al Rayyan North', 'Al Wajba']],
  ]),
  one('KW', 'Kuwait', [['Kuwait City', '', 29.3759, 47.9774, ['Sharq', 'Salmiya', 'Hawalli']]]),
  one('BH', 'Bahrain', [['Manama', '', 26.2285, 50.586, ['Seef', 'Juffair', 'Hidd']]]),
  one('OM', 'Oman', [
    ['Muscat', '', 23.588, 58.3829, ['Al Khuwair', 'Al Qurum', 'Seeb']],
    ['Salalah', '', 17.0151, 54.0924, ['Salalah Central', 'Al Saadah']],
  ]),
  one('TR', 'Turkey', [
    ['Istanbul', '34000', 41.0082, 28.9784, ['Kadıköy', 'Beşiktaş', 'Şişli']],
    ['Ankara', '06060', 39.9334, 32.8597, ['Çankaya', 'Kızılay']],
    ['İzmir', '35000', 38.4237, 27.1428, ['Konak', 'Bornova']],
    ['Antalya', '07050', 36.8969, 30.7133, ['Muratpaşa', 'Konyaaltı']],
    ['Bursa', '16000', 40.1826, 29.067, ['Osmangazi', 'Nilüfer']],
    ['Gaziantep', '27000', 37.0662, 37.3833, ['Şahinbey', 'Şehitkamil']],
  ]),
  one('IL', 'Israel', [
    ['Jerusalem', '91000', 31.7683, 35.2137, ['Rehavia', 'German Colony']],
    ['Tel Aviv', '62000', 32.0853, 34.7818, ['Ramat Aviv', 'Florentin']],
    ['Haifa', '31000', 32.794, 34.9896, ['Carmel', 'Neve Sha\'anan']],
    ['Netanya', '42100', 32.3215, 34.8532, ['Netanya Center', 'Irus']],
  ]),
  one('LB', 'Lebanon', [['Beirut', '', 33.8938, 35.5018, ['Achrafieh', 'Hamra', 'Gemmayzeh']]]),
  one('JO', 'Jordan', [
    ['Amman', '11110', 31.9454, 35.9284, ['Abdoun', 'Sweifieh', 'Jabal Amman']],
    ['Aqaba', '77110', 29.532, 35.0066, ['Aqaba City', 'South Beach']],
  ]),
  one('IQ', 'Iraq', [
    ['Baghdad', '10001', 33.3152, 44.3661, ['Karrada', 'Al Mansour', 'Zayouna']],
  ]),
  one('IR', 'Iran', [
    ['Tehran', '11369', 35.6892, 51.389, ['District 3', 'Saadat Abad', 'Tajrish']],
    ['Shiraz', '71348', 29.5918, 52.5837, ['Zand', 'Eram']],
    ['Isfahan', '81464', 32.6546, 51.668, ['Chaharbagh', 'Bozorgmehr']],
  ]),
  one('PK', 'Pakistan', [
    ['Islamabad', '44000', 33.6844, 73.0479, ['F-7', 'DHA Islamabad']],
    ['Karachi', '74000', 24.8607, 67.0011, ['Clifton', 'Defence', 'Gulshan-e-Iqbal']],
    ['Lahore', '54000', 31.5497, 74.3436, ['DHA Lahore', 'Gulberg', 'Model Town']],
    ['Faisalabad', '38000', 31.4504, 73.135, ['Peoples Colony', 'D Ground']],
  ]),
  one('AF', 'Afghanistan', [['Kabul', '1001', 34.5553, 69.2075, ['Wazir Akbar Khan', 'Shahr-e-Naw']]]),
  one('BD', 'Bangladesh', [
    ['Dhaka', '1000', 23.8103, 90.4125, ['Gulshan', 'Banani', 'Dhanmondi']],
    ['Chattogram', '4000', 22.3569, 91.7832, ['GEC Circle', 'Nasirabad']],
  ]),
  one('LK', 'Sri Lanka', [
    ['Colombo', '00300', 6.9271, 79.8612, ['Cinnamon Gardens', 'Bambalapitiya']],
  ]),
  one('NP', 'Nepal', [['Kathmandu', '44600', 27.7172, 85.324, ['Baluwatar', 'Lazimpat']]]),
  one('MM', 'Myanmar', [['Yangon', '11000', 16.8409, 96.1735, ['Bahan', 'Dagon']]]),
  one('KH', 'Cambodia', [['Phnom Penh', '12101', 11.5564, 104.9282, ['BKK1', 'Daun Penh', 'Tuol Kork']]]),
  one('LA', 'Laos', [['Vientiane', '01000', 17.9757, 102.6331, ['Chanthabury', 'Sisattanak']]]),
  one('BN', 'Brunei', [['Bandar Seri Begawan', 'BA1510', 4.9031, 114.9398, ['Kianggeh', 'Gadong']]]),
  one('TL', 'Timor-Leste', [['Dili', '', -8.5586, 125.5736, ['Vera Cruz', 'Dom Aleixo']]]),
  one('TW', 'Taiwan', [
    ['Taipei', '100', 25.033, 121.5654, ['Xinyi', 'Da\'an', 'Songshan']],
    ['Kaohsiung', '800', 22.6273, 120.3014, ['Zuoying', 'Lingya']],
    ['Taichung', '400', 24.1477, 120.6736, ['Xitun', 'West District']],
    ['Tainan', '700', 22.9997, 120.227, ['Anping', 'East District']],
  ]),
  one('HK', 'Hong Kong', [
    ['Hong Kong', '', 22.3193, 114.1694, ['Central', 'Kowloon', 'Tseung Kwan O']],
  ]),
  one('MO', 'Macau', [['Macau', '', 22.1987, 113.5439, ['Macau Peninsula', 'Taipa']]]),
  one('MN', 'Mongolia', [['Ulaanbaatar', '14210', 47.8864, 106.9057, ['Sukhbaatar', 'Bayanurkh']]]),
  one('KZ', 'Kazakhstan', [
    ['Almaty', '050000', 43.222, 76.8512, ['Almaly', 'Bostandyk']],
    ['Astana', '010000', 51.1605, 71.4704, ['Esil District', 'Saryarka']],
  ]),
  one('UZ', 'Uzbekistan', [
    ['Tashkent', '100000', 41.2995, 69.2401, ['Mirabad', 'Yunusabad']],
    ['Samarkand', '140100', 39.627, 66.975, ['Samarkand Central', 'Siab']],
  ]),
  one('KG', 'Kyrgyzstan', [['Bishkek', '720000', 42.8746, 74.5698, ['Sverdlov', 'Pervomaysky']]]),
  one('TJ', 'Tajikistan', [['Dushanbe', '734000', 38.5598, 68.787, ['Shohmansur', 'Firuz']]]),
  one('TM', 'Turkmenistan', [['Ashgabat', '744000', 37.9601, 58.3261, ['Chandybil', 'Berkararlik']]]),
  one('AZ', 'Azerbaijan', [['Baku', '1000', 40.4093, 49.8671, ['Nasimi', 'Yasamal']]]),
  one('GE', 'Georgia', [['Tbilisi', '0100', 41.7151, 44.8271, ['Vake', 'Saburtalo']]]),
  one('AM', 'Armenia', [['Yerevan', '0001', 40.1792, 44.4991, ['Kentron', 'Arabkir']]]),
  one('RU', 'Russia', [
    ['Moscow', '101000', 55.7558, 37.6173, ['Central', 'Arbat']],
    ['Saint Petersburg', '190000', 59.9311, 30.3609, ['Central', 'Petrograd']],
  ]),
  one('UA', 'Ukraine', [
    ['Kyiv', '01001', 50.4501, 30.5234, ['Pechersk', 'Shevchenkivskyi']],
    ['Lviv', '79000', 49.8397, 24.0297, ['Halych', 'Lychakiv']],
    ['Odesa', '65000', 46.4825, 30.7233, ['Prymorskyi', 'Shevchenko']],
    ['Kharkiv', '61001', 49.9935, 36.2304, ['Holodnohirskyi', 'Shevchenkivskyi']],
  ]),
  one('BY', 'Belarus', [['Minsk', '220000', 53.9006, 27.559, ['Kastrychnitski', 'Moskovski']]]),
  one('RO', 'Romania', [
    ['Bucharest', '010011', 44.4268, 26.1025, ['Centru', 'Dristor']],
    ['Cluj-Napoca', '400001', 46.7712, 23.6236, ['Centru', 'Andrei Mureșanu']],
    ['Timișoara', '300001', 45.7489, 21.2087, ['Cetate', 'Mehala']],
    ['Brașov', '500001', 45.6473, 25.5784, ['Centru', 'Bartolomeu']],
  ]),
  one('BG', 'Bulgaria', [
    ['Sofia', '1000', 42.6977, 23.3219, ['Sredets', 'Studentski']],
    ['Plovdiv', '4000', 42.1354, 24.7453, ['Central', 'Kapana']],
  ]),
  one('GR', 'Greece', [
    ['Athens', '10552', 37.9838, 23.7275, ['Plaka', 'Kolonaki']],
    ['Thessaloniki', '54621', 40.6401, 22.9444, ['Center', 'Toumpa']],
    ['Heraklion', '71200', 35.3387, 25.1442, ['Heraklion Center', 'Poros']],
  ]),
  one('CY', 'Cyprus', [
    ['Nicosia', '1010', 35.1856, 33.3823, ['Nicosia Center', 'Engomi']],
    ['Limassol', '3011', 34.7071, 33.0226, ['Old Port', 'Germasogeia']],
  ]),
  one('MT', 'Malta', [['Valletta', 'VLT', 35.8989, 14.5146, ['Valletta', 'Sliema']]]),
  one('IT', 'Italy', [
    ['Rome', '00118', 41.9028, 12.4964, ['Centro Storico', 'Trastevere', 'EUR']],
    ['Milan', '20121', 45.4642, 9.19, ['Duomo', 'Navigli', 'Brera']],
    ['Naples', '80100', 40.8518, 14.2681, ['Centro', 'Vomero']],
    ['Turin', '10121', 45.0703, 7.6869, ['Centro', 'Crocetta']],
    ['Florence', '50121', 43.7696, 11.2558, ['Centro Storico', 'Oltrarno']],
    ['Venice', '30121', 45.4408, 12.3155, ['San Marco', 'Cannaregio']],
    ['Bologna', '40121', 44.4949, 11.3426, ['Centro', 'Santo Stefano']],
    ['Genoa', '16121', 44.4056, 8.9463, ['Centro Storico', 'Albaro']],
  ]),
  one('ES', 'Spain', [
    ['Madrid', '28001', 40.4168, -3.7038, ['Salamanca', 'Malasaña', 'Chamberí']],
    ['Barcelona', '08001', 41.3851, 2.1734, ['Eixample', 'Gràcia', 'Ciutat Vella']],
    ['Valencia', '46001', 39.4699, -0.3763, ['Ciutat Vella', 'Ruzafa']],
    ['Seville', '41001', 37.3891, -5.9845, ['Casco Antiguo', 'Triana']],
    ['Bilbao', '48001', 43.263, -2.935, ['Casco Viejo', 'Abando']],
    ['Málaga', '29001', 36.7213, -4.4213, ['Centro', 'La Malagueta']],
    ['Zaragoza', '50001', 41.6488, -0.8891, ['Casco Histórico', 'El Tubo']],
    ['Alicante', '03001', 38.3452, -0.481, ['Centro', 'Playa de San Juan']],
  ]),
  one('PT', 'Portugal', [
    ['Lisbon', '1100', 38.7223, -9.1393, ['Baixa', 'Chiado', 'Alfama']],
    ['Porto', '4000', 41.1579, -8.6291, ['Ribeira', 'Bonfim']],
    ['Faro', '8000', 37.0194, -7.9304, ['Faro Center', 'Horta da Areia']],
    ['Madeira', '9000', 32.6669, -16.9241, ['Funchal', 'Santa Maria']],
  ]),
  one('IE', 'Ireland', [
    ['Dublin', 'D01', 53.3498, -6.2603, ['City Centre', 'Ballsbridge', 'Temple Bar']],
    ['Cork', 'T12', 51.8985, -8.4756, ['Cork City Centre', 'The Lough']],
    ['Galway', 'H91', 53.2707, -9.0568, ['Galway Centre', 'Salthill']],
    ['Limerick', 'V94', 52.6638, -8.6267, ['Limerick City Centre', 'Castletroy']],
  ]),
  one('NL', 'Netherlands', [
    ['Amsterdam', '1012', 52.3676, 4.9041, ['Binnenstad', 'Jordaan', 'De Pijp']],
    ['Rotterdam', '3011', 51.9244, 4.4777, ['Centrum', 'Kralingen']],
    ['The Hague', '2511', 52.0705, 4.3007, ['Centrum', 'Scheveningen']],
    ['Utrecht', '3511', 52.0907, 5.1214, ['Binnenstad', 'Leidsche Rijn']],
    ['Eindhoven', '5611', 51.4416, 5.4697, ['Centrum', 'Strijp']],
    ['Groningen', '9711', 53.2194, 6.5665, ['Binnenstad', 'Oosterpark']],
  ]),
  one('BE', 'Belgium', [
    ['Brussels', '1000', 50.8503, 4.3517, ['Pentagone', 'Ixelles']],
    ['Antwerp', '2000', 51.2194, 4.4025, ['Antwerpen-Stad', 'Zurenborg']],
    ['Ghent', '9000', 51.0543, 3.7174, ['Gent-Centrum', 'Patershol']],
    ['Bruges', '8000', 51.2093, 3.2247, ['Historisch Centrum', 'Sint-Andries']],
    ['Liège', '4000', 50.6326, 5.5797, ['Centre', 'Outremeuse']],
  ]),
  one('LU', 'Luxembourg', [['Luxembourg City', '1601', 49.6116, 6.1319, ['Ville Haute', 'Gare']]]),
  one('CH', 'Switzerland', [
    ['Zurich', '8001', 47.3769, 8.5417, ['Altstadt', 'Enge', 'Oerlikon']],
    ['Geneva', '1201', 46.2044, 6.1432, ['Cité', 'Eaux-Vives']],
    ['Basel', '4001', 47.5596, 7.5886, ['Grossbasel', 'St. Alban']],
    ['Bern', '3001', 46.948, 7.4474, ['Old City', 'Breitenrain']],
    ['Lausanne', '1001', 46.5197, 6.6323, ['Centre', 'Ouchy']],
    ['Lugano', '6900', 46.0037, 8.9511, ['Lugano Centro', 'Paradiso']],
  ]),
  one('FR', 'France', [
    ['Paris', '75001', 48.8566, 2.3522, ['Le Marais', 'Saint-Germain', 'Montmartre']],
    ['Marseille', '13001', 43.2965, 5.3698, ['Le Panier', 'Vieux-Port']],
    ['Lyon', '69001', 45.764, 4.8357, ['Presqu\'île', 'Vieux Lyon']],
    ['Toulouse', '31000', 43.6047, 1.4442, ['Capitole', 'Saint-Cyprien']],
    ['Nice', '06000', 43.7102, 7.262, ['Vieux Nice', 'Promenade des Anglais']],
    ['Nantes', '44000', 47.2184, -1.5536, ['Centre-ville', 'Île de Nantes']],
    ['Bordeaux', '33000', 44.8378, -0.5792, ['Centre-ville', 'Chartrons']],
    ['Strasbourg', '67000', 48.5734, 7.7521, ['Grande Île', 'Orangerie']],
    ['Lille', '59000', 50.6292, 3.0573, ['Vieux-Lille', 'Wazemmes']],
    ['Montpellier', '34000', 43.6108, 3.8767, ['Écusson', 'Port Marianne']],
  ]),
  one('DE', 'Germany', [
    ['Berlin', '10115', 52.52, 13.405, ['Mitte', 'Prenzlauer Berg', 'Kreuzberg']],
    ['Hamburg', '20095', 53.5511, 9.9937, ['Altstadt', 'HafenCity', 'Altona']],
    ['Munich', '80331', 48.1351, 11.582, ['Altstadt', 'Schwabing']],
    ['Cologne', '50667', 50.9375, 6.9603, ['Innenstadt', 'Ehrenfeld']],
    ['Frankfurt', '60311', 50.1109, 8.6821, ['Innenstadt', 'Sachsenhausen']],
    ['Stuttgart', '70173', 48.7758, 9.1829, ['Mitte', 'Bad Cannstatt']],
    ['Düsseldorf', '40213', 51.2277, 6.7735, ['Altstadt', 'Oberkassel']],
    ['Leipzig', '04109', 51.3397, 12.3731, ['Zentrum', 'Südvorstadt']],
    ['Dresden', '01067', 51.0504, 13.7373, ['Innere Altstadt', 'Neustadt']],
    ['Bremen', '28195', 53.0793, 8.8017, ['Mitte', 'Viertel']],
    ['Hannover', '30159', 52.3759, 9.732, ['Innenstadt', 'Linden']],
    ['Nuremberg', '90402', 49.4521, 11.0767, ['Altstadt', 'Gostenhof']],
    ['Dortmund', '44135', 51.5136, 7.4653, ['Innenstadt', 'Kreuzviertel']],
    ['Essen', '45127', 51.4556, 7.0116, ['Stadtkern', 'Rüttenscheid']],
  ]),
  one('AT', 'Austria', [
    ['Vienna', '1010', 48.2082, 16.3738, ['Innere Stadt', 'Leopoldstadt', 'Favoriten']],
    ['Salzburg', '5020', 47.8095, 13.055, ['Altstadt', 'Lehen']],
    ['Innsbruck', '6020', 47.2692, 11.4041, ['Innenstadt', 'Wilten']],
    ['Graz', '8010', 47.0707, 15.4395, ['Innere Stadt', 'Lend']],
    ['Linz', '4020', 48.3069, 14.2858, ['Innenstadt', 'Froschberg']],
  ]),
  one('NO', 'Norway', [
    ['Oslo', '0150', 59.9139, 10.7522, ['Sentrum', 'Grünerløkka', 'Frogner']],
    ['Bergen', '5003', 60.3913, 5.3221, ['Bergenhus', 'Bydrggen']],
    ['Stavanger', '4005', 58.97, 5.7333, ['Sentrum', 'Eiganes']],
    ['Trondheim', '7013', 63.4305, 10.3951, ['Midtbyen', 'Elgeseter']],
  ]),
  one('SE', 'Sweden', [
    ['Stockholm', '11129', 59.3293, 18.0686, ['Norrmalm', 'Södermalm', 'Östermalm']],
    ['Gothenburg', '41110', 57.7089, 11.9746, ['Centrum', 'Haga']],
    ['Malmö', '21157', 55.605, 13.0038, ['Centrum', 'Västra Hamnen']],
    ['Uppsala', '75102', 59.8586, 17.6389, ['Centrum', 'Fålhagen']],
  ]),
  one('DK', 'Denmark', [
    ['Copenhagen', '1050', 55.6761, 12.5683, ['Indre By', 'Nørrebro', 'Vesterbro']],
    ['Aarhus', '8000', 56.1629, 10.2039, ['Midtbyen', 'Trøjborg']],
    ['Odense', '5000', 55.4038, 10.4024, ['Midtbyen', 'Vollsmose']],
    ['Aalborg', '9000', 57.0488, 9.9217, ['Midtbyen', 'Vestbyen']],
  ]),
  one('FI', 'Finland', [
    ['Helsinki', '00100', 60.1699, 24.9384, ['Kluuvi', 'Kallio', 'Töölö']],
    ['Espoo', '02100', 60.2055, 24.6559, ['Otaniemi', 'Tapiola']],
    ['Tampere', '33100', 61.4978, 23.761, ['Keskusta', 'Hatanpää']],
    ['Vantaa', '01300', 60.2934, 25.0378, ['Tikkurila', 'Myyrmäki']],
    ['Turku', '20100', 60.4518, 22.2666, ['Keskusta', 'Nummi']],
  ]),
  one('EE', 'Estonia', [['Tallinn', '10111', 59.437, 24.7536, ['Kesklinn', 'Pirita']]]),
  one('LV', 'Latvia', [
    ['Riga', '1050', 56.9496, 24.1052, ['Centrs', 'Vecrīga']],
    ['Daugavpils', '5400', 55.8747, 26.5363, ['Centrs', 'Jaunbūve']],
  ]),
  one('LT', 'Lithuania', [
    ['Vilnius', '01131', 54.6872, 25.2797, ['Senamiestis', 'Šnipiškės']],
    ['Kaunas', '44001', 54.8985, 23.9036, ['Senamiestis', 'Žaliakalnis']],
  ]),
  one('PL', 'Poland', [
    ['Warsaw', '00001', 52.2297, 21.0122, ['Śródmieście', 'Mokotów', 'Wola']],
    ['Kraków', '30001', 50.0647, 19.945, ['Stare Miasto', 'Kazimierz']],
    ['Gdańsk', '80001', 54.352, 18.6466, ['Śródmieście', 'Wrzeszcz']],
    ['Wrocław', '50001', 51.1079, 17.0385, ['Stare Miasto', 'Krzyki']],
    ['Poznań', '60001', 52.4064, 16.9252, ['Stare Miasto', 'Jeżyce']],
    ['Łódź', '90001', 51.7592, 19.456, ['Śródmieście', 'Baluty']],
  ]),
  one('CZ', 'Czechia', [
    ['Prague', '11000', 50.0755, 14.4378, ['Prague 1', 'Vinohrady', 'Holešovice']],
    ['Brno', '60200', 49.1951, 16.6068, ['Brno-střed', 'Královo Pole']],
    ['Ostrava', '70100', 49.8209, 18.2625, ['Moravská Ostrava', 'Slezská Ostrava']],
  ]),
  one('SK', 'Slovakia', [
    ['Bratislava', '81101', 48.1486, 17.1077, ['Staré Mesto', 'Ružinov']],
    ['Košice', '04001', 48.7164, 21.2611, ['Staré Mesto', 'Západ']],
  ]),
  one('HU', 'Hungary', [
    ['Budapest', '1051', 47.4979, 19.0402, ['Belváros', 'Újlipótváros', 'Ferihegy']],
    ['Debrecen', '4000', 47.5316, 21.6273, ['Belváros', 'Bethlen Terület']],
  ]),
  one('SI', 'Slovenia', [
    ['Ljubljana', '1000', 46.0569, 14.5058, ['Center', 'Trnovo', 'Bežigrad']],
  ]),
  one('HR', 'Croatia', [
    ['Zagreb', '10000', 45.815, 15.9819, ['Gornji Grad', 'Trešnjevka']],
    ['Split', '21000', 43.5081, 16.4402, ['Grad', 'Trg Republike']],
    ['Dubrovnik', '20000', 42.6507, 18.0944, ['Old Town', 'Lapad']],
    ['Rijeka', '51000', 45.3271, 14.4422, ['Centar', 'Pećine']],
  ]),
  one('RS', 'Serbia', [
    ['Belgrade', '11000', 44.7866, 20.4489, ['Vračar', 'Stari Grad', 'Novi Beograd']],
    ['Novi Sad', '21000', 45.2671, 19.8335, ['Stari Grad', 'Limani']],
  ]),
  one('BA', 'Bosnia and Herzegovina', [['Sarajevo', '71000', 43.8563, 18.4131, ['Stari Grad', 'Centar']]]),
  one('ME', 'Montenegro', [
    ['Podgorica', '81000', 42.4304, 19.2594, ['Center', 'Zabjelo']],
    ['Kotor', '85330', 42.4247, 18.7712, ['Old Town', 'Dobrota']],
  ]),
  one('MK', 'North Macedonia', [['Skopje', '1000', 41.9981, 21.4254, ['Centar', 'Karpoš']]]),
  one('AL', 'Albania', [['Tirana', '1001', 41.3275, 19.8187, ['Center', 'Blloku']]]),
  one('GT', 'Guatemala', [
    ['Guatemala City', '01001', 14.6349, -90.5069, ['Zona 1', 'Zona 14']],
  ]),
  one('HN', 'Honduras', [
    ['Tegucigalpa', '11101', 14.0723, -87.1921, ['Comayagüela', 'Miraflores']],
    ['San Pedro Sula', '21101', 15.5046, -88.0252, ['Centro', 'La Pradera']],
  ]),
  one('SV', 'El Salvador', [['San Salvador', '1101', 13.6929, -89.2182, ['Centro Histórico', 'Escalón']]]),
  one('NI', 'Nicaragua', [['Managua', '11001', 12.115, -86.2362, ['Metrocentro', 'Las Colinas']]]),
  one('CR', 'Costa Rica', [
    ['San José', '10101', 9.9281, -84.0907, ['El Carmen', 'Escalante']],
    ['Alajuela', '20101', 10.0161, -84.2116, ['Alajuela Centro', 'San Rafael']],
  ]),
  one('PA', 'Panama', [
    ['Panama City', '0801', 8.9824, -79.5199, ['Costa del Este', 'San Francisco']],
  ]),
  one('BZ', 'Belize', [['Belize City', '', 17.5046, -88.1863, ['Kings Park', 'Fort George']]]),
  one('JM', 'Jamaica', [['Kingston', '', 18.0179, -76.8099, ['New Kingston', 'Mona']]]),
  one('DO', 'Dominican Republic', [
    ['Santo Domingo', '10101', 18.4861, -69.9312, ['Zona Colonial', 'Piantini']],
    ['Punta Cana', '', 18.5819, -68.4045, ['Bávaro', 'Uvero Alto']],
    ['Santiago de los Caballeros', '51000', 19.46, -70.6973, ['Centro', 'Los Pepines']],
  ]),
  one('CU', 'Cuba', [
    ['Havana', '10200', 23.1136, -82.3666, ['Habana Vieja', 'Vedado']],
    ['Santiago de Cuba', '90100', 20.0266, -75.8267, ['Centro', 'Tivolí']],
  ]),
  one('TT', 'Trinidad and Tobago', [['Port of Spain', '', 10.6549, -61.501, ['Maraval', 'Newtown']]]),
  one('BS', 'Bahamas', [['Nassau', '', 25.048, -77.3554, ['Downtown Nassau', 'Paradise Island']]]),
  one('BB', 'Barbados', [['Bridgetown', '', 13.0976, -59.6165, ['Bridgetown Center', 'Warrens']]]),
  one('HT', 'Haiti', [['Port-au-Prince', 'HT6110', 18.5944, -72.3074, ['Pétion-Ville', 'Delmas']]]),
  one('PR', 'Puerto Rico', [
    ['San Juan', '00901', 18.4655, -66.1057, ['Old San Juan', 'Condado']],
    ['Ponce', '00730', 18.0111, -66.6141, ['Ponce Centro', 'La Guancha']],
  ]),
  one('FJ', 'Fiji', [['Suva', '', -18.1248, 178.4501, ['Central Suva', 'Tamavua']]]),
  one('PG', 'Papua New Guinea', [['Port Moresby', '121', -9.4438, 147.1803, ['Downtown', 'Konedobu']]]),
  one('VU', 'Vanuatu', [['Port Vila', '', -17.7333, 168.3219, ['Vila Central', 'Seaside']]]),
  one('SB', 'Solomon Islands', [['Honiara', '', -9.4456, 159.9729, ['Point Cruz', 'Ranadi']]]),
  one('WS', 'Samoa', [['Apia', '', -13.8507, -171.7513, ['Apia Central', 'Vaitele']]]),
  one('TO', 'Tonga', [['Nuku\'alofa', '', -21.1394, -175.2048, ['Nuku\'alofa Central', 'Ma\'ufanga']]]),
];

export const WORLD_LOCATIONS = [US, CA, GB, AU, ...WORLD];

/* Ordered dataset: country → state → city. States with a real regional name
 * are kept; countries without a workable state structure use name ''. */
export function orderedLocations() {
  const out = [];
  for (const country of WORLD_LOCATIONS) {
    for (const state of country.states) {
      const name = Array.isArray(state) ? state[0] : state.name;
      const cities = Array.isArray(state) ? state[1] : state.cities;
      for (const c of cities) {
        out.push({ country: country.country, countryCode: country.code, state: name, ...cToObj(c) });
      }
    }
  }
  return out;
}

function cToObj(c) {
  const [name, zip, lat, lng, areas] = c;
  return { city: name, zip: zip || '', lat, lng, areas: areas || [] };
}

export const AUTO_PREFIX_RE = /^WS[ACT]-/; // WS-A / WS-C / WS-T prefixes reserved for auto-published rows

export const NON_AFRICAN_COUNTRIES = WORLD_LOCATIONS.map((c) => ({ code: c.code, country: c.country }));