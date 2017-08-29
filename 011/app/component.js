export default (text = 'hellow123') => {
  let divNode = document.createElement('div');
  let textNode = document.createTextNode(text);
  divNode.appendChild(textNode)
  return divNode;
};
