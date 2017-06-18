import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject} from 'rxjs/Rx';
import { BaseService } from './base.service';

@Injectable()
export class PostsService extends BaseService {

  // overload to type to our specific Type
  protected _subject$: Subject<Array<Post>>;

  constructor(protected http: Http) {
    super(http);

    const options = {
      route: 'posts'
    };
    this.init(options);
  }

  // expose our subject as an observable
  get posts$() {
    return this._subject$.asObservable();
  }

  // force a manual refesh
  public getLatest(entity?: Post): Promise<Array<Post>> {
    console.log('get latest for', entity);
    return this.load(entity);
  }
}

export class Post {
  userId?: number;
  id: number;
  title?: string;
  body?: string;
}
