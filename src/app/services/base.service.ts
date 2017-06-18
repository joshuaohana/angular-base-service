import { Http } from '@angular/http';
import { Subject} from 'rxjs/Rx';
import { environment } from '../../environments/environment';

export class BaseService {

  // store internal options that may be relevant to your project
  protected options: {
    route: string,
    skipFirstLoad?: boolean,
  };
  protected _subject$: Subject<Array<any>>;   // the subject which each service will expose for our components
  protected baseUrl: string;

  // retreive reference to http and set baseUrl
  constructor(protected http: Http) {
    this.baseUrl = environment.baseUrl;
  }

  // initialize with options
  protected init(options) {
    this.options = options;
    this._subject$ = <Subject<Array<any>>>new Subject();

    // call our first load, unless requested not to
    if (!options.skipFirstLoad) {
      this.load();
    }
  }

  // called whenever our data changes, will retreive latest and inform all our components who have subscribed
  protected load(entity?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.formUrl(entity)).map(response => response.json()).subscribe(
        data => {
          data = [].concat(data);  // ensure we are returning an array
          this._subject$.next(data);
          resolve(data);
        },
        error => {
          this.handleError(error);
          reject(error);
        })
    });
  }

  // http.post
  protected addEntity(entity: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.formUrl(entity), entity).map(response => response.json()).subscribe(
        data => {
          this.load();
          resolve(data);
        },
        err => {
          reject(err);
        });
    });
  }

  // http.put
  protected updateEntity(entity: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.formUrl(entity), entity).map(response => response.json()).subscribe(
        data => {
          this.load();
          resolve(data);
        },
        err => {
          reject(err);
        });
      });
  }

  // http.delete
  protected deleteEntity(entity: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.formUrl(entity)).subscribe(
        data => {
          this.load();
          resolve(data);
        },
        err => {
          reject(err);
        });
    });
  }

  // Generic error handler, route to your logging or overload in your specific classes
  protected handleError(error) {
    if (error.status === 401) {
      // here you can re-route to login page, or handle the error usefully
    }
    console.log('Could not load', this.options.route, error);
  }

  // Forms the url based on our baseUrl, the route, and any params passed in
  protected formUrl(entity?: any): string {
    let urlParams = '';

    if (entity && entity.id) {
      urlParams = '/' + entity.id;
    }

    // Good place to inject access_token if appropriate

    return this.baseUrl + this.options.route + urlParams;
  }
}
