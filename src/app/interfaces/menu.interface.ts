import {Section} from './section.interface';
export interface Menu {
    id: string,
    name: string,
    departmentId: string,
    sections: Array<Section>;
}
