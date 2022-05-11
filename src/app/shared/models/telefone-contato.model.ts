export class TelefoneContato {
    constructor(
        public id?: number,
        public tipoTelefone?: string,
        public ddd?: string,
        public numTelefone?: string,
        public principal?: boolean,
        public dataAtualizacao?: string
    ) {}
}
