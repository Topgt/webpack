export default (text='hellow')=>{
  let divNode = document.cteateElement('div');
  let textNode = document.createTextNode(text);
  divNode.appendChild(textNode);
  return divNode;
};
