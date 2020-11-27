export interface Data{
    id:number;
    nombre:String;
}
export interface getObjViolence{
    status:boolean;
    data:Data;
}
export interface Parrafos{
    subtitulo:String;
    texto:String;
}
export interface getObjViolenceID{
    id:number;
    estatus:String;
    titulo:String;
    parrafos:Parrafos[];
}
export interface reqObjParrafos{
    titulo:String;
    parrafos:Parrafos[];
}
export interface updateViolence{
    estatus:String;
    titulo:String;
    parrafos:Parrafos[];
}
export interface respStatus{
    id:number;
    status:boolean;
}