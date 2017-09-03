export default (text = 'hellow123',cc1, cc2) => {
  let divNode = document.createElement('div');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');
  let ipt = document.createElement('input');
  p1.innerHTML = 'test cc1';
  p1.className = cc1;
  p2.innerHTML = 'test cc2'+ text;
  p2.className = cc2;

  divNode.appendChild(ipt);
  divNode.appendChild(p1);
  divNode.appendChild(p2);
  return divNode;
};
