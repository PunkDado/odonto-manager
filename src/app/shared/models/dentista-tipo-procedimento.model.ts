import { TipoProcedimento } from "./tipo-procedimento.model";

export class DentistaTipoProcedimento {
    constructor(
        public id?: number,
        public taxaRepasse?: number,
        public valorFixo?: number,
        public tipoProcedimento?: TipoProcedimento
    ) {}
}
