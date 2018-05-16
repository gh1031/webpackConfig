import _ from 'lodash';
import '../css/index.css';
import icon from '../assets/user.jpg';

function component () {
  var element = document.createElement('div');
  element.id = 'box';
  element.innerHTML = _.join(['Hello', 'webpack', 'I will learn it'], ' ');
  var myIcon = new Image();
  console.log(icon);
  myIcon.src = icon;
  element.appendChild(myIcon);
  console.error('this is error');
  return element;
}
(() => {
  console.log('es6 arrow function')
})()
document.body.appendChild(component());