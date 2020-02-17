window.contentfulExtension.init(function(extension) {
	extension.window.startAutoResizer();

	const quillElement = document.getElementById("editor");

	const quillToolbarOptions = [
		['bold', 'italic', {'script':'super'}],
	      [{'list': 'ordered'}, {'list': 'bullet'}],
	      ['clean']
	];
	const quillEditor = new Quill(quillElement, {
		modules: { toolbar: quillToolbarOptions },
		theme: "snow",
		formats: ["bold", "italic",{'script':'super'}]
	});

	let currentValue = extension.field.getValue();
	quillElement.firstChild.innerHTML = currentValue;

	quillEditor.on("text-change", function(delta, oldDelta, source) {
		var value = quillElement.firstChild.innerHTML;
		extension.field.setValue(value);
	});
});