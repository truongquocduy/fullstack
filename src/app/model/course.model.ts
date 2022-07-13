import { CourseDetail } from "./coursedetail.model"


export class Course{
    id:String = ""
    name:String = ""
    task:String = ""
    image:String = "1.png"
    price:number = 0
    baihoc:CourseDetail[] = []
}