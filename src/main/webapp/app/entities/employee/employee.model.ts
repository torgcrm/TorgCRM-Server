import { BaseEntity } from './../../shared';

export class Employee implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public secondName?: string,
        public fullName?: string,
        public position?: string,
        public departmentId?: number,
    ) {
    }
}
