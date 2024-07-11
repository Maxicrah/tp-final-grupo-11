// facebook.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private userAccessToken: string = 'EAAgCpNskxp4BO6xrJMdLPpXbcoRU51O59xx96Gv2eZCcJjYKl5UIhfcbgH5Q5htOboZCpmZBtLJvXux20P1iW24EMCQnwHuuRyZA6CsIPCoAE1be1YfOklCpVkgsBjjDc3LGGCpgl5eBX87RNaJAEI3CrkE2b6t15AkyWzG2tlIv0gZAAQzZCYJrBIF8iuiqQw';
  private pageId: string = '373283199199661';  

  private _httpClient = inject(HttpClient);

  constructor() { }

  getPageAccessToken(): Observable<any> {
    const url = `https://graph.facebook.com/${this.pageId}?fields=access_token&access_token=${this.userAccessToken}`;
    return this._httpClient.get(url);
  }

  postToPage(message: string, imageUrl: string): Observable<any> {
    const url = `https://graph.facebook.com/v20.0/${this.pageId}/photos`;
    const body = {
      message: message,
      url: imageUrl,
      access_token: this.userAccessToken
    };
    return this._httpClient.post(url, body);
  }


}
