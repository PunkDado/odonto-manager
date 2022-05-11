import { Convenio } from "./convenio.model";

export class DadosConvenioPaciente {
    constructor(
        public id?: number,
        public dataInformacao?: string,
        public numCarteirinha?: string,
        public convenio?: Convenio
    ) {}
}
