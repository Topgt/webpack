export default (text = 'hellow') => {
	const element = document.createElement('div');
	element.innerHTML = text;
	return element;
};
