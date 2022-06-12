import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OpensnackbarService {

  constructor(private snackbar: MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    if (action === 'error') {
      this.snackbar.open(message, action, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['black-snackbar'],
        duration: 2000

      })
    }
    else {
      this.snackbar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['green-snackbar'],
        duration: 2000

      })

    }
  }
}
