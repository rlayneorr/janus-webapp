import { ToastOptions } from 'ng2-toastr';

export class ToastrOptions extends ToastOptions {
    dismiss = 'click';
    positionClass = 'toast-top-left';
    maxShown = 1;
    // enableHTML = true; // this would allow for input messages to be HTML, could use this to make lists to display multiple down endpoints
}
