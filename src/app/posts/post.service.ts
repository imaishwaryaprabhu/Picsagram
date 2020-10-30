import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first, debounceTime } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Post } from './post.model';
import { Subject, Observable } from 'rxjs';
const baseUrl = `${environment.apiUrl}/posts`;

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postListChangedSubject = new Subject<{ posts: Post[], totalCount: number }>();
  postListChanged$: Observable<{ posts: Post[], totalCount: number }>;

  constructor(private http: HttpClient) { 
    this.postListChanged$ = this.postListChangedSubject.asObservable();
  }

  create(caption: string, image: Blob) {
    const post = new FormData();
    post.append("caption", caption);
    post.append("image", image);

    return this.http.post<{message: string, post: Post}>(`${baseUrl}`, post)
  }

  update(id:string, caption: string) {
    return this.http.put<{message: string, post: Post}>(`${baseUrl}/${id}`, { caption: caption })
    .pipe(map(response => {
      this.getAll();

      return response;
    }));
  }

  delete(id:string) {
    return this.http.delete<{message: string, post: Post}>(`${baseUrl}/${id}`)
      .pipe(map(response => {
        this.getAll();
        
        return response;
      }));
  }

  getAll() {
    this.http.get<{message: string, posts: Post[], totalCount: number}>(`${baseUrl}`)
    .pipe(first(), debounceTime(1000))
    .subscribe(data => {
      this.postListChangedSubject.next({
        posts: data.posts,
        totalCount: data.totalCount
      });
    });
  }

}
