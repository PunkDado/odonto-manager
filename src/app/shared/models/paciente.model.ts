import { CondicaoDentePaciente } from "./condicao-dente-paciente.model";
import { DadosConvenioPaciente } from "./dados-convenio-paciente.model";
import { Email } from "./email.model";
import { TelefoneContato } from "./telefone-contato.model";

export class Paciente {
    constructor(
        public id?: number,
        public nomePaciente?: string,
        public sobrenomePaciente?: string,
        public dataNascimentoPaciente?: string,
        public cpfPaciente?: string,
        public nomeResponsavel?: string,
        public sobrenomeResponsavel?: string,
        public dataNascimentoResponsavel?: string,
        public cpfResponsavel?: string,
        public telefonesContato?: TelefoneContato[],
        public emails?: Email[],
        public dadosConvenioPacientes?: DadosConvenioPaciente[],
        public condicaoDentePacientes?: CondicaoDentePaciente[]
    ) {}
}