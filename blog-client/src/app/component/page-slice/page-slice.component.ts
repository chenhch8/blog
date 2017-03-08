import { 
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer
} from '@angular/core';

@Component({
  selector: 'page-slice',
  templateUrl: './page-slice.html',
  inputs: ['size'],
  outputs: ['pageId']
})
export class PageSliceComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('ul_nav') ul: ElementRef;

  size: number; // 页数量
  id: number; // 当前页
  isFirst: boolean; // 是否第一次进入
  pages: Array<any> = new Array<any>();
  pageId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private renderer: Renderer) {
    this.id = 0;
    this.isFirst = true;
  }

  setPage(id): boolean {
    if (id < 0 || id >= this.size) return false;
    this.isFirst = false;
    this.setActiveClass(id);
    this.id = id;
    this.pageId.emit(this.id);
    return false;
  }

  setActiveClass(id) {
    let liOld = this.ul.nativeElement.children[this.id + 1];
    let liNew = this.ul.nativeElement.children[id + 1];
    liOld.className = '';
    liNew.className = 'active';
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any): void {
    // console.log('changes:', changes);
    let change = changes.size.currentValue;
    if (change) {
      this.size = change;
      this.pages = null;
      this.pages = new Array(this.size);
    }
  }

  ngOnDestroy() {
    this.size = null;
    this.pageId = null;
    this.ul = null;
  }
}