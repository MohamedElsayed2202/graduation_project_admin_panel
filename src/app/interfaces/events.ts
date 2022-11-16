export interface Events {
    _id?: string,
    title: string,
    date: string,
    description:string,
    location:{
        name:string,
        url?:string
    }
    grade:string,
    image?:string
}
