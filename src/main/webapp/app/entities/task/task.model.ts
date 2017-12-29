import { BaseEntity } from './../../shared';

export const enum TaskType {
    'CALL',
    'MEETING',
    'EMAIL'
}

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public type?: TaskType,
    ) {
    }
}
