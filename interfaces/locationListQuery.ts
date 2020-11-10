export default interface LocationListPageQuery {
  page?: number;
  sortby?: 'abc' | 'last' | 'nearby';
  lat?: number;
  lng?: number;
  location?: string; // city, county etc.
  // eslint-disable-next-line semi
}
