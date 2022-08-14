// Create a react functional component to show a modal dialog with cancel and confirm buttons
// Language: typescript

export const Modal = () => {
	return (
		<>
			<div className="fixed top-0 bottom-0 left-0 right-0 bg-opacity-30 bg-black w-full"></div>
			<div className="fixed -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 rounded-lg bg-white shadow-xl overflow-hidden max-w-lg">
				<div>
					<h3 className="text-lg font-medium text-gray-900">Modal Title</h3>
					<p className="text-sm text-gray-500">Are you sure you want to delete?</p>
				</div>
				<div className="modal-content">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
						Cancel
					</button>
					<button type="button" className="btn btn-primary">
						Delete
					</button>
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
