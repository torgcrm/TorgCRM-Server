import { BaseEntity } from './../../shared';

export class Manager implements BaseEntity {
    constructor(
        public id?: number,
        public fullname?: string,
        public comment?: string,
    ) {
    }
}
