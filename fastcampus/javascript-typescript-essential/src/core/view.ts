export default abstract class View {
  private template: string
  private renderTemplate: string
  private container: HTMLElement
  private htmlList: string[]

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId)
    if(!containerElement) {
      throw '최상위 컨테이너가 없어 UI를 삽입할 수 없습니다.'
    } 
    
    this.container = containerElement
    this.template = template
    this.renderTemplate = template
    this.htmlList = []
  }

  protected updateView(): void { //return 값이 없을때
    this.container.innerHTML = this.renderTemplate
    this.renderTemplate = this.template
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString)
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('')
    this.clearHtmlList()
    return snapshot
  }

  private clearHtmlList(): void {
    this.htmlList = []
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value)
  }

  abstract render(): void  // 자식들한테 반드시 구현하라고 요구하는 메소드. 추상 메서드라고 한다. 클래스 자체가 abstract 키워드를 가지고 있어야함.
}