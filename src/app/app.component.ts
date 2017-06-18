import { Component } from '@angular/core';
import { PostsService, Post  } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }

@Component({
  selector: 'first-component',
  template: `
    <h1>First Component</h1>
    <input type="number" placeholder="ID" [(ngModel)]="entityId"/>
    <button [disabled]='!(entityId > 0)' (click)='getById()'>Get Specified</button>
    <button (click)='getAll()'>Get All</button>
  `
})
export class FirstComponent {
  public entityId: number;

  constructor(private postsService: PostsService) { }

  public getAll() {
    this.postsService.getLatest().then(success => {
      // handle response promise if desired
    }, error => {
      // handle error response if desired
    })
  }

  public getById() {
    const entity: Post = { id: this.entityId };

    this.postsService.getLatest(entity);
  }
}

@Component({
  selector: 'second-component',
  template: `
    <h1>Second Component</h1>
    <h3>Total Posts - {{posts?.length}}</h3>
  `
})
export class SecondComponent {
  public posts: Array<Post>;

  constructor(private postsService: PostsService) {

    postsService.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }
}

@Component({
  selector: 'third-component',
  template: `
    <h1>Third Component</h1>
    <p *ngFor='let post of posts'>
      {{post.id}}: {{post.title}}
    </p>
  `
})
export class ThirdComponent {
  public posts: Array<Post>;

  constructor(private postsService: PostsService) {

    postsService.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }
}
