import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public companyName?: string,
        public phone?: string,
        public email?: string,
        public position?: string,
        public comment?: string,
        public projects?: BaseEntity[],
        public deals?: BaseEntity[],
    ) {
    }
}
