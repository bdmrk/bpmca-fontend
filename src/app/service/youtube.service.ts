import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey: string = 'AIzaSyB2YNj8rUYzzMekAebxQGWPfiPaMKzkmJU';
  channelId: string = 'UCcDu0Eckdjs5ocEnS9WZwXA';
  apiUrl: string = 'https://www.googleapis.com/youtube/v3/';
  constructor(
    private http: HttpClient,
  ) { }

  getPlaylistChanel(): Observable<Object> {
    let url = this.apiUrl + 'playlists?key=' + this.apiKey + '&channelId=' + this.channelId + '&part=snippet&maxResults=50';
    // let url = "https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyB2YNj8rUYzzMekAebxQGWPfiPaMKzkmJU&channelId=UCcDu0Eckdjs5ocEnS9WZwXA&part=snippet&maxResults=50";
    return this.http.get(url);
  }

  getPlaylistChanelNextPage(pageToken): Observable<Object> {
    let url = this.apiUrl + 'playlists?key=' + this.apiKey + '&channelId=' + this.channelId + '&part=snippet&maxResults=50&pageToken=' + pageToken;
    // let url = "https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyB2YNj8rUYzzMekAebxQGWPfiPaMKzkmJU&channelId=UCcDu0Eckdjs5ocEnS9WZwXA&part=snippet&maxResults=50&pageToken=CDIQAA";
    return this.http.get(url);
  }
  getPlaylistItem(playlistId): Observable<Object> {
    let url = this.apiUrl+'playlistItems?key=' + this.apiKey + '&playlistId=' + playlistId + '&part=snippet&maxResults=50';
    // let url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL988fSCEKroBzOSZiVUJegGdRLmJi-wSI&maxResults=50&key=AIzaSyB2YNj8rUYzzMekAebxQGWPfiPaMKzkmJU";
    return this.http.get(url);
  }
}
