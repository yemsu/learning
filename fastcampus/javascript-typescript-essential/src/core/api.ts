import { NewsFeed, NewsDetail } from '../types'

export class Api {
  xhr: XMLHttpRequest
  url: string

  constructor(url: string) {
    this.xhr = new XMLHttpRequest()
    this.url = url
  }

  // 바깥쪽에서 호출하지 않는것은 protected
  getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    this.xhr.open('GET', this.url)
    this.xhr.addEventListener('load', () => {
      cb(JSON.parse(this.xhr.response) as AjaxResponse)
    })
    this.xhr.send()
  }

  getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    fetch(this.url)
      .then(res => res.json())
      .then(cb)
      .catch(() => {
        console.error('데이터를 불러오지 못했습니다.')
      })
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url)
  }

  getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithPromise<NewsFeed[]>(cb)
  }
  getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithXHR<NewsFeed[]>(cb)
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url)
  }

  getDataWithXHR(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithXHR<NewsDetail>(cb)
  }
  getDataWithPromise(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(cb)
  }
}

// function applyApiMixins(targetClass: any, baseClasses: any[]) {
//   baseClasses.forEach(baseClass => {
//     Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
//       const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name)

//       if(descriptor) {
//         Object.defineProperty(targetClass.prototype, name, descriptor)
//       }
//     })
//   })
// }

// interface NewsFeedApi extends Api {}
// interface NewsDetailApi extends Api {}

// applyApiMixins(NewsFeedApi, [Api])
// applyApiMixins(NewsDetailApi, [Api])