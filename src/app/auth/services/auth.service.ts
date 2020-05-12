import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLogged = false;

    getIsAuth(): boolean {
        return this.isLogged;
    }

    constructor() {}

    login(): void {
        this.isLogged = true;
    }

    logout(): void {
        this.isLogged = false;
    }
}
