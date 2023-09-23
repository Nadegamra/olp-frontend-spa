import { ReactNode } from 'react'

function Modal({ toggleButtonText, children }: { toggleButtonText: string; children: ReactNode }) {
    return (
        <div>
            {/* <!-- Modal toggle --> */}
            <button
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                {toggleButtonText}
            </button>
            {/* <!-- Main modal --> */}
            <div
                id="defaultModal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                {children}
            </div>
        </div>
    )
}

export default Modal
