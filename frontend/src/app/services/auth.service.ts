import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService
{
    constructor(private http: HttpClient) 
    {

    }

    public login(body: any)
    {   
        let headerReq = new HttpHeaders({'Content-Type': 'application/json'});
        //let body = {email: "user@email.com", password: "password"};
        let response = this.http.post("http://localhost:3000/login", body, {headers: headerReq} );
        response.subscribe(
            (value) => console.log("resp", value)
        );   
    }

    public register (body:any)
    {
        let headerReq = new HttpHeaders({'Content-Type': 'application/json' });
        let response = this.http.post("http://localhost:3000/register", body, {headers: headerReq} );
        response.subscribe(
            (value) => console.log("resp", value)
        
        );
    }
}