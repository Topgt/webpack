export default (text = 'hellow123', c) => {
  let divNode = document.createElement('div');
  let p1 = document.createElement('p');
  p1.innerHTML = text + 'about';
  p1.className = c;

  divNode.appendChild(p1);
  return divNode;
};
