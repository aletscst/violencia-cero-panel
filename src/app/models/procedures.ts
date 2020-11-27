export interface ListProcedures{
    id:number;
    name:String;
}
export interface Parrafo{
    subtitulo:String;
    texto:String;
}
export interface objRespProcedures{
    status:string;
    data:ListProcedures;
}
export interface objRespByID{
    id:number;
    estatus:String;
    titulo:String;
    parrafos:Parrafo[];
}
export interface ObjProcedures{
        id: number;
        titulo: String;
        parrafos:Parrafo[];
}
export interface reqDataProcedure{
    titulo:String;
    parrafos:Parrafo[];
}
export interface respStatus{
    status:String;
    id:number;
}