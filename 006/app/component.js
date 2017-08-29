export default (text = 'hellow world') => {
  const element = document.createElement('div');
  element.innerHTML = text;
  return element;
};
