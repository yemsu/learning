import View from "../core/view";

export interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

export interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

export interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  readonly domain: string;
  read?: boolean; //선택속성 이라는 뜻
}

export interface NewsDetail extends News {
  readonly contents_count: number;
  readonly comments: NewsComment[];
}

export interface NewsComment extends News {
  readonly comments: NewsComment[];
  readonly level: number;
}

export interface RouteInfo {
  path: string;
  page: View;
}