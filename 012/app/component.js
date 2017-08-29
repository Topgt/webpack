export default (text, style1, style2) => {
  let divNode = document.createElement('div');
  let pNode1 = document.createElement('p');
  pNode1.className = style1;
  pNode1.innerHTML = 'hellow123';
  let pNode2 = document.createElement('p');
  pNode2.className = style2;
  pNode2.innerHTML = text;
  divNode.appendChild(pNode1);
  divNode.appendChild(pNode2);
  return divNode;
};
