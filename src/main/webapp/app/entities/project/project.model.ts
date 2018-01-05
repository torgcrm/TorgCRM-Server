import { BaseEntity } from './../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public industry?: string,
        public code?: string,
        public customer?: BaseEntity,
    ) {
    }
}
