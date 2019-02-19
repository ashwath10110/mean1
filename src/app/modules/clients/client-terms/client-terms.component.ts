import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'anms-client-terms',
  templateUrl: './client-terms.component.html',
  styleUrls: ['./client-terms.component.css']
})
export class ClientTermsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ClientTermsComponent>) { }

  ngOnInit() {
  }

  onClickAgree(event) {
    this.dialogRef.close({
      success: true,
      data: {}
    })
  }

}
