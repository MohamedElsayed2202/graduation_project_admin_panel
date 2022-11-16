export interface time{
    day: string,
    subjects:{
        1:string,
        2:string,
        3:string,
        4:string,
        5:string,
        6:string,
        7:string,
    }
}
export interface Classtimetable {
    _id?: string,
    grade:string,
    timeTable: time[]
}
