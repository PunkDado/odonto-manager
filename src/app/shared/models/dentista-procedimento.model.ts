import { Procedimento } from "./procedimento.model";

export class DentistaProcedimento {
    constructor(
        public id?: number,
        public taxaRepasse?: number,
        public valorFixo?: number,
        public procedimento?: Procedimento
    ) {}
}
