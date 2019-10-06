import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  testBrowser: any;

  constructor(
    @Inject(PLATFORM_ID) platformId: string
  ) { 

    this.testBrowser = isPlatformBrowser(platformId);

  }

  aws_s3_bucket_path(): String {

    if (this.testBrowser) {
      if (window.location.hostname.indexOf('edutubebd.com') > -1){
        return 'https://s3-ap-southeast-1.amazonaws.com/edutubebd/';
      }
      else{
        return 'https://s3-ap-southeast-1.amazonaws.com/edutubebd/';
      }
    }
  }

  dateDiff(fromDate) {    
    const dateFirst: any = new Date(fromDate);
    const dateSecond: any = new Date();

    let timeSec = Math.round((dateSecond.getTime() - dateFirst.getTime()) / 1000);
    let diffMin = Math.round(timeSec / 60);
    let diffHour = Math.abs(diffMin / 60);
    let diffDays = Math.abs(diffHour / 24);
    let diffMon = Math.abs(diffDays / 30);
    let diffYear = Math.abs(diffMon / 12);

    const data = {
      second: timeSec,
      minute: diffMin,
      hour: diffHour,
      days: diffDays,
      month: diffMon,
      year: diffYear
    }
    return data;    
  }
  durationMessage(date){    
    const dateData = this.dateDiff(date);
    if (dateData.minute < 60) {
      return parseInt(dateData.minute.toString()) + " Min";
    }
    else if (dateData.minute >= 60 && dateData.hour < 24) {
      return parseInt(dateData.hour.toString()) + " Hours";
    }
    else if (dateData.hour >= 24 && dateData.days < 30) {
      return parseInt(dateData.days.toString()) + " Days";
    }
    else if (dateData.days >= 30 && dateData.month < 12) {
      return parseInt(dateData.month.toString()) + " Months";
    }
    else if (dateData.days >= 365) {
      return parseInt(dateData.year.toString()) + " Years";
    }
    else{
      return parseInt(dateData.second.toString()) + " Seconds";
    }
  }

}
