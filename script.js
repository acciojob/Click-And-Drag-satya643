const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Arrange cubes in a grid
cubes.forEach((cube, index) => {
  const row = Math.floor(index / 4); // 4 cubes per row
  const col = index % 4;
  cube.style.left = `${col * 110}px`;
  cube.style.top = `${row * 110}px`;
});

// Mouse down - start dragging cube
cubes.forEach(cube => {
  cube.addEventListener('mousedown', e => {
    selectedCube = cube;
    selectedCube.classList.add('dragging');

    const rect = selectedCube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

// Mouse move - drag cube
document.addEventListener('mousemove', e => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;

  // Keep cube within container boundaries
  left = Math.max(0, Math.min(left, container.clientWidth - cubeRect.width));
  top = Math.max(0, Math.min(top, container.clientHeight - cubeRect.height));

  selectedCube.style.left = `${left}px`;
  selectedCube.style.top = `${top}px`;
});

// Mouse up - drop cube
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.classList.remove('dragging');
    selectedCube = null;
  }
});

// Optional: Drag to scroll container horizontally
let isDraggingContainer = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', e => {
  if (e.target.classList.contains('cube')) return; // skip cubes
  isDraggingContainer = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  container.classList.add('active');
});

container.addEventListener('mouseleave', () => {
  isDraggingContainer = false;
  container.classList.remove('active');
});

container.addEventListener('mouseup', () => {
  isDraggingContainer = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', e => {
  if (!isDraggingContainer) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX;
  container.scrollLeft = scrollLeft - walk;
});
