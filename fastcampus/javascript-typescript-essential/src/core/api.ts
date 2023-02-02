import { NewsFeed, NewsDetail } from '../types'

export class Api {
  ajax: XMLHttpRequest
  url: string

  constructor(url: string) {
    this.ajax = new XMLHttpRequest()
    this.url = url
  }

  // 바깥쪽에서 호출하지 않는것은 protected
  getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false);
    this.ajax.send();
  
    return JSON.parse(this.ajax.response);
  }
}

export class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  getData(id: string): NewsDetail {
    return this.getRequest<NewsDetail>();
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