import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public fullname?: string,
        public phoneNumber?: string,
        public email?: string,
        public fax?: string,
        public source?: string,
        public comment?: string,
        public type?: BaseEntity,
        public projects?: BaseEntity[],
        public deals?: BaseEntity[],
    ) {
    }
}
