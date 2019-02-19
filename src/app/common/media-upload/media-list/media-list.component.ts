import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  
  @Input() media: any = [];

  @Output() viewMedia: EventEmitter<any> = new EventEmitter();

  @Output() deleteMedia: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.media && changes.media.currentValue) {
      this.media = changes.media.currentValue || [];
    }
  }

  viewMediaFn(item){
    this.viewMedia.emit(item);
  }

  deleteMediaFn(item){
    this.deleteMedia.emit(item);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
