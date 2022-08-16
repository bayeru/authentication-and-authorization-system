// Create a react functional component to show a modal dialog with cancel and confirm buttons
// Language: typescript

import Button from "./Button";

type ModalProps = {

	title: string;
	message: string;
	onCancel: () => void;
	onConfirm: () => void;

};

export const Modal = (props:ModalProps) => {
	return (
		<>
			<div className="fixed top-0 bottom-0 left-0 right-0 bg-opacity-30 bg-black w-full"></div>
			<div className="fixed flex -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 p-4 justify-center w-full max-w-lg">
				<div className="flex rounded-lg bg-white shadow-xl overflow-hidden w-full p-4">
					<div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-200 w-10 h-10 mx-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="red"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
							/>
						</svg>
					</div>
					<div className="flex flex-col ml-4 w-full">
						<div>
							<h3 className="text-lg font-medium text-gray-900">{props.title}</h3>
							<p className="text-sm text-gray-500 mt-2">{props.message}</p>
						</div>
						<div className="flex mt-6 flex-row-reverse">
							<Button className="bg-red-600 focus:ring-red-500 hover:bg-red-700 ml-3" onClick={props.onConfirm}>
								Delete
							</Button>
							<Button className="bg-white text-gray-700 border focus:ring-indigo-500 hover:bg-gray-50 border-gray-300" onClick={props.onCancel}>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// // Get the modal state from the redux store
// const modalState = useSelector((state: RootState) => state.modal);

// // Get the dispatch function from the redux store
// const dispatch = useDispatch();

// // If the modal is open, set the focus to the first focusable element
// useEffect(() => {
// 	if (modalState.isOpen) {
// 		const focusableElements = document.querySelectorAll(
// 			"[tabindex]:not([tabindex='-1'])"
// 		) as NodeListOf<HTMLElement>;
// 		if (focusableElements.length > 0) {
// 			focusableElements[0].focus();
// 		}
// 	}
// }, [modalState.isOpen]);

// // Close the modal if the escape key is pressed
// const handleKeyDown = useCallback(
// 	(event: KeyboardEvent) => {
// 		if (event.key === "Escape") {
// 			dispatch(modalActions.close());
// 		}
// 	},
// 	[dispatch]
// );

// // Close the modal if the backdrop is clicked
// const handleBackdropClick = useCallback(
// 	(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
// 		if (event.target === event.currentTarget) {
// 			dispatch(modalActions.close());
// 		}
// 	},
// 	[dispatch]
// );

// // Add event listeners for the escape key and backdrop click
// useEffect(() => {
// 	document.addEventListener("keydown", handleKeyDown);
// 	return () => {
// 		document.removeEventListener("keydown", handleKeyDown);
// 	};
// }, [handleKeyDown]);

// // If the modal is open, add the modal-open class to the body
// useEffect(() => {
// 	if (modalState.isOpen) {
// 		document.body.classList.add("modal-open");
// 	} else {
// 		document.body.classList.remove("modal-open");
// 	}
// }, [modalState.isOpen]);

// // If the modal is open, set the focus to the first focusable element
// useEffect(() => {
// 	if (modalState.isOpen) {
// 		const focusableElements = document.querySelectorAll(
// 			"[tabindex]:not([tabindex='-1'])"
// 		) as NodeListOf<HTMLElement>;
// 		if (focusableElements.length > 0) {
// 			focusableElements[0].focus();
// 		}
// 	}
// }, [modalState.isOpen]);

// // Close the modal if the escape key is pressed
// const handleKeyDown = useCallback(
// 	(event: KeyboardEvent) => {
// 		if (event
