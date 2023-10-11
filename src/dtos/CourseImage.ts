export class SetCourseImageRequest {
    courseId: number
    image: FormData

    constructor(courseId: number, image: FormData) {
        this.courseId = courseId
        this.image = image
    }
}
// { 'Content-Type': 'multipart/form-data' }
