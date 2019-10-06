import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public localItemData = 0;
  // public courseList = [
  //   {
  //     title: 'The Ultimate Drawing Course Beg',
  //     tutor: {
  //       id: 1,
  //       name: 'John Doe'
  //     },
  //     category: {
  //       id: 1,
  //       name: 'Cyber security'
  //     },
  //     sub_category: {
  //       id: 1,
  //       name: 'Cyber security'
  //     },
  //     price: '10',
  //     rating: '4.7',
  //     rating_count: '12,000',
  //     image: '/assets/img/course/1.jpg'
  //   },
  //   {
  //     title: 'The Ultimate Drawing Course Beg',
  //     tutor: {
  //       id: 1,
  //       name: 'John Doe'
  //     },
  //     category: {
  //       id: 1,
  //       name: 'Cyber security'
  //     },
  //     sub_category: {
  //       id: 1,
  //       name: 'Cyber security'
  //     },
  //     price: '10',
  //     rating: '4.7',
  //     rating_count: '12,000',
  //     image: '/assets/img/course/2.jpg'
  //   },
  //   {
  //     title: 'The Ultimate Drawing Course Beg',
  //     tutor: {
  //       id: 1,
  //       name: 'John Doe'
  //     },
  //     category: {
  //       id: 1,
  //       name: 'Cyber security'
  //     },
  //     sub_category: {
  //       id: 1,
  //       name: 'Cyber security'
  //     },
  //     price: '10',
  //     rating: '4.7',
  //     rating_count: '12,000',
  //     image: '/assets/img/course/6.jpg'
  //   },
  // ];
  constructor() { }
  storeLocalData(itemData) {
    const localData = getLocalData();
    if (localData) {
      const isItemExist = isAvailable(itemData);
      if (isItemExist == 0) {
        localData.push(itemData);
        setLocalData(localData);
      }
      return isItemExist;
    } else {
      const purchaseList = [];
      purchaseList.push(itemData);
      setLocalData(purchaseList);
    }
  }
  buyNow(course){
    localStorage ? localStorage.setItem('buyNowItem', JSON.stringify(course)) : '';
  }


  countCartItem() {
    let totalItemCount = 0;
    const localItemData = getLocalData();
    if (localItemData) {
      totalItemCount = localItemData.length;
    }
    return totalItemCount;
  }
  clearCartItems() {
    localStorage ? localStorage.removeItem('purchaseItems') : '';
  }
}
// external function
// get local storage data
export function getLocalData() {
  return localStorage ? JSON.parse(localStorage.getItem('purchaseItems')) : '';

}
// get local storage data
export function getEditedItems() {
  return localStorage ? JSON.parse(localStorage.getItem('editedItems')) : '';

}
// set local storage data
export function setLocalData(purchaseItem) {
  localStorage ? localStorage.setItem('purchaseItems', JSON.stringify(purchaseItem)) : '';
}

// count item number in buscate
export function countCartItem() {
  let totalItemCount = 0;
  const localItemData = localStorage ? JSON.parse(localStorage.getItem('purchaseItems')) : '';
  if (localItemData !== null) {
    for (const item of localItemData) {
      totalItemCount = totalItemCount + +item.item_qty;
    }
  }

  return totalItemCount;
}
export function isAvailable(itemData) {
  let localData = getLocalData();
  let data = localData.filter(item => {
    return item.id === itemData.id;
  });
  return data.length;
}