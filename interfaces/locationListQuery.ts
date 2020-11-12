export default interface LocationListPageQuery {
  page?: number;
  sortby?: 'abc' | 'last' | 'near';
  lat?: number;
  lng?: number;
  search?: string; // city, county etc.
  category?: string; // convert it to string cat value after fetch all categories from an endpoint.
  category_id?: number;
  search?: string;
}
