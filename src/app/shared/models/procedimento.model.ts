import { TipoProcedimento } from "./tipo-procedimento.model";

export class Procedimento {
    constructor(
        public id?: number,
        public descProcedimento?: string,
        public tipoProcedimento?: TipoProcedimento
    ) {}
}
