import { BaseEntity } from './../../shared';

export class CustomerType implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public value?: string,
    ) {
    }
}
