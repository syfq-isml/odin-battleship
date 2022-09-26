const dialogController = (function () {
	const dialog = document.querySelector("#game-modal");
	const closeBtn = document.querySelector("#game-modal_btn");

	console.log(closeBtn);
	closeBtn.addEventListener("click", () => {
		console.log("Called");
		dialog.close();
	});

	const openDialog = () => {
		dialog.showModal();
	};

	return {
		openDialog,
	};
})();

export { dialogController };
