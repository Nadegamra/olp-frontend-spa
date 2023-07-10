export class SetCourseImageRequest {
    courseId: number
    image: File

    constructor(courseId: number, image: File) {
        this.courseId = courseId
        this.image = image
    }
}
// { 'Content-Type': 'multipart/form-data' }
