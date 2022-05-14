export class ProcedimentoAplicado {
    constructor(
        public id?: number,
        public procedimento?: string,
        public dente?: string,
        public valor?: number,
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
