export class Usuario {
    constructor(
        public id?: number,
        public nome?: string,
        public login?: string,
        public senha?: string,
        public perfil?: string
    ) {}
}

/*
Perfis de usuário: -> Um usuário de cada perfil
        lista.add(new Usuario(1, "Leonardo", "admin", "admin", "ADMIN"));
		lista.add(new Usuario(2, "Josiane", "gerente", "gerente", "GERENTE"));
		lista.add(new Usuario(3, "Alicia", "dentista", "dentista", "DENTISTA"));
		lista.add(new Usuario(4, "Carol", "func", "func", "FUNC"));
*/
