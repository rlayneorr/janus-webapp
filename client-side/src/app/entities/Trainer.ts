import { Component } from '@angular/core';
import { UserRole } from '../gambit-client/entities/UserRole';

export class Trainer {
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    backupPassword: string;
    role: UserRole;
    mobilePhone: string;
    homePhone: string;
    token: string;
    title: string;
}
