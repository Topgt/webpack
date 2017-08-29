export default (text='hellow')=>{
  let divNode = document.createElement('div');
  let TextNode = document.createTextNode(text);
  divNode.appendChild(TextNode);
  return divNode;
};
