/*
  Single-car dataset. M3 Competition and i4 M50 were removed in the
  single-car scope change, along with the accelBars / fastestCar /
  fastestTime derivations they existed to feed.
*/

export const car = {
  id: 'm4cs',
  name: 'M4 CS',
  fullName: 'BMW M4 CS',
  bodyStyle: 'Coupe',
  modelYear: 2025,
  accent: '#E7222E',
  source: 'press.bmwgroup.com T0441542EN (05/2024)',

  /*
    Only two figures are rendered on the site: torque and 0-100. The power
    entries are retained solely to document the unresolved conflict and are
    never displayed.
  */
  specs: {
    powerHp: { value: 550, unit: 'HP', label: 'Power' }, // TODO verify at bmw.com
    powerKw: { value: 405, unit: 'kW' }, // TODO verify at bmw.com
    torque: { value: 650, unit: 'NM', label: 'Torque' }, // TODO verify at bmw.com
    zeroTo100: { value: 3.4, unit: 'S', label: '0–100 km/h' }, // TODO verify at bmw.com
  },

  notes:
    'CONFLICT (not rendered): the US press release lists 543 hp while the global release lists 550 hp / 405 kW. Resolve against bmw.com before any future publication.',
}

/*
  Image manifest. Public assets are all local under /public — never hotlink.
  Missing files degrade to a bark block plus the aria-hidden silhouette in
  CarImage, so the layout holds before photography arrives.
*/
export const images = {
  hero: '/images/m4-cs-1.jpg',
  galleryFront: '/images/m4-cs-2.jpg',
  gallerySide: '/images/m4-cs-3.jpg',
  galleryRear: '/images/m4-cs-4.jpg',
  torque: '/images/m4-cs-5.jpg',
  acceleration: '/images/m4-cs-6.jpg',
}