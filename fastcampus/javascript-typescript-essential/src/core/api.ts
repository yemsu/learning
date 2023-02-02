import { NewsFeed, NewsDetail } from '../types'

export class Api {
  ajax: XMLHttpRequest
  url: string

  constructor(url: string) {
    this.ajax = new XMLHttpRequest()
    this.url = url
  }

  // 바깥쪽에서 호출하지 않는것은 protected
  getRequest<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    this.ajax.open('GET', this.url)
    this.ajax.addEventListener('load', () => {
      cb(JSON.parse(this.ajax.response) as AjaxResponse)
    })
    this.ajax.send()
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url)
  }

  getData(cb: (data: NewsFeed[]) => void): void {
    return this.getRequest<NewsFeed[]>(cb)
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url)
  }

  getData(cb: (data: NewsDetail) => void): void {
    return this.getRequest<NewsDetail>(cb)
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