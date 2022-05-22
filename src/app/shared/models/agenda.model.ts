import { Dentista } from "./dentista.model";
import { Paciente } from "./paciente.model";

export class Agenda {
    constructor(
        public id?: number,
        public dataHora?: string,
        public duracaoMinutos?: number,
        public horarioAberto?: boolean,
        public horarioAgendado?: boolean,
        public horarioUtilizado?: boolean,
        public ausenciaPaciente?: boolean,
        public reagendamentoDentista?: boolean,
        public horarioPerdido?: boolean,
        public dentista?: Dentista,
        public paciente?: Paciente
    ) {}
}