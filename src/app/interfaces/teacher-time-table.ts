export interface time{
    day: string,
    classes: {
        1:string,
        2:string,
        3:string,
        4:string,
        5:string,
        6:string,
    }
}
export interface TeacherTimeTable {
    _id?: string,
    subject: string,
    timeTable: time[],
    teacherId: string
}
