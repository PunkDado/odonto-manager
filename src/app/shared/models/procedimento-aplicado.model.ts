import { Atendimento } from "./atendimento.model";

export class ProcedimentoAplicado {
    constructor(
        public id?: number,
        //public atendimento?: Atendimento,
        public procedimento?: string,
        public dente?: string,
        public valorBruto?: number,
        public valorLiquido?: number,
        public valorRepassado?: number,
        public recebido?: boolean,
        public glosado?: boolean,
        public motivoGlosa?: string,
        public dataRecebimento?: string,
        public repassado?: boolean,
        public dataRepasse?: string

    ) { }
}
