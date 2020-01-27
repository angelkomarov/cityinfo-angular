export class ErrrorHandler {

    public getHttpErrorText(err: any): string {
        if (err.status == 0) 
            return err.message;  
        else if (err.status >= 400 && err.status < 500)
            return err.error.title;
        else if (err.status == 500)
            return err.error.detail;
        else
            return 'undefined error';
    }


}
