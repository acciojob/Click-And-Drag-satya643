const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');
const items = document.querySelector('.items');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Arrange cubes in a grid
cubes.forEach((cube, index) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  cube.style.left = `${col * 110}px`;
  cube.style.top = `${row * 110}px`;
});

// Cube dragging
cubes.forEach(cube => {
  cube.addEventListener('mousedown', e => {
    e.stopPropagation(); // prevent container scroll drag
    selectedCube = cube;
    selectedCube.classList.add('dragging');

    const rect = selectedCube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    container.classList.add('active');
  });
});

document.addEventListener('mousemove', e => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;

  left = Math.max(0, Math.min(left, container.clientWidth - cubeRect.width));
  top = Math.max(0, Math.min(top, container.clientHeight - cubeRect.height));

  selectedCube.style.left = `${left}px`;
  selectedCube.style.top = `${top}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.classList.remove('dragging');
    selectedCube = null;
    container.classList.remove('active');
  }
});

// Container horizontal scroll by drag
let isDragging = false;
let startX;
let scrollLeft;

items.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('cube')) return; // avoid conflict with cubes
  isDragging = true;
  startX = e.pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
  items.classList.add('active');
});

items.addEventListener('mouseleave', () => {
  isDragging = false;
  items.classList.remove('active');
});

items.addEventListener('mouseup', () => {
  isDragging = false;
  items.classList.remove('active');
});

items.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - items.offsetLeft;
  const walk = x - startX;
  items.scrollLeft = scrollLeft - walk;
});
