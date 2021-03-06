import { Dentista } from "./dentista.model";
import { Paciente } from "./paciente.model";
import { ProcedimentoAplicado } from "./procedimento-aplicado.model";


export class Atendimento {
    constructor(
        public id?: number,
        public dentista?: Dentista,
        public paciente?: string,
        public entPaciente?: Paciente,
        public dataAtendimento?: string,
        public convenio?: string,
        public numGto?: string,
        public encaminhadoPor?: string,
        public formaPagamento?: string,
        public dataEnvio?: string,
        public atendimentoVerificado?: boolean,
        public comentario?: string,
        public procedimentosAplicados: ProcedimentoAplicado[] = []
    ) { }
}
 