module.exports.component = (text='hellow')=>{
  let divNode = document.createElement('div');
  let textNode = document.createTextNode(text);
  divNode.appendChild(textNode);
  return divNode;
};
