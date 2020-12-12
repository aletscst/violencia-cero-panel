export interface Login {
    email: String;
    password: String
}
export interface respLogin {
    status: boolean,
    id: number;
    token: string;
}
export interface Register {
    nombre: String;
    apellido: String;
    email: String;
    password: String;
    tipo: String;
}
export interface respRegister {
    status: boolean;
    id: number;
}

export interface DataUsersApp{
    status:boolean;
    data: UserApp[];
}

export interface DataUsersPanel{
    status:boolean;
    data: UserPanel[];
}

export interface UserPanel {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    tipo: string;
    password: string;
}

export interface UserApp {
    id: number;
    estatus: string;
    nombre: string;
    apellidoM: string;
    apellidoP: string;
    cp: string;
    email: string;
    tel: string;
}