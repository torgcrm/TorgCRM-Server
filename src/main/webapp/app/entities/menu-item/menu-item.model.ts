import { BaseEntity } from './../../shared';

export class MenuItem implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public title?: string,
        public icon?: string,
        public menuId?: number,
    ) {
    }
}
