import API from '../../services/ApiRoot';

export default class CartPageModel {
  private apiService: API;

  constructor(apiService: API) {
    this.apiService = apiService;
  }
}
