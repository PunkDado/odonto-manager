export class ContaBancariaDentista {
    constructor(
        public id?: number,
        public banco?: string,
        public agencia?: string,
        public conta?: string,
        public dataAtualizacao?: string,
        public principal?: boolean
    ) {}
}
