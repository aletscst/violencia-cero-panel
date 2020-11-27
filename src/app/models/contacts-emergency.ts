export interface Contacts{
    id: String;
    name: String;
    description: String;
    number: String;
}
export interface ContactsSend{
    name: String;
    description: String;
    number: String;
}
export interface respContacts{
    status:boolean;
    data:Contacts[];
}
export interface respStatus{
    status:boolean;
    id:number;
}