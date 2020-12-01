export interface Login{
    email:String;
    password:String
}
export interface respLogin{
    status:boolean,
    id:number;
    token:string;
}
export interface Register{
    nombre:String;
    apellido:String;
    email:String;
    password:String;
}
export interface respRegister{
    status:boolean;
    id:number;
}