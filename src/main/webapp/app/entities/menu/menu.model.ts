import { BaseEntity } from './../../shared';

export class Menu implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public title?: string,
        public parent?: BaseEntity,
        public items?: BaseEntity[],
    ) {
    }
}
