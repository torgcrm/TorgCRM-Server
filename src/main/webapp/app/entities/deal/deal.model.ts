import { BaseEntity } from './../../shared';

export class Deal implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public customer?: BaseEntity,
    ) {
    }
}
