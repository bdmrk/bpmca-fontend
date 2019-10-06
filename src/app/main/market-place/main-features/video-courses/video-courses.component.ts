import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from '../../../../service/youtube.service';

@Component({
  selector: 'app-video-courses',
  templateUrl: './video-courses.component.html',
  styleUrls: ['./video-courses.component.scss']
})
export class VideoCoursesComponent implements OnInit {
  public playListChannel = [];
  public playListItem = [];
  playListItemLength = 0;
  video_url;
  video_index = -1;

  // pagination
  dataIndex = 83;

  constructor(
    private youtube: YoutubeService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

    window.addEventListener('scroll', this.scroll, true);
    this.getPlaylistChanel();

  }

  getPlaylistChanel() {

    this.youtube.getPlaylistChanel().subscribe(
      (res) => {
        this.playListChannel = res['items'];
        const playListId = res['items'][res['items'].length-1].id;
            this.getPlayListItem(playListId);
        this.youtube.getPlaylistChanelNextPage(res['nextPageToken']).subscribe(
          (res1) => {
            res1['items'].filter(item => {
              this.playListChannel.unshift(item);
            });
          }
        );
      }
    );

  }
  getPlayListItem(playListId) {
    this.youtube.getPlaylistItem(playListId).subscribe(
      (res) => {
        res['items'].filter(item => {
          this.playListItem.push(item);
        });
      }
    );
  }

  scroll = (): void => {
    const parent = this;
    setTimeout(function () {
      parent.getAll();
    }, 1500);
  };

  getAll(): void {

    if (this.playListChannel[this.dataIndex] && this.dataIndex != 49) {
      const playListId = this.playListChannel[this.dataIndex].id;
      this.getPlayListItem(playListId);
    }

    if (this.dataIndex > -1) {
      this.dataIndex--;
    }
  }

  getVideoId(item, i): void {

    this.video_index = i;
    this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}?autoplay=1`);

  }

}
