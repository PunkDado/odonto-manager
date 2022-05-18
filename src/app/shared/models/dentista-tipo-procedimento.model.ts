import { TipoProcedimento } from "./tipo-procedimento.model";

export class DentistaTipoProcedimento {
    constructor(
        public id?: number,
        public taxaRepasse?: number,
        public valorFixo?: number,
        public dataAtualizacao?: string,
        public tipoProcedimento?: TipoProcedimento
    ) {}
}
