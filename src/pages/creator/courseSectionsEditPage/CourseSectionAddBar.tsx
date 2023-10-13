import Button from '../../../components/forms/Button'
import InputField from '../../../components/forms/InputField'

function CourseSectionAddBar() {
    return (
        <section className="flex flex-row">
            <InputField placeholder="Section Name" />
            <div className="px-2" />
            <Button>Add Section</Button>
        </section>
    )
}

export default CourseSectionAddBar
