export class Endereco {
    constructor(
        public id?: number,
        public cep?: string,
        public principal?: boolean,
        public tipo?: string,
        public dataAtualizacao?: string,
        public logradouro?: string,
        public numero?: string,
        public semNumero?: boolean,
        public complemento?: string,
        public cidade?: string,
        public estado?: string
    )
}