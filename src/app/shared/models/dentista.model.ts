import { ContaBancariaDentista } from "./conta-bancaria-dentista.model";
import { DentistaProcedimento } from "./dentista-procedimento.model";
import { DentistaTipoProcedimento } from "./dentista-tipo-procedimento.model";
import { Email } from "./email.model";
import { TelefoneContato } from "./telefone-contato.model";

export class Dentista {

    constructor(
        public id?: number,
        public nomeDentista?: string,
        public sobrenomeDentista?: string,
        public numCro?: string,
        public dataNascimentoDentista?: string,
        public sexoDentista?: string,
        public contasBancariasDentista: ContaBancariaDentista[] = [],
        public telefonesContato: TelefoneContato[] = [],
        public emails: Email[] = [],
        public dentistaProcedimentos: DentistaProcedimento[] = [],
        public dentistaTiposProcedimentos: DentistaTipoProcedimento[] = []
    ) {}

}
