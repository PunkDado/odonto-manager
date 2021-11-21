import { ProcedimentoAplicado } from "./procedimento-aplicado.model";


export class Atendimento {
    constructor(
        public id?: number,
        public dentista?: string,
        public paciente?: string,
        public dataAtendimento?: string,
        public convenio?: string,
        public numeroGTO?: string,
        public encaminhadoPor?: string,
        public formaPagamento?: string,
        public dataEnvio?: string,
        public verificado?: boolean,
        public procedimentosAplicados: ProcedimentoAplicado[] = []
    ) { }
}
