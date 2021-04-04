export interface denunciaObj {
    status:String;
    data:Denuncia[];
}
export interface Denuncia {
    id: Number;
    estatus:String;
    fechaSolicitud: String;
    nombreSolicitante:String;
    usuarioSolicitante:String;
}
export interface respData{
    id:number;
    idUsusario:number;
    estatus:String;
    descripcionProblema:String;
    tipoAyuda:String;
    fechaSolicitud:String;
    denunciado:Denunicado;
    solicitante:Solicitante;
}

export interface Solicitante{
    id: Number;
    idDenuncia:Number;
    nombres:String;
    apellidoPaterno:String;
    apellidoMaterno:String;
    genero:String;
    edad:Number;
    telefono:String;
    lugarNacimiento:String;
    domicilio:String;
    codigoPostal:String;
    escolaridad:String;
    edoCivil:String;
    ocupacion:String;
}

export interface Denunicado{
    id:Number;
    idDenuncia:Number;
    nombres:String;
    apellidoMaterno:String;
    apellidoPaterno:String;
    parentesco:String;
    edad:Number;
    genero:String;
    ocupacion:String;
    domicilio:String;
    codigoPostal:String;
    tipoViolencia:String;
}

export interface searchComplaint{
    status:String;
    dateIni:String;
    dateFin:String;
}
export interface respStatus{
    status:boolean;
    id:number;
}